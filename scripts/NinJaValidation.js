///<reference path="~/scripts/NinJa.js" />

var ValidationStyles = {
    FormPost: 0,
    RealTime: 1
};

var ErrorDisplayStyles = {
    Static: 0,
    Dynamic: 1
};

var NinJaValidation = {
    Groups: new Dictionary(),
    AlphaNumRegX: /^[a-zA-Z0-9]+$/,
    ZipRegX: /^\d{5}(\-\d{4})?$/,
    TaxIDRegX: /^\d{2}\-?\d\-?\d{2}\-?\d{4}$/,
    PhoneRegX: /^(\(\d{3}\)|\d{3}\-?)\d{3}\-?\d{4}$/,
    EnableValidation: true,
    OnValidation: new Event(),
    ValidationStyle: ValidationStyles.FormPost,
    ErrorDisplayStyle: ErrorDisplayStyles.Dynamic
};

$ValidationEventArgs = $Array;

NinJaValidation.Groups.Add("default", new ValidationGroup("default"));
Type.Validator = Type.$++;

Page.OnLoad.Add(function () {
    Page.Form.OnSubmit.Add(NinJaValidation.RunValidation);
});

NinJaValidation.OnValidation = new Event();

NinJaValidation.FindValidatorFor = function (id) {

    var e = $Element(id);
    if (e == null) {
        return null;
    }
    var a = null;
    NinJaValidation.Groups.Values().ForEach(function (i) {
        a = i.Validators.Find(function (j) {
            return j.Element == e;
        });

        if (a != null) {
            return false;
        }

    });

    return a;
};

NinJaValidation.__Group = function (v, g) {
    var gr = NinJaValidation.Groups[g];
    if (gr == undefined) {
        NinJaValidation.Groups.Add(g, new ValidationGroup(g));
        gr = NinJaValidation.Groups[g];
    }

    gr.Validators.Add(v);
};

function ValidationGroup(n) {
    this.Validators = [];
    this._en = true;
    this.Name = n;
    this.Summary = null;
}

function ValidationEventArgs(r) {
    this.ValidationResult = r;
}

NinJaValidation.RunValidation = function (group) {
    if (!NinJaValidation.EnableValidation) { return true; }
    var e = Event.Current;
    var invalids = [];
    var invalid = false;
    var b;
    NinJaValidation.Groups.ForEach(function (k) {
        if (group !== undefined && group.Type == Type.String && k.Key != group) {
            return;
        }
        var i = 0;
        if (k.Value._en) {
            var a = k.Value.Validators, v, l = a.length;

            for (; i < l; i++) {
                v = a[i];
                b = v.Validate();
                if (b === false) {
                    invalid = true;
                    invalids.Add(v);
                }
            }

            if (e.Type == Type.EventArgs) {
                e.Handled = invalid;
            }

            if (k.Value.Summary) {
                var sum = k.Value.Summary;
                sum.Content(sum.Message);
                invalids.ForEach(function (m) {
                    m.Anchor.Content(m.__GMessage);
                    sum.AddElement(m.Anchor);
                });

                sum.Collapsed(invalids.length == 0);
            }

            invalids.Clear();
        }
        else {
            k.Value.Summary.Collapsed(true);
        }
    });;

    NinJaValidation.OnValidation.Fire(new ValidationEventArgs(!invalid));
    return !invalid;
};

$Validator = $Anchor;

Extensions.Add("validator", Validator);

function Validator(e) {
    if (this.DOM === undefined) {
        return Validator.Inherit(Validator.Extend(new Span(e).ClassName("validator")));
    }

    var $ = this, t;
    e = $.DOM;
    $.MinLength = (e.getAttribute("minlength") || (e.getAttribute("required") || "false").ToBoolean() ? "1" : "0").ToInt();
    $.MaxLength = (e.getAttribute("maxlength") || "10000000").ToInt();
    $.__DV = e.getAttribute("default") || "";
    $.__Group = e.getAttribute("group") || "default";
    t = e.getAttribute("validates");
    $.Anchor = new Anchor();
    $.__vd = new Delegate(this.Validate, this);
    $.LastValidationResult = true;
    $.Validates(t);

    var f = e.getAttribute("function"), v;
    if (f) {
        if (f == "Date") {
            v = AV.Date;
        }
        else {
            v = AV[f];
            if (!v) {
                v = window[f];
                $.__IsCustom = true;
            }
        }

        $.__Function = v;
    }

    NinJaValidation.__Group($, $.__Group);

    $.__GMessage = e.getAttribute("groupmessage") || $.Text();
    $.Text($.Text() || $.__GMessage);
    $.Collapsed(true);
    $.Type = Type.Validator;
}

Validator.prototype.DefaultValue = function (v) {
    if (v === undefined) {
        return this.__DV;
    }

    this.__DV = v;
    return this;
};


Validator.prototype.Function = function (f) {
    var $ = this;
    if (f === undefined) {
        return $.__Function;
    }

    $.__Function = f;
    return this;
};

Validator.prototype.Group = function (g) {
    if (g === undefined) {
        return this.__Group;
    }
    if (this.__Group && NinJaValidation.Groups[this.__Group]) {
        NinJaValidation.Groups[this.__Group].Validators.Remove(this);
    }
    this.__Group = g;
    NinJaValidation.__Group(this, this.__Group);
    return this;
};

Validator.prototype.GroupMessage = function (m) {
    if (m === undefined)
        return this.__GMessage;
    else {
        this.__GMessage = m;
        return this;
    }
};

Validator.prototype.Validates = function (e) {
    var $ = this, l;
    if (e === undefined) {
        return $.Element;
    }
	
    if (!$RadioButtonGroup(e)) {
        $.Element = $Element(e);
    }
    else {
        $.Element = $RadioButtonGroup(e);
    }

    if ($.Element === null && e !== null) {
        alert("Validator assigned to invalid id \"" + e + "\".");
        return this;
    }

    l = $.Element;
    $.Anchor.OnClick.Clear();
    if (e && l.Focus !== undefined) {
        $.Anchor.OnClick.Add(new Delegate(l.Focus, l));
    }

    if (NinJaValidation.ValidationStyle == ValidationStyles.RealTime) {
        if (!NullOrUndefined(l)) {
            l.OnChange.Add($.__vd);
        }
    }

    return this;
};

Validator.prototype.HideValidation = function () {
    this.Collapsed(true);
};

Validator.prototype.ShowValidation = function () {
    if (this.LastValidationResult === false) {
        this.Collapsed(false);
    }
};

Validator.prototype.Validate = function () {
    var t, v, disp, enabled, result = true;
    if (this.Element !== null) {
        if (this.Element.Type == Type.RadioButtonGroup) {
            disp = this.Element[0].Displayed();
            enabled = this.Element[0].Enabled();
        }
        else {
            disp = this.Element.Displayed ? this.Element.Displayed() : true;
            enabled = this.Element.Enabled();
        }
    }
    else {
        enabled = disp = true;
    }

    if (this._en && disp && enabled) {
        if (!NullOrUndefined(this.Element)) {
            v = (this.Element.Value() || "");

            if (!this.__IsCustom) {
                t = v.length;
                if (this.Element.Type == Type.CheckBox && this.MinLength > 0) {
                    if (!this.Element.Checked()) {
                        result = false;
                    }
                }
                else if (t < this.MinLength || t > this.MaxLength) {
                    result = false;
                }
                else if (v == this.__DV && this.MinLength > 0) {
                    result = false;
                }
            }

            if (!NullOrUndefined(this.__Function) && (v.length > 0 || this.__IsCustom)) {
                if (this.__Function(this.Element) === false) {
                    result = false;
                }
            }
        }
        else if (this.__Function) {
            if (this.__Function() === false) {
                result = false;
            }
        }
    }

    if (NinJaValidation.ErrorDisplayStyle == ErrorDisplayStyles.Dynamic) {
        this.Collapsed(result);
        if (result == true) {
            var p = this.Anchor.Parent();
            if (!NullOrUndefined(p)) {
                p.RemoveElement(this.Anchor);
                if (p.DOM.children.length == 1) {
                    p.Collapsed(true);
                }
            }
        }
    }

    this.LastValidationResult = result;
    return result;
};

var AV = {};

AV.RegX = function (e, regx) {
    var v = e.Value();
    return v.match(NinJaValidation[regx + "RegX"]) != null;
};

AV.Number = function (e) {
    return e.Value().IsFloat();
};

AV.PositiveNumber = function (e) {
    return e.Value().IsFloat() && e.Value().ToFloat() > 0;
};

AV.Integer = function (e) {
    return e.Value().IsInt();
};

AV.PositiveInteger = function (e) {
    return e.Value().IsInt() && e.Value().ToFloat() > 0;
};

AV.NonnegativeInteger = function (e) {
    return e.Value().IsInt() && e.Value().ToFloat() >= 0;
};

AV.Date = function (e) {
    return e.Value().IsDate();
};

AV.Zip = function (e) {
    return AV.RegX(e, "Zip");
};

AV.TaxID = function (e) {
    return AV.RegX(e, "TaxID");
};

AV.Phone = function (e) {
    return AV.RegX(e, "Phone");
};

AV.AlphaNumeric = function (e) {
    return AV.RegX(e, "AlphaNum");
};

AV.Currency = function(e) {
	var v = e.Value();
	if (v.StartsWith("$")) {
		v = v.Remove("$");
	}

	v = v.RemoveAll(",");
	return v.IsFloat() && v.ToFloat() >= 0;
};

AV.FutureDate = function(e) {
	var v = e.Value();
	if (v.IsDate()) {
		v = v.ToDateTime();
		return v > DateTime.Now();
	}

	return false;
};

AV.TodayOrFutureDate = function(e) {
	var v = e.Value();
	if (v.IsDate()) {
		v = v.ToDateTime();
		var n = DateTime.Now();
		return v.Ticks() >= new DateTime(n.Year(), n.Month(), n.Date()).Ticks();
	}

	return false;
};

NinJa.Extensions.Add("validatorsummary", ValidationSummary);

function ValidationSummary(e) {
    if (this.DOM === undefined) {
        return ValidationSummary.Inherit(ValidationSummary.Extend(new Div(e).ClassName("validatorsummary")));
    }
    var $ = this;
    e = $.DOM;
    var g = e.getAttribute("group") || "default", i, l, a;
    if (NinJaValidation.Groups[g]) {
    	NinJaValidation.Groups[g].Summary = $;
    	a = NinJaValidation.Groups[g].Validators;
    	l = a.length;
    	for (i = 0; i < l; i++) {
    		a[i].Text("Invalid.");
    	}
    }
    $.Message = $.Content();
    $.Collapsed(true);
}
