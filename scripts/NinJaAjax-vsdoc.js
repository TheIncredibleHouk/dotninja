///<reference path="/scripts/NinJa.js" />

Type.AjaxRequest = "AjaxRequest";
Type.AjaxEventArgs = "AjaxEventArgs";
Type.WebServiceRequest = "WebServiceRequest";

var Verb = {
    Get: "GET",
    Post: "POST",
    FormPost: "~POST",
    Delete: "DELETE"
};

var DataEncodingType = {
    None: 0,
    Raw: 1,
    UrlEncoded: 2,
    JSON: 3,
    Form: 4
};

var PostOptions = {};
PostOptions.None = 0;
PostOptions.IncludeASPEventFields = 1;
PostOptions.IncludeASPViewState = 2;

var NinJaAjax = {};

NinJaAjax.DefaultOnError = NinJaAjax.HandleError;
NinJaAjax.DefaultOnTimeOut = NinJaAjax.HandleTimeOut;

AjaxRequest.DefaultResponseWrappedProperty = "d";
AjaxRequest.DefaultSerializationMethod = SerializationMethod.UrlEncoded;
AjaxRequest.DefaultDeserializationMethod = SerializationMethod.None;
AjaxRequest.DefaultParameters = new Dictionary();
AjaxRequest.SendCookies = false;
AjaxRequest.DefaultTimeOut = new TimeSpan(0, 1);
AjaxRequest.PreventCacheCalls = true;

WebServiceRequest.DefaultSerializationMethod = SerializationMethod.JSON;
WebServiceRequest.DefaultDeserializationMethod = SerializationMethod.JSON;
WebServiceRequest.DefaultParameters = new Dictionary();
WebServiceRequest.SendCookies = false;
WebServiceRequest.ServicesDirectory = "/Services/";
WebServiceRequest.DefaultResponseWrappedProperty = "d";
WebServiceRequest.DefaultTimeOut = new TimeSpan(0, 1);
WebServiceRequest.PreventCacheCalls = true;

function AjaxEventArgs(ajaxRequest) {
    ///<summary>Represents an ajax result</summary>
    ///<field name="CancelEvent" type="Boolean">Whether to cancel the further firing of this event.</field>
    ///<field name="AjaxRequest" type="AjaxRequest">The request that fired the event.</field>
    ///<field name="ResponseCode" type="Number">The response code returned from the request.</field>
    ///<field name="ResponseText" type="String">The raw text returned from the response.</field>
    ///<field name="ResponseObject" type="Object">The deserialized object from the response, if applicable.</field>
}


function $AjaxEventArgs(object) {
    ///<summary>Treats the object as a AjaxeventArgs for intellisense.</summary>
    ///<param type="Object" name="object" >Object.</param>
    return new AjaxEventArgs();
}


AjaxEventArgs.prototype.CancelEvent = false;
AjaxEventArgs.prototype.AjaxRequest = new AjaxRequest();
AjaxEventArgs.prototype.ResponseCode = 0;
AjaxEventArgs.prototype.ResponseText = "";
AjaxEventArgs.prototype.ResponseObject = {};

function AjaxRequest(url) {
    ///<summary>Represents an ajax request to be made.</summary>
    ///<param name="url" type="String" optional="true" />
};

function $AjaxRequest(object) {
    ///<summary>Treats the object as a ajaxRequest for intellisense.</summary>
    ///<param type="Object" name="object" >Object.</param>
    return new AjaxRequest();
}

AjaxRequest.prototype.XMLHttpRequest = new XMLHttpRequest();
AjaxRequest.prototype.Url = "";
AjaxRequest.prototype.Parameters = new Dictionary();
AjaxRequest.prototype.ResponseWrappedProperty = "";
AjaxRequest.prototype.RequestBodyType = DataEncodingType.JSON;
AjaxRequest.prototype.ResponseBodyType = DataEncodingType.JSON;
AjaxRequest.prototype.OnAbort = new Event();
AjaxRequest.prototype.OnTimeOut = new Event();
AjaxRequest.prototype.OnSend = new Event();
AjaxRequest.prototype.OnSuccess = new Event();
AjaxRequest.prototype.OnError = new Event();
AjaxRequest.prototype.Type = 0;
AjaxRequest.prototype.Tag = {};
AjaxRequest.prototype.TimeOut = new TimeSpan();
AjaxRequest.prototype.Verb = "";
AjaxRequest.prototype.Data = null;
AjaxRequest.prototype.AdditonalHeaders = new Dictionary();

AjaxRequest.prototype.Send = function (synchronous) {
    ///<summary>Calls the ajax request.</summary>
    ///<param name="synchronous" type="Boolean">(Optional) If true, the request is synchronous and the the response is returned to the caller.</param>
    if (synchronous) {
        return new AjaxEventArgs();
    }
};

function WebServiceRequest() {
};



AjaxRequest.prototype.Abort = function () {
    ///<summary>Aborts an Ajax call.</summary>
};

AjaxRequest.prototype.Post = function (postOptions) {
    ///<summary>Send an ajax request with form fields to simulate a form post.</summary>
    ///<param name="postOptions" type="PostOptions" optional="true" />
};

NinJaAjax.JSONEncode = function (dictionary) {
    ///<summary>Converts the dictionary into a JSON encoded string.</summary>
    ///<param name="dictionary" type="Dictionary">The dictionary to convert.</param>
    return "";
};


NinJaAjax.UrlEncode = function (dictionary) {
    ///<summary>Converts the dictionary into a url encoded string.</summary>
    ///<param name="dictionary" type="Dictionary">The dictionary to convert.</param>
    return "";
};

WebServiceRequest.GenerateServiceReference = function (service, urlFormat, paramUnwrapped) {
    ///<summary>Generates a reference to a service that can be reused.</summary>
    ///<param name="service" type="String">The name of the service."</param>
    //<param name="urlFormat" type="String">String format of the base URL with using {Service} and {Function} tokens."</param>
    window[service] = new ServiceReference();
};

function ServiceReference(service) {
    this.Service = service;
    this.AdditionalHeaders = new Dictionary();
}

ServiceReference.prototype.AddCall = function (verb, funcName, returnType, parameters) {
    ///<summary>Adds a call that can be made to the service.</summary>
    ///<param name="verb" type="Verb">Verb to use when making the request.</param>
    ///<param name="funcName" type="String">Name of the function on the service.</param>
    ///<param name="returnType" type="String">The type of object returned by the service.</param>
    ///<param name="parameters" type="">All named arguments to the service.</param>
    var l = arguments.length;
    var a = [];
    for (var i = 3; i < l; i++) {
        a.push(arguments[i]);
    }

    a.push("onSuccess");
    a.push("onFail");
    a.push("return WebServiceRequest();");
    this[funcName + "Async"] = Function.constructor.apply(null, a);
    a.pop();
    a.pop();
    a.pop();
    a.push("onFail");
    if (returnType) {
        a.push("return new " + returnType + "();");
    }
    this[funcName] = Function.constructor.apply(null, a);
};