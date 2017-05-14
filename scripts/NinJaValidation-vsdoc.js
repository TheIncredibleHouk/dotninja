///<reference path="~/scripts/NinJa.js" />

var DisplayMode = {
    Collapsed: 0,
    Visibility: 1
};

var NinJaValidation = {
    Groups: new Dictionary(),
    AlphaNumRegX: /^[a-zA-Z0-9]+$/,
    ZipRegX: /^\d{5}(\-\d{4})?$/,
    TaxIDRegX: /^\d{2}\-?\d\-?\d{2}\-?\d{4}$/,
    PhoneRegX: /^(\(\d{3}\)|\d{3}\-?)\d{3}\-?\d{4}$/,
    EnableValidation: true,
    OnValidation: new Event(),
    DisplayMode: DisplayMode.Collapsed
};

NinJaValidation.OnValidation = new Event();

function $ValidationEventArgs(obj) {
    ///<summary>Causes Intellisense to treat the object as ValidationEventArgs.</summary>
    ///<param name="obj" type="Object">The object to cast.</param>
    ///<returns type="ValidatorEventArgs">Returns the object as a ValidationEventArgs type.</returns>
    return new ValidationEventArgs();
}

function ValidationEventArgs(result) {
    ///<summary>Contains the overall validation result for the entire validation process.</summary>
    ///<field name="ValidationResult" type="Boolean">The overall result for the validation process.</field>
}

ValidationEventArgs.prototype.ValidationResult = true;

NinJaValidation.RunValidation = function (group) {
    ///<summary>Run either a simple set of validators or all validators, returning the validation result.</summary>
    ///<param name="group" type="String">(Optional) If provided, runs the validator of the specified group, otherwise runs all validators.</param>
    return true;
}



function Validator(element, funcDel) {
    ///<summary>Creates a new validator applied to the given element.</summary>
    ///<param name="element" type="Input">Input element to be validated.</param>
    ///<param name="funcDel" type="Function/Delegate">Function or delegate to execute for validation.</param>
    ///<field name="Function" type="Function">Function to run test valid data.</field>
    ///<field name="MaxLength" type="Number">Maximum length of the value that is allowed.</field>
    ///<field name="MinLength" type="Number">Minimum length of the value that is allowed.</field>
    ///<field name="LastValidationResult" type="Boolean">The result of the last time the validation was run.</field>
}

Validator.prototype.Enabled = Element.prototype.Enabled;
Validator.prototype.Function = function () { };
Validator.prototype.MinLength = 0;
Validator.prototype.MaxLength = 0;
Validator.prototype.LastValidationResult = false;


Validator.prototype.DefaultValue = function (value) {
    ///<summary>(Property Function) Gets or sets the default value of the input. When testing required, if the input retains the default value, it will be invalid.</summary>
    ///<param name="value" type="String">(Optional) The default value to set for the validator.</param>
    ///<returns type="Boolean">For gets, returns the current default value. For sets, returns the instance.</returns>
    if (value === undefined) {
        return ""
    }

    return this;
};


Validator.prototype.Validate = function () {
    ///<summary>Runs the validator.</summary>
    ///<returns type="Boolean">Returns true if value was valid based on the given function.</returns>
    return true;
}

var AV = {};

AV.Required = function (element) {
    ///<summary>Validator that requires an input or selection.</summary>
    ///<param name="element" type="Element">(Optional) Specific input to test.</param>
    ///<returns type="Boolean">Returns whether a value was given to the input that was not the default value.</returns>
    return true;
};

AV.Number = function (element) {
    ///<summary>Validates a numerical input.</summary>
    ///<param name="element" type="Element">(Optional) Specific input to test.</param>
    ///<returns type="Boolean">Returns whether the input contained a numerical value.</returns>
    return true;
};

AV.RequiredNumber = function (e) {
    ///<summary>Validates required numerical input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.Integer = function (e) {
    ///<summary>Validates integer input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredInteger = function (e) {
    ///<summary>Validates required integer input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.PositiveNumber = function (e) {
    ///<summary>Validates positive numerical input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredPositiveNumber = function (e) {
    ///<summary>Validates required positive numerical input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.PositiveInteger = function (e) {
    ///<summary>Validates positive integer input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredPositiveInteger = function (e) {
    ///<summary>Validates required positive integer input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.Date = function (e) {
    ///<summary>Validates date input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredDate = function (e) {
    ///<summary>Validates required date input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.Zip = function (e) {
    ///<summary>Validates zip code input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredZip = function (e) {
    ///<summary>Validates required zip code input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.TaxID = function (e) {
    ///<summary>Validates tax id input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredTaxID = function (e) {
    ///<summary>Validates required tax id input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.Phone = function (e) {
    ///<summary>Validates phone number input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredPhone = function (e) {
    ///<summary>Validates required phone number input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.Email = function (e) {
    ///<summary>Validates email input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

AV.RequiredEmail = function () {
    ///<summary>Validates required email input.</summary>
    ///<param name="e" type="Element">(Optional) Specific input to test.</param>
    return true;
};

Validator.Extensions = [];