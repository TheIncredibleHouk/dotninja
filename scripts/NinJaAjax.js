///<reference path="/scripts/NinJa.js" />

//#region Reference functions
var $AjaxRequest = $WebServiceRequest = $AjaxEventArgs = $Array;
//#endregion

//#region enumerations
var NinJaAjax = {
    Version: "1.1",
    CurrentCalls: [],
    QueuedCalls: [],
    NoMoreCalls: false
};

var Verb = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE"
};

Type.Request = "AjaxRequest";
Type.AjaxEventArgs = "AjaxEventArgs";
Type.WebServiceRequest = "WebServiceRequest";

var DataEncodingType = {
    None: 0,
    Raw: 1,
    UrlEncoded: 2,
    JSON: 3,
    Form: 4
};

var PostOptions = {
    None: 0,
    IncludeASPEventFields: 1,
    IncludeASPViewState: 2
};
//#endregion

Page.OnLoad.Add(function () {
    Page.OnClose.Add(function () {
        var i, a = NinJaAjax.CurrentCalls, l = a.length;
        for (i = 0; i < l; i++) {
            a[i].Abort();
        }

        NinJaAjax.NoMoreCalls = true;
        return undefined;
    });
});


//#region helper functions
NinJaAjax.CreateHttpObject = function () {
    var xmlHttp = null;

    try {
        xmlHttp = new XMLHttpRequest();
    }

    catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }

        catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    return xmlHttp;
};

NinJaAjax.JSONEncode = function (d) {
    var o = {};
    d.ForEach(function (i) {
        o[i.Key] = i.Value === "" ? "" : i.Value; // IE8 hack for "bank value" being different from blank string when retrieved from dom values
    });

    return JSON.stringify(o);
};


NinJaAjax.UrlEncode = function (d) {
    var output = "";
    var first = true;
    d.ForEach(function (i) {
        if (!NullOrUndefined(i.Value)) {
            if (first) {
                output += i.Key.Encode() + "=" + i.Value.toString().Encode();
                first = false;
            }
            else {
                output += "&" + i.Key.Encode() + "=" + i.Value.toString().Encode();
            }
        }
    });

    return output;
};

NinJaAjax.HandleResponse = function (xrq, request, sync) {
    var Ajax = request;
    if (Ajax.__Abort === true) { return; }
    if (xrq.readyState === 4 && xrq.status > 0) {
        if (Ajax.__TimeOutObject) {
            Ajax.__TimeOutObject.Stop();
        }
        var ajArgs = new AjaxEventArgs(Ajax);
        ajArgs.ResponseText = xrq.responseText;
        if (xrq.status === 200) {
            switch (Ajax.ResponseBodyType) {
                case DataEncodingType.Raw:
                    ajArgs.ResponseObject = ajArgs.ResponseText;
                    break;

                case DataEncodingType.None:
                    ajArgs.ResponseObject = undefined;
                    break;

                case DataEncodingType.JSON:
                    if (!xrq.responseText) {
                        ajArgs.ResponseObject = undefined;
                    }
                    else {
                        try {
                            ajArgs.ResponseObject = xrq.responseText.ToObjectFromJSON();
                        }
                        catch (e) {
                            if (Ajax.OnError.length > 0) {
                                Ajax.OnError.Fire(ajArgs);
                            }
                            else {
                                NinJaAjax.DefaultOnError(ajArgs);
                            }
                        }
                    }

                    if (ajArgs.ResponseObject !== null) {
                        if (Ajax.ResponseWrappedProperty !== null) {
                            ajArgs.ResponseObject = ajArgs.ResponseObject[Ajax.ResponseWrappedProperty];
                        }
                    }
                    break;
            }
        }

        ajArgs.ResponseCode = xrq.status;

        if (xrq.status !== 200) {
            if (Ajax.OnError.length > 0) {
                Ajax.OnError.Fire(ajArgs);
            }
            else {
                NinJaAjax.DefaultOnError(ajArgs);
            }
        }
        else if (!sync) {
            Ajax.OnSuccess.Fire(ajArgs);
        }

        NinJaAjax.CurrentCalls.Remove(request);
        if (NinJaAjax.QueuedCalls.length > 0) {
            var v = NinJaAjax.QueuedCalls[0];
            NinJaAjax.QueuedCalls.RemoveAt(0);
            v.Send();
        }
        return ajArgs;
    }
};

NinJaAjax.HandleError = function (e) {
    if (confirm("An error has occurred during your web request. Would you like to see detailed information?")) {
        alert(e.ResponseText);
    }
};

NinJaAjax.HandleTimeOut = function (e) {
    alert("The request to " + e.Request.Url + " timed out. Please try again.");
};

NinJaAjax.DefaultOnError = NinJaAjax.HandleError;
NinJaAjax.DefaultOnTimeOut = NinJaAjax.HandleTimeOut;
//#endregion

//#region AjaxRequest
function AjaxRequest(u, v) {
    v = v || Verb.Get;
    this.__Abort = false;
    this.XMLHttpRequest = null;
    this.Url = u;
    this.Parameters = new Dictionary();
    this.ResponseWrappedProperty = AjaxRequest.DefaultResponseWrappedProperty;
    this.RequestBodyType = DataEncodingType.JSON;
    this.ResponseBodyType = DataEncodingType.JSON;
    this.OnAbort = new Event(this);
    this.OnError = new Event(this);
    this.OnSend = new Event(this);
    this.OnSuccess = new Event(this);
    this.OnTimeOut = new Event(this);
    this.Data = null;
    this.PreventCacheCalls = AjaxRequest.PreventCacheCalls;
    this.Type = Type.AjaxRequest;
    this.Tag = null;
    this.TimeOut = AjaxRequest.DefaultTimeOut;
    this.Synchronous = false;
    this.Verb = v;
    this.AdditionalHeaders = new Dictionary();
    this.__TimeOutObject = null;
}

AjaxRequest.prototype.Send = function (synchronous) {
    synchronous = synchronous || false;

    if (NinJaAjax.NoMoreCalls) {
        return;
    }

    if (!synchronous) {
        if (NinJaAjax.CurrentCalls.length > 5) {
            NinJaAjax.QueuedCalls.Add(this);
            return;
        }
        else {
            NinJaAjax.CurrentCalls.Add(this);
        }
    }

    this.__Abort = false;
    this.XMLHttpRequest = NinJaAjax.CreateHttpObject();

    var me = this;
    AjaxRequest.DefaultParameters.ForEach(function (x) {
        me.Parameters.Add(x.Key, x.Value);
    });

    var url = this.Url || Page.Href();

    if (this.Verb === Verb.Get) {
        if (!url.Contains("?")) {
            url += "?";
        }

        url += NinJaAjax.UrlEncode(this.Parameters);
    }

    if (this.PreventCacheCalls === true) {
        if (!url.Contains("?")) {
            url += "?";
        }

        url += "&rgk=" + DateTime.Now().Ticks();
    }


    if (!synchronous) {
        this.XMLHttpRequest.onreadystatechange = new Delegate(NinJaAjax.HandleResponse, null, [this.XMLHttpRequest, this]);
    }
    this.XMLHttpRequest.open(this.Verb.Replace("~", ""), url, !synchronous);

    if (NinJaAjax.SendCookies) {
        if (document.cookie.length > 0) {
            this.XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
        }
    }

    this.XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    var k = this.AdditionalHeaders.Keys(), l = k.length, i;
    for (i = 0; i < l; i++) {
        this.XMLHttpRequest.setRequestHeader(k[i], this.AdditionalHeaders[k[i]]);
    }

    var data, ctype;
    switch (this.RequestBodyType) {
        case DataEncodingType.JSON:
            if (this.Parameters.Count() == 0) {
            	data = NullOrUndefined(this.Data) ? "" : JSON.stringify(this.Data);
            }
            else {
                data = NinJaAjax.JSONEncode(this.Parameters);
            }
            ctype = "application/json; charset=utf-8";
            break;

        case DataEncodingType.Raw:
            data = this.Data;
            break;

        case DataEncodingType.Form:
            data = NinJaAjax.UrlEncode(this.Parameters);
            ctype = "application/x-www-form-urlencoded; charset=utf-8";
            break;
    }

    switch (this.Verb) {

        case Verb.Post:
            this.XMLHttpRequest.setRequestHeader("Content-Type", ctype);
            this.XMLHttpRequest.send(data);
            break;

        case Verb.Get:
            this.XMLHttpRequest.send();
            break;

        case Verb.FormPost:
            this.XMLHttpRequest.setRequestHeader("Content-Type", ctype);
            this.XMLHttpRequest.send(data);
            break;
    }

    if (synchronous) {
        return NinJaAjax.HandleResponse(this.XMLHttpRequest, this, true);
    }
    else {
        this.__TimeOutObject = Timer.Delay(this.TimeOut, new Delegate(this.__TimeOut, this));
        this.OnSend.Fire();
    }
};


AjaxRequest.GetFormData = function () {
    var o = Page.DOM.querySelectorAll("input, select, textarea");
    var l = o.length;
    var v, i;
    for (i = 0; i < l; i++) {
        v = o[i].$;
        switch (v.DOM.type.toLowerCase() || v.DOM.tagName.toLowerCase()) {
            case "text":
            case "textarea":
                this.Parameters.Add(v.Name(), v.Text());
                break;

            case "checkbox":
                if (v.Checked()) {
                    this.Parameters.Add(v.Name(), "on");
                }
                break;

            case "radio":
                if (!v.Checked()) {
                    continue;
                }
            case "hidden":
            case "password":
            case "select-one":
                this.Parameters.Add(v.Name(), v.Value());
                break;
        }
    }

    this.RequestBodyType = DataEncodingType.Form;
    this.Verb = Verb.FormPost;
    this.PreventCacheCalls = false;
    this.Send();
};

AjaxRequest.DefaultResponseWrappedProperty = "d";
AjaxRequest.DefaultParameters = new Dictionary();
AjaxRequest.SendCookies = false;
AjaxRequest.DefaultTimeOut = new TimeSpan(0, 1);
AjaxRequest.PreventCacheCalls = true;
//#endregion

//#region AjaxEventArgs
function AjaxEventArgs(ajaxRequest) {
    this.CancelEvent = false;
    this.Type = Type.AjaxEventArgs;
    this.Request = ajaxRequest;
    this.ResponseCode = 0;
    this.ResponseText = undefined;
    this.ResponseObject = undefined;
}

//#endregion

//#region AjaxRequest and WebServiceRequest shared
AjaxRequest.prototype.Abort = function () {
    this.__Abort = true;
    if (this.XMLHttpRequest) {
        try {
            if (this.XMLHttpRequest.abort) {
                this.XMLHttpRequest.abort();
            }
        }
        catch (e) {
        }

        delete this.XMLHttpRequest;
        if (this.__TimeOutObject) {
            this.__TimeOutObject.Stop();
        }
    }

    if (this.OnAbort.length > 0) {
        this.OnAbort.Fire(new AjaxEventArgs(this));
    }
};

AjaxRequest.prototype.__TimeOut = function () {
    if (this.XMLHttpRequest !== null) {
        try {
            this.XMLHttpRequest.abort();
        }
        catch (e) {
        }
        delete this.XMLRequestRequest;
    }

    if (this.OnTimeOut.length > 0) {
        this.OnTimeOut.Fire(new AjaxEventArgs(this));
    }
    else {
        NinJaAjax.DefaultOnTimeOut(new AjaxEventArgs(this));
    }
};
//#endregion
