///<reference path="~/scripts/NinJa.js" />
///<reference path="~/scripts/NinJaUI.js" />

//- Accordion
var NinJaUI = {
    Version: "1.0"
};

Type.DynamicSize = "";

function Accordion(id) {
    ///<summary>Creates a new accordion control with the given id.</summary>
    ///<param name="id" type="String">Id to apply to the element.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnScroll" type="UserEvent">(UserEvent)Fired if the element has scroll bars and the element is scroled.</field>
    ///<field name="Type" type="String">Returns Type.Accordion.</field>
    ///<field name="Items" type="ObservableArray">Array of AccordionItems.</field>
    NinJa.Extend(this, Div);
}

function $Accordion(id) {
    ///<summary>Returns the accordion with the given id.</summary>
    ///<param name="id" type="String">Id of the accordion.</param>

    return new Accordion();
}

Accordion.prototype.Items = new ObservableArray();

Accordion.prototype.HeaderClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class name applied to accordion item headers.</summary>
    ///<param name="className" type="String">(Optional) The class name applied to accordion item headers.</param>
    if (className === undefined) {
        return "";
    }

    return this;
}

Accordion.prototype.ItemClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class name applied to accordion items.</summary>
    ///<param name="className" type="String">(Optional) The class name applied to accordion items.</param>
    if (className === undefined) {
        return "";
    }

    return this;
}

Accordion.prototype.SelectedClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class name applied to the selected accordion item header.</summary>
    ///<param name="className" type="String">(Optional) The class name applied to the selected accordion item header.</param>
    if (className === undefined) {
        return "";
    }

    return this;
}


Accordion.prototype.SelectedItem = function (item) {
    ///<summary>(Property Function)Gets or sets the selected item, expanding it to full view and collapsing the current item.</summary>
    ///<param name="item" type="AccordionItem">(Optional) AccordionItem to select.</param>
    if (item === undefined) {
        return new AccordionItem();
    }

    return this;
}

Accordion.prototype.Effect = function (effect) {
	///<summary>Sets the effect used to make transitions from selected to unselected items.</summary>
	///<param name="effect" type="String">Valid values: Effects.None, Effects.FoldVertical</param>
	return this;
};


function AccordionItem(id) {
    ///<summary>An item in an accordion control that can expand and collapse.</summary>
    ///<param name="id" type="String">Id of the AccordionItem.</param>
    ///<field name="Tag" type="Object">An object to store in the item.</field>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnScroll" type="UserEvent">(UserEvent)Fired if the element has scroll bars and the element is scroled.</field>
    ///<field name="Type" type="String">Returns Type.AccordionItem.</field>
    NinJa.Extend(this, Div);
}

function $AccordionItem(id) {
    ///<summary>Returns the accordion item with the given id.</summary>
    ///<param name="id" type="String">Id of the accordion.</param>

    return new AccordionItem();
}

AccordionItem.prototype.Header = new Div();

AccordionItem.prototype.Selected = function (selected) {
    ///<summary>(Property Function) Gets or sets whether this accordion item is selected.</summary>
    ///<param name="selected" type="Boolean">(Optional) Whether the  item is selected.</param>
    if (selected === undefined) {
        return true;
    }
    return this;
}

//- DatePicker
function $DatePicker(id) {
    ///<summary>Retrieves the datepicker with the given id.</summary>
    ///<param name="id" type="String">Id of the element.</param>
    return new DatePicker();
}

function DatePicker(id) {
    ///<summary>Creates a new datepicker with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id of the element.</param>
    ///<param name="OnDateChanged"
    Element(this);
};

DatePicker.prototype.Effect = function (effect) {
    ///<summary>(Property Function)Gets or sets the effect used to hide and show the datepicker.</summary>
    ///<param name="effect" type="String">(Optional) The effect, as a string, used to hide/show the datepicker.</param>
    if (effect === undefined) {
        return "";
    }

    return this;
};

DatePicker.prototype.Collapsed = function (collapsed) {
    ///<summary>(Property Function)Gets or sets the collapsed state of the datepicker display.</summary>
    ///<param name="collapsed" type="Boolean">(Optional) Whether the datepicker is displayed.</param>
    if (collapsed === undefined) {
        return true;
    }

    return this;
};

DatePicker.prototype.PadDays = function (padDays) {
    ///<summary>(Property Function)Gets or sets whether the datepicker will show apdded days.</summary>
    ///<param name="padDays" type="Boolean">(Optional) Whether or not the datepicker displays padded days.</param>
    if (padDays === undefined) {
        return true;
    }

    return this;
}

DatePicker.prototype.SelectedDate = function (dateTime) {
    ///<summary>(Property Function)Gets or sets the selected date.</summary>
    ///<param name="dateTime" type="DateTime">(Optional) The date to set the datepicker to.</param>
    if (dateTime === undefined) {
        return new DateTime();
    }

    return this;
}


DatePicker.prototype.PadClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class applied to padded days.</summary>
    ///<param name="className" type="String">(Optional) Class name applied to padded days.</param>
    if (className === undefined) {
        return "";
    }

    return this;
};

DatePicker.prototype.SelectedClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class applied to the selected days.</summary>
    ///<param name="className" type="String">(Optional) Class name applied to the selected days.</param>
    if (className === undefined) {
        return "";
    }

    return this;
};

//- Dialog
var DialogResult = {
    Ok: 0,
    Cancel: 1,
    Yes: 2,
    No: 3
};


function $Dialog(id) {
    ///<summary>Returns the dialog of the given id.</summary>
    ///<param name="id" type="String">Id of the dialog.</param>
    return new Dialog();
};

function Dialog(id) {
    ///<summary>Creates a new Div that can be created as a Dialog.</summary>
    ///<param name="id" type="String">(Optional) Id of the Dialog.</param>
    ///<field name="OnDialogClose" type="Event">(Event)Fired when the Dialog is closed.</field>
    ///<field name="OnDialogShow" type="Event">(Event)Fired when the Dialog is shown.</field>
    NinJa.Extend(this, Div);
}

Dialog.Color = "black",
Dialog.Opacity = .5,
Dialog.ZIndex = 100000,
Dialog.CloseCurrent = function (data) {
    ///<summary>Hides the currently displayed Dialog.</summary>
    ///<param name="data" type="Object/DialogResult">(Optional) The data returned from the dialog.</param>
}

Dialog.prototype = new Div();
Dialog.prototype.OnDialogShow = new Event();
Dialog.prototype.OnDialogClose = new Event();


Dialog.prototype.Show = function () {
    ///<summary>Shows the Element as a dialog box with the given effect, speed and smoothness.</summary>
    return this;

};

Dialog.prototype.Hide = function (data) {
    ///<summary>Hides the Dialog, returning the given data.</summary>
    ///<param name="data" type="Object/DialogResult">(Optional) Data to return.</param>
    return this;

};

//- OneClickButton/Anchor/ContentButton
function OneClickAnchor(id) {
    ///<summary>Creates a new anchor that can only be activated once.</summary>
    ///<param name="id" type="String">(Optional) Id of the anchor.</param>
    return new Anchor();
}

function OneClickButton(id) {
    ///<summary>Creates a new button that can only be activated once.</summary>
    ///<param name="id" type="String">(Optional) Id of the button.</param>
    return new Button();
}

function OneClickContentButton(e) {
    ///<summary>Creates a new content button that can only be activated once.</summary>
    ///<param name="id" type="String">(Optional) Id of the content button.</param>
    return new ContentButton();
}

// - RollOverImage
function RollOverImage(id) {
    ///<summary>Creates a new RollOverImage.</summary>
    ///<param name="id" type="String">(Optional) The id of the RollOverImage</param>
    NinJa.Extend(this, ImageElement);
}

function $RollOverImage(id) {
    return new RollOverImage();
}

RollOverImage.prototype.Source = function (src) {
    ///<summary>(Property Function)Gets or sets source of the image when the mouse is not over it.</source>
    ///<param name="src" type="String">(Optional) Source of the image.</param>
    if (src === undefined) {
        return "";
    }

    return this;
}

RollOverImage.prototype.HoverSource = function (src) {
    ///<summary>(Property Function)Gets or sets source of the image when the mouse is over it.</source>
    ///<param name="src" type="String">(Optional) Source of the image.</param>
    if (src === undefined) {
        return "";
    }

    return this;
}


Type.ScrollBar = 0;

function ScrollBar(id) {
    ///<summary>Creates a new scroll bar.</summary>
    ///<param name="id" type="String">(Optional) Id of the scrollbar.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="OnScrollChange" type="Event">(Event)Fired when the ScrollBar's value changes.</field>
    ///<field name="Type" type="String">Returns Type.ScrollBar.</field>
    NinJa.Extend(this, Element);
}

ScrollBar.prototype.OnScrollChange = new Event();

function $ScrollBar(id) {
    ///<summary>Returns the ScrollBar with the given id.</summary>
    ///<param name="id" type="String">Id of the ScrollBar.</param>
    return new ScrollBar();
}

ScrollBar.prototype.Width = function (width) {
    ///<summary>(Property Function)The width of the scroll bar.</summary>
    ///<param type="Number" name="width">(Optional) Width of the scroll bar.</param>
    if (width === undefined) {
        return 0;
    }
    return this;
};

ScrollBar.prototype.Height = function (height) {
    ///<summary>(Property Function)The height of the scroll bar.</summary>
    ///<param type="Number" name="height">(Optional) Height of the scroll bar.</param>
    if (height === undefined) {
        return 0;
    }
    return this;
};

ScrollBar.prototype.MaxValue = function (maxValue) {
    ///<summary>(Property Function)The maximum value of the scroll bar.</summary>
    ///<param type="Number" name="maxValue">(Optional) Maximum value of the scroll bar.</param>
    if (maxValue === undefined) {
        return 0;
    }
    return this;
};


ScrollBar.prototype.Value = function (value) {
    ///<summary>(Property Function)The current value of the scroll bar.</summary>
    ///<param type="Number" name="value">(Optional) Current value of the scroll bar.</param>
    if (value === undefined) {
        return 0;
    }
    return this;
};


ScrollBar.prototype.ThumbStepValue = function (value) {
    ///<summary>(Property Function) Gets or sets the value to increase or decrease by when clicking on one of the thumbs.</summary>
    ///<param name="value" type="Number">(Optional) The value to change by when clicking on a thumb.</param>
    ///<returns type="Number">Returns the current value for change when clicking a thumb.</returns>
    if (value === undefined) { return 1; }

    return this;
};


ScrollBar.prototype.Decrease = function () {
    ///<summary>Decreases the value of the scrollbar by one.</summary>
    return this;
}

ScrollBar.prototype.Increase = function () {
    ///<summary>Incrases the value of the scrollbar by one.</summary>
    return this;
}

function $RangeSlider(id) {
	///<summary>Returns the RangeSlider with the given id.</summmary>
	///<returns type="RangeSlider"></returns>
	return new RangeSlider();
}

function RangeSlider(id) {
	///<summary>Creates a new RangeSlider with the given id.</summary>
	///<param name="id" type="String" isOptional="true">The id of the RangeSlider</param>
	///<field name="LowerThumb" type="RangeSliderThumb">The lower value thumb.</field>
	///<field name="UpperThumb" type="RangeSliderThumb">The upper value thumb.</field>
};

RangeSlider.prototype.LowerThumb = new RangeSliderThumb();
RangeSlider.prototype.UpperThumb = new RangeSliderThumb();

RangeSlider.prototype.MaxValue = function (max) {
	///<summary>(Property Function) Gets or sets maximum value of the RangeSlider.</summary>
	///<param name="min" isOptional="true"(Optional) If provided, sets the maximum allowed value.</param>
	///<returns type="Number">Returns the current maximum value.</returns>
	if (min === unefined) { return 0; }
	return this;
};

RangeSlider.prototype.MinValue = function (min) {
	///<summary>(Property Function) Gets or sets minimum value of the RangeSlider.</summary>
	///<param name="min" isOptional="true"(Optional) If provided, sets the minimum allowed value.</param>
	///<returns type="Number">Returns the current minimum value.</returns>
	if (min === unefined) { return 0; }
	return this;
};

RangeSlider.prototype.MaxValue = function (m) {
	if (m === undefined) {
		return this.__max;
	}

	this.__max = m;
	this.Steps(this.__Steps);
	return this;
};

RangeSlider.prototype.Refresh = function () {
	///<summary>Refreshes the display of the RangeSlider.</summary>
};

RangeSlider.prototype.Steps = function (steps) {
	///<summary>(Property Function) Gets or sets the number of steps in the slider range.</summary>
	///<param name="steps" type="Number" isOptional="true">(Optional)If provided, sets the number of steps available in the RangeSlider</param>
	///<returns type="Number">Returns the current number of steps in the RangeSlider.</summary>
	if (steps === undefined) { return 0; }

	return this;

};

function RangeSliderThumb() {
	///<summary>Represents a range slider thumb.</summary>
	///<field name="OnChange" type="Event">(Event) Fired when the thumb's value changes.</field>
}


RangeSliderThumb.prototype.OnChange = new Event();

RangeSliderThumb.prototype.Value = function (value) {
	///<summary>(Property Function) Gets or sets the value of the RangeSliderThumb.</summary>
	///<param name="value" type="Number">(Optional) If provided, sets the value of this RangeSliderThumb.</param>
	///<returns type="Number">Retuns the current value of the RangeSliderThumb</returns>
	if (value === undefined) { return 0; }

	return this;
};

function SuggestionBox(id) {
    ///<summary>Creates a new SuggestionBox with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id of the SuggestionBox.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnTextChanged" type="UserEvent">(UserEvent)Fired when the text of the element changes.</field>
    ///<field name="OnEnterKey" type="Event">(Event)Fired when the user hits the enter key.</field>
    ///<field name="IsFocused" type="Boolean">If the input has focus for user input, this is true.</field>
    ///<field name="OnBlur" type="UserEvent">(UserEvent)Fired when the input loses focus.</field>
    ///<field name="OnFocus" type="UserEvent">(UserEvent)Fired when the input obtains focus.</field>
    ///<field name="Type" type="String">Returns Type.SuggestionBox.</field>
    ///<field name="OnSuggestionSelected" type="Event">(Event)Fired when a suggested value is selected.</field>
    ///<field name="Data" type="Array">Current list of suggested items.</field>

    NinJa.Extend(this, TextBox);
}

function $SuggestionBox(id) {
    ///<summary>Returns the SuggestionBox with the given id.</summary>
    ///<param name="id" type="String">Id of the SuggestionBox.</param>
    return new SuggestionBox();
}

SuggestionBox.prototype.OnSuggestionSelected = new Event();
SuggestionBox.prototype.Data = new Array(20);

SuggestionBox.prototype.Header = function (text) {
    ///<summary>(Property Function)Gets or sets the header text that appears above the suggestion list.</summary>
    ///<param name="text" type="string">(Optional) If provided, sets the text that appears above the suggestion list.</param>
    ///<returns type="String">The current header text.</returns>
    if (text === undefined) { return this.Type == Type.Array ? ["", "", "", "", "", ""] : ""; }
    return this;
};

SuggestionBox.prototype.SelectedData = function (data) {
    ///<summary>(Property Function)Gets or sets the selected suggested data.</summary>
    ///<param name="data" type="Object">(Optional) Sets the suggested data itme.</param>
    if (data === undefined) {
        return {};
    }

    return this;
};

SuggestionBox.prototype.DisplayClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class applied to the displayed list of suggestions.</summary>
    ///<param name="className" type="String">(Optional) Class applied to the displayed list.</param>
    if (className == undefined) {
        return "";
    }

    return this;
}

SuggestionBox.prototype.FocusClass = function (className) {
    ///<summary>(Property Function)Gets or sets the class applied to the suggested item that has focus in the list.</summary>
    ///<param name="className" type="String">(Optional) Class applied to the suggested item that has focus in the list.</param>
    if (className == undefined) {
        return "";
    }

    return this;
}

SuggestionBox.prototype.Source = function (source) {
    ///<summary>(Property Function)Gets or sets the function used to retrieve the list of suggestions. This function has the current text passed to it as the first parameter.</summary>
    ///<param name="source" type="Function">(Optional) The function used to retrieve the list of suggestions.</param>
    if (source === undefined) {
        return function () { };
    }

    return this;
}

SuggestionBox.prototype.MinLength = function (minLength) {
    ///<summary>(Property Function)Gets or sets the minimum text length required for suggestions to be retrieved.</summary>
    ///<param name="minLength" type="Number">(Optional) Minimum text length.</param>
    if (minLength === undefined) {
        return 0;
    }

    return this;
}

SuggestionBox.prototype.ShowSuggestions = function () {
    ///<summary>Manually displays the suggestions.</summary>
    return this;
};

SuggestionBox.prototype.HideSuggestions = function (forced) {
    ///<summary>Manually hides the suggestions.</summary>
    return this;
};

SuggestionBox.prototype.Update = function () {
    ///<summary>Manually updates the list of suggested items.</summary>
    return this;
}

SuggestionBox.prototype.Bind = function (data) {
    ///<summary>Sets the source of suggestions and displays the suggestion list.</summary>
    ///<param name="data" type="Array">Array of items suggested.</param>
    return this;
};

SuggestionBox.prototype.BindText = function (text) {
    ///<summary>(Property Function)Gets or sets the text value used to display suggested items.</summary>
    ///<param name="text" type="String">(Optional) Text value used to display the suggested items.</param>
    if (text === undefined) {
        return "";
    }

    return this;
}

//-Template
Type.Template = 0;

function $Template(id) {
    ///<summary>Returns the Template with the given id.</summary>
    return new Template();
}

NinJa.Extensions.Add("template", Template);

function Template() {
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnScroll" type="UserEvent">(UserEvent)Fired if the element has scroll bars and the element is scroled.</field>
    ///<field name="Type" type="String">Returns Type.Template.</field>
    NinJa.Extend(this, Div);
}

Template.prototype.Bind = function (object) {
    ///<summary>Pulls values from the object and places them inside of any expression markers
    ///indicated with {expression}. All binding exrpression rules apply.</summary>
    ///<param name="object" type="Object">Object to pull values from.</param>
};

function $CheckBoxList(id) {
    ///<summary>Returns a reference to the CheckBoxList of the given id.</summary>
    ///<param name="id" type="String">The id of the CheckBoxList.</param>
    ///<returns type="CheckBoxList">Returns a reference to the CheckBoxList of the given id.</returns>
    return new CheckBoxList();
};

Type.CheckBoxList = Type.$++;
function CheckBoxList(id) {
    ///<summary>Creates a new CheckBoxList with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id to give to the CheckBoxList.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnEnterKey" type="Event">(Event)Fired when the user hits the enter key.</field>
    ///<field name="Items" type="ObservableArray">An Array of CheckBoxListItems.</field>
    ///<field name="OnSelectionChanged" type="Event">(Event)Fired when the selected items changes.</field>
    ///<field name="SelectedItems" type="ObservableArray">A list of items currently selected.</field>
    ///<field name="Type" type="String">Returns Type.WaterMarkTextBox.</field>
}

CheckBoxList.prototype.Items = new ObservableArray();
CheckBoxList.prototype.SelectedItems = [new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem(), new CheckBoxListItem()];
CheckBoxList.prototype.OnSelectionChanged = new Event();
CheckBoxList.prototype.Type = Type.CheckBoxList;

CheckBoxList.prototype.Value = function () {
    ///<summary>Returns a comma delimited string of the values of all the items selected.</summary>
    ///<returns type="String">Returns a comma delimited string of the values of all the items selected.</returns>
    return "";
};

function CheckBoxListItem(id) {
    ///<summary>Creates a new CheckBoxListItem with the given id.</summary>
    ///<param name="id" type="String">The id of the CheckBoxListItem.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="OnEnterKey" type="Event">(Event)Fired when the user hits the enter key.</field>
    ///<field name="IsFocused" type="Boolean">If the input has focus for user input, this is true.</field>
    ///<field name="OnBlur" type="UserEvent">(UserEvent)Fired when the input loses focus.</field>
    ///<field name="OnFocus" type="UserEvent">(UserEvent)Fired when the input obtains focus.</field>
    ///<field name="Parent" type="CheckBoxList">The CheckBoxList the item belongs to.</field>
    NinJa.Extend(this, CheckBox);
    $.Parent = new CheckBoxList();
}

CheckBoxListItem.prototype.Selected = function (selected) {
    ///<summary>(Property Function)Gets or sets whether the item is selected.</summary>
    ///<param name="selected" type="Boolean">(Optional)If provided, sets whether the item  is selected.</param>
    ///<returns type="Boolean">Returns whether the item is selected.</returns>
    if (selected === undefined) {
        return false;
    }

    return this;
};

CheckBoxListItem.prototype.Content = function (content) {
    ///<summary>(Property Function)Gets or sets the HTML that appears next to the check box.</summary>
    ///<param name="content" type="String">(Optional)If provided, sets the HTML content of the label for the checkbox.</param>
    ///<returns type="String">Returns the current HTML of the label for the checkbox.</returns>
    if (content === undefined) {
        return "";
    }

    return this;
};


CheckBoxListItem.prototype.Text = function (text) {
    ///<summary>(Property Function)Gets or sets the text that appears next to the check box.</summary>
    ///<param name="content" type="String">(Optional)If provided, sets the text content of the label for the checkbox.</param>
    ///<returns type="String">Returns the current text of the label for the checkbox.</returns>
    if (text === undefined) {
        return "";
    }

    return this;
};

CheckBoxListItem.prototype.Value = function (value) {
    ///<summary>(Property Function)Gets or sets the value associated with the item.</summary>
    ///<param name="content" type="String">(Optional)If provided, sets the value associated with the item.</param>
    ///<returns type="String">Returns the current value for the item.</returns>
    if (value === undefined) {
        return "";
    }

    return this;
};


function $Tab(id) {
    ///<summary>Returns the Tab with the given id.</summary>
    return new Tab();
}

function $TabItem(id) {
    ///<summary>Returns the Tab with the given id.</summary>
    return new TabItem();
}

Type.Tab = "";
Type.TabHeader = "";
Type.TabItem = "";

var TabLayout = {
    Top: "top",
    Bottom: "bottom",
    Left: "left",
    Right: "right"
};

function Tab(id) {
    ///<summary>Creates a new Tab control with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id of the control.</param>
    ///<field name="TabItems" type="ObservableArray">Array of TabItems in the Tab control.</field>
    ///<field name="OnSelectionChanged" type="Event">&lt;Event&gt;Fired when the selected tab item has changed.</field>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="TabItems" type="ObservableArray">Array of TabItems in the tab control.</field>
    ///<field name="OnSelectionChanged" type="Event">&lt;Event&gt;Fired when the selected tab item chnages.</field>
}

Tab.prototype = new Div();
Tab.prototype.TabItems = new ObservableArray(new TabItem());
Tab.prototype.OnSelectionChanged = new Event();

Tab.prototype.SelectedItem = function (tabItem) {
    ///<summary>&lt;Property Function&gt;Gets or sets the selected tab item.</summary>
    ///<param name="tabItem" type="TabItem">(Optional) The TabItem to be selected.</param>
    if (tabItem === undefined) {
        return new TabItem();
    }

    return this;
};

function TabItem(id) {
    ///<summary>Creates a new TabItem with the given id.</summary>
    ///<field name="Header" type="Span">The element that displays in the tab header.</field>
    ///<field name="OnSelected" type="Event">(Event)Fired when the tab item is selected.</field>
}

TabItem.prototype = new Div();
TabItem.prototype.OnSelected = new Event();
TabItem.prototype.Header = new Span();

TabItem.prototype.Selected = function (selected) {
    ///<summary>&lt;Property Function&gt;Gets or sets whether the TabItem is selected.</summary>
    ///<param name="selected" type="Boolean">(Optional) Whether the TabItem is selected.</param>
    if (selected === undefined) {
        return false;
    }

    return this;
};

TabItem.prototype.Shown = function (shown) {
    ///<summary>&lt;Property Function&gt;Gets or sets whether the TabItem is shown.</summary>
    ///<param name="shown" type="Boolean">&gt;Optional&lt;Whether the TabItem is shown.<param>
    if (shown === undefined) {
        return true;
    }

    return this;
}

function TabHeader() {
    return new Span();
}



function $TemplateList(id) {
    ///<summary>Returns the template list with the given id.</summary>
    ///<param type="String" name="id">Id of the template list.</param>
    return new TemplateList();
}

function TemplateList(id) {
    ///<summary>Creates a new templated list with the given id.</summary>
    ///<param name="id" type="String">Id of the template list.</param>
    ///<field name="SelectedClass" type="String">The class to set selected template items to.</field>
    ///<field name="ItemClass" type="String">The class to set each template item to.</field>
    ///<field name="TemplateText" type="String">Templated text used to create items.</field>
    ///<field name="Items" type="ObservableArray">Array of data bound to the template list.</field>
    ///<field name="EmptyText" type="String">Text to display when the data is empty.</field>
    ////<field name="Type" type="String">Returns Type.TemplateList</field>
    ///<field name="OnSorted" type="Event">&lt;Event&gt;Fired the items have been sorted if sortable is included in the class list of the template list.</field>

    Element(this);
    Content(this);

    this.SelectedClass = "";
    this.ItemClass = "";
    this.TemplateText = "";
    this.Items = new ObservableArray();
    this.EmptyText = "";
    this.Type = "";
    this.OnSorted = new Event();

}

TemplateList.prototype.Orientation = function (orientation) {
    ///<summary>&lt;Property Function&gt;Gets or sets the orientation of the template list. Values are "horizontal" and "vertical"</summary>
    ///<param name="orientation" type="String">&lt;Optional/Default: "vertical"&gt;The orientation of the items listed.</param>
    if (orientation === undefined) { return ""; }
    return this;
}

TemplateList.prototype.Bind = function (data) {
    ///<summary>Binds the data to the template list.</summary>
    ///<param name="data" type="Array">Array of data to bind to the template list.</param>
}


TemplateList.prototype.Commit = function () {
    ///<summary>Pushes the values of the form inputs to the object bound to it.</summary>
    ///<returns type="TemplateList">Returns the instance.</returns>
    return this;
};

TemplateList.prototype.Loading = function (message) {
    ///<summary>Pushes the values of the form inputs to the object bound to it.</summary>
    //<param name="message" type="String">Do the macarena</param>/
    ///<returns type="TemplateList">Returns the instance.</returns>
    return this;
};

TemplateList.prototype.Refresh = function () {
    ///<summary>Refreshes the full display of the template list.</summary>
}

function $TemplateTableList(id) {
    ///<summary>Returns the template table list with the given id.</summary>
    ///<param type="String" name="id">Id of the template table list.</summary>
    return new TemplateList();
}

function TemplatTableList(id) {
    ///<summary>Creates a new templated table list with the given id.</summary>
    ///<param name="id" type="String">Id of the template list.</param>
    ///<field name="SelectedClass" type="String">The class to set selected template items to.</field>
    ///<field name="Items" type="ObservableArray">Array of data bound to the template list.</field>
    ////<field name="Type" type="String">Returns Type.TemplateList</field>
    ///<field name="OnSelectionChanged" type="Event">&lt;Event&gt;Fired when the selected data changes.</field>

    Element(this);
    Content(this);

    this.Items = new ObservableArray();
    //this.SelectedData = new ObservableArray();
    this.Type = "";

}

TemplatTableList.prototype.Bind = function (data) {
    ///<summary>Binds the data to the template list.</summary>
    ///<param name="data" type="Array">Array of data to bind to the template table list.</param>
}

TemplatTableList.prototype.Commit = function () {
    ///<summary>Pushes the values of the form inputs to the object bound to it.</summary>
    ///<returns type="TemplateList">Returns the instance.</returns>
    return this;
};

TemplatTableList.prototype.Loading = function (message) {
    ///<summary>Pushes the values of the form inputs to the object bound to it.</summary>
    //<param name="message" type="String">Do the macarena</param>/
    ///<returns type="TemplateList">Returns the instance.</returns>
    return this;
};

TemplatTableList.prototype.Refresh = function () {
    ///<summary>Refreshes the full display of the template table list.</summary>
}


Type.MenuItem = "MenuItem";
Type.Menu = "Menu";
Type.ContextMenu = "ContextMenu";
Type.MenuCheckItem = "MenuCheckItem";
Type.MenuIcon = "MenuIcon";

var MenuLayout = {
    Vertical: "vertical",
    Horizontal: "horizontal"
};

function $Menu() {
    ///<summary>Returns the menu with the given id.</summary>
    ///<param name="id" type="String">Id of the element.</param>
    return new Menu();
}

function $ContextMenu() {
    ///<summary>Returns the context menu element with the given id.</summary>
    ///<param name="id" type="String">Id of the element.</param>
    return new ContextMenu();
}

function $MenuItem() {
    ///<summary>Returns the menu item element with the given id.</summary>
    ///<param name="id" type="String">Id of the element.</param>
    return new MenuItem();
}

function Menu(id) {
    ///<summary>Creates a new menu with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id of the menu.</param>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="ParentItem" type="MenuItem">The menu item that displays the menu.</field>
    ///<field name="Root" type="Menu">The root menu.</field>
    ///<field name="Items" type="ObservableArray">Array of menu items found in the menu.</field>
    ///<field name="IsRoot" type="Boolean">Whether the menu is the root or not.</field>
    ///<field name="Type" type="String">Returns Type.Menu</field>
    ///<field name="OnOpening" type="Event">&lt;Event&gt;Fired when the menu is about to display.</field>
    ///<field naem="OnClosing" type="Event">&lt;Event&gt;Fired when the menu is about to hide.</field>
}

Menu.prototype = new List();
Menu.prototype.ParentItem = new MenuItem();
Menu.prototype.Root = new Menu();
Menu.prototype.Items = new ObservableArray(new MenuItem());
Menu.prototype.IsRoot = false;
Menu.prototype.OnOpening = new Event();
Menu.prototype.OnClosing = new Event();

function ContextMenu(id) {
    ///<summary>Creates a new context menu with the given id.</summary>
    ///<param name="id" type="String">(Optional) Id of the context menu.</summary>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="ParentItem" type="MenuItem">The menu item that displays the menu.</field>
    ///<field name="Root" type="ContextMenu">The root context menu.</field>
    ///<field name="Items" type="ObservableArray">Array of menu items found in the menu.</field>
    ///<field name="IsRoot" type="Boolean">Whether the menu is the root or not.</field>
    ///<field name="Type" type="String">Returns Type.ContextMenu</field>
    ///<field name="OnOpening" type="Event">&lt;Event&gt;Fired when the menu is about to display.</field>
    ///<field name="OnClosing" type="Event">&lt;Event&gt;Fired when the menu is about to hide.</field>

}

ContextMenu.prototype = new List();
ContextMenu.prototype.ParentItem = new MenuItem();
ContextMenu.prototype.Root = new Menu();
ContextMenu.prototype.Items = new ObservableArray(new MenuItem());
ContextMenu.prototype.IsRoot = false;
ContextMenu.prototype.OnOpening = new Event();
ContextMenu.prototype.OnClosing = new Event();


Menu.prototype.Show =
ContextMenu.prototype.Show = function () {
    ///<summary>Shows the menu.</summary>
}

Menu.prototype.Hide =
ContextMenu.prototype.Hide = function () {
    ///<summary>Hides the menu.</summary>
}

Menu.prototype.Layout =
ContextMenu.prototype.Layout = function (layout) {
    ///<summary>&tl;Property Function&gt;Gets or sets the layout of the menu.</summary>
    ///<param name="layout" type="MenuLayout">(Optional) The layout to use.</param>
    if (layout === undefined) { return ""; }
    return this;
};

function MenuItem(id) {
    ///<summary>Represents an item on a menu.</summary>
    ///<param name="id" type="String">(Optional) Idof the MenuItem.</param>
    ///<field name="ParentMenu" type="Menu">The menu that the menu item beleongs to.</field>
    ///<field name="Icon" type="MenuIcon">The image icon displayed next to the menu item.</field>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="OnScroll" type="UserEvent">&lt;UserEvent&gt;Fired if the element has scroll bars and the element is scroled.</field>
}

MenuItem.prototype = new ListItem();
MenuItem.prototype.ParentMenu = new Menu();
MenuItem.prototype.Icon = new MenuIcon();

function MenuCheckItem() {
    ///<summary>Represents a menu item that will change it's checked state when clicked. Its icon is shown or displayed depending on it's checked state.</summary>
    ///<param name="id" type="String">(Optional) Idof the MenuCheckItem.</param>
    ///<field name="OnCheckChanged" type="Event">&lt;Event&gt;Fired when the checked state changes.</field>
    ///<field name="ParentMenu" type="Menu">The menu that the menu item belongs to.</field>
    ///<field name="Icon" type="MenuIcon">The image icon displayed next to the menu item.</field>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Tag" type="Object">Any object to attach to the element.</field>
    ///<field name="OnScroll" type="UserEvent">&lt;UserEvent&gt;Fired if the element has scroll bars and the element is scroled.</field>
}

MenuCheckItem.prototype = new MenuItem();
MenuCheckItem.prototype.ParentMenu = new Menu();
MenuCheckItem.prototype.Icon = new MenuIcon();

MenuCheckItem.prototype.Text =
MenuItem.prototype.Text = function (text) {
    ///<summary>&lt;Property Function&gt;Gets or sets the text of the menu item.</summary>
    ///<param name="text" type="String">(Optional) Sets the text of the menu item.</param>
    if (text === undefined) {
        return "";
    }
    return this;
}

MenuCheckItem.prototype.Submenu =
MenuItem.prototype.Submenu = function (Submenu) {
    ///<summary>&lt;Property Function&gt;Gets or sets the menu to display when the parent item is clicked on or hovered on.</summary>
    ///<param name="Submenu" type="Menu/ContextMenu">(Optional) The menu to display.</param>
    if (Submenu === undefined) {
        return new Menu();
    }
}

MenuCheckItem.prototype.Enabled =
MenuItem.prototype.Enabled = function (enabled) {
    ///<summary>&lt;Property Function&gt;Gets or sets the enabled state of the menu item.</summary>
    ///<param name="enabled" type="Boolean'>(Optional) The enabled state of the menu item.</param>
    if (enabled === undefined) {
        return true;
    }

    return this;
}

MenuCheckItem.prototype.Checked = function (checked) {
    ///<summary>&lt;Property Function&gt;Gets or sets the checked state of the menu item.</summary>
    ///<param name="checked" type="Boolean">(Optional) Whether or not the menu item is checked.</param>
    if (checked === undefined) {
        return true;
    }

    return this;
}

Anchor.prototype.ContextMenu =
Body.prototype.ContextMenu =
Button.prototype.ContextMenu =
Cell.prototype.ContextMenu =
CheckBox.prototype.ContextMenu =
DropDownList.prototype.ContextMenu =
Content.prototype.ContextMenu =
ContentButton.prototype.ContextMenu =
Div.prototype.ContextMenu =
Element.prototype.ContextMenu =
FileUpload.prototype.ContextMenu =
Header.prototype.ContextMenu =
ImageElement.prototype.ContextMenu =
Label.prototype.ContextMenu =
List.prototype.ContextMenu =
ListBox.prototype.ContextMenu =
ListItem.prototype.ContextMenu =
Password.prototype.ContextMenu =
RadioButton.prototype.ContextMenu =
Row.prototype.ContextMenu =
Span.prototype.ContextMenu =
Table.prototype.ContextMenu =
TableBody.prototype.ContextMenu =
TableFoot.prototype.ContextMenu =
TableHead.prototype.ContextMenu =
TextArea.prototype.ContextMenu =
TextBox.prototype.ContextMenu = function (ctxMenu) {
    ///<summary>&lt;Property Function&gt;Gets or sets the context menu to display when the user right clicks on the element. If the context menu is set, the normal browser context menu is suppressed.</summary>
    ///<param name="ctxMenu" type="ContextMenu">(Optional) The context menu to attach to the element.</param>
    if (ctxMenu === undefined) {
        return new ContextMenu();
    }

    return this;
}

function MenuIcon() {
    ///<summary>Represents an icon displayed to the left of the menu item.</summary>
    return new ImageElement();
}

MenuIcon.prototype.Source = function (source) {
    ///<summary>&lt;Property Function&lt;Gets or sets the source of the image for the icon.</summary>
    ///<param name="source" type="String">(Optional) The source of the image.</param>
    if (source == undefined) {
        return "";
    }

    return this;
}

function Separator() {
    ///<summary>Creates a new separator to separate menu items.</summary>
    ///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
    ///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
    ///<field name="OnClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user clicks on the element.</field>
    ///<field name="OnDoubleClick" type="UserEvent">&lt;UserEvent&gt;Fired when the user double clicks on the element.</field>
    ///<field name="OnMouseOut" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse away from the element.</field>
    ///<field name="OnMouseOver" type="UserEvent">&lt;UserEvent&gt;Fired when the user moves the mouse on to the element.</field>
    ///<field name="OnMouseMove" type="UserEvent">&lt;UserEvent&gt;Fired when the user removes the mouse on the element.</field>
    ///<field name="OnMouseDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses the left mouse button down on to the element.</field>
    ///<field name="OnMouseUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases the left mouse button on the element.</field>
    ///<field name="OnKeyDown" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key down on the element.</field>
    ///<field name="OnKeyUp" type="UserEvent">&lt;UserEvent&gt;Fired when the user releases a key on the element.</field>
    ///<field name="OnKeyPress" type="UserEvent">&lt;UserEvent&gt;Fired when the user presses a key element.</field>
    ///<field name="OnContextMenu" type="UserEvent">&lt;UserEvent&gt;Fired when the user makes a context menu appear over the element.</field>
    ///<field name="OnMouseWheel" type="UserEvent">&lt;UserEvent&gt;Fired when the user rolls the mouse wheel over element.</field>
    ///<field name="Type" type="String">Returns Type.Separator.</field>
    return new Element();
}

var NinJaUI = {
    Version: "1.2",
    ZIndex: 1000
};

var Speed = {
    Slow: 400,
    Normal: 200,
    Fast: 100
};

var Alignment = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3,
    Center: 4,
    Middle: 5
};

var Aspect = {
    Outside: 0,
    Inside: 1
};


var Side = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3
};

var Direction = {
    Vertical: 1,
    Horizontal: 2,
    Diagonal: 3
};

var Effects = LazyEnum({
    None: "none",
    Fade: "fade",
    Slide: "slide",
    FoldVertical: "foldv",
    FoldHorizontal: "foldh",
    FoldBoth: "foldd"
});

var Edge = LazyEnum({
    NorthWest: Cursor.NorthWest,
    SouthEast: Cursor.SouthEast,
    SouthWest: Cursor.SouthWest,
    NorthEast: Cursor.NorthEast,
    North: Cursor.North,
    West: Cursor.West,
    South: Cursor.South,
    East: Cursor.East
});

NinJaUI.TextHeight = function (text, fontFamily, fontToggleFade) {
    ///<summary>Measures the height of the text given the font family and font size.</summary>
    ///<param name="text" type="String">The text to measure.</param>
    ///<param name="fontFamily" type="String" optional="true" default="default">(Optional) The family of to use to render the text.</param>
    ///<param name="fontToggleFade" type="Number" optional="true" default="default">(Optional) The size of the font, in points, to render the text.</param>
    ///<returns type="Number">Returns the height of the rendered text in pixels.</returns>
    return 0;
};

NinJaUI.TextWidth = function (text, fontFamily, fontToggleFade) {
    ///<summary>Measures the width of the text given the font family and font size.</summary>
    ///<param name="text" type="String">The text to measure.</param>
    ///<param name="fontFamily" type="String" optional="true" default="default">(Optional) The family of to use to render the text.</param>
    ///<param name="fontToggleFade" type="Number" optional="true" default="default">(Optional) The size of the font, in points, to render the text.</param>
    ///<returns type="Number">Returns the width of the rendered text in pixels.</returns>
};

function Animation(element, property, from, to, time, frames, func) {
    ///<summary>Represents an animation that modifies a property over a set time in provided number of frames.</summary>
    ///<param name="element" type="Element">Element to modify for the animation.</param>
    ///<param name="property" type="String">Property to modify for the animation.</param>
    ///<param name="from" type="Object">A number or unit (Point, ToggleFade, Color, etc) that is the start point of the animation.</param>
    ///<param name="to" type="Object">A number or unit (Point, ToggleFade, Color, etc) that is the end point of the animation</param>
    ///<param name="time" type="Number">The number of milliseconds the animation should last.</param>
    ///<param name="frames" type="Number">The number of frames the animation should last.</param>
    ///<param name="func" type="Function">The function to execute once the animation is finished.</param>
    ///<field name="Element" type="Element">The element the animation is modifying.</field>
    ///<field name="Property" type="String">The name of the property the animation is modifying.</field>
    ///<field name="From" type="Number">Number or unit the animation started from.</field>
    ///<field name="To" type="Number">Number or unit the animation ends on.</field>
    ///<field name="Time" type="Number">Number of milliseconds the animation should last.</field>
    ///<field name="Frames" type="Number">Number of frames the animation should last.</field>
    ///<field name="Value" type="Number">Number or unit the element is currently set to in the current animation frame.</field>
    ///<field name="Step" type="Number">Number or unit that represents the amount of change to the property set per frame.</field>
    ///<field name="Steps" type="Number">Number of frames left in the animation.</field>
    ///<field name="Timer" type="Timer">The timer used to execute each frame of the animation.</field>
    ///<field name="OnFinish" type="Function">Function to execute once the animation is funished.</field>
}

Animation.prototy.Element = new Element();
Animation.prototy.Property = "";
Animation.prototy.From = 0;
Animation.prototy.To = 0;
Animation.prototy.Time = 0;
Animation.prototy.Frames = 0;
Animation.prototy.Value = 0;
Animation.prototy.Step = 0;
Animation.prototy.Steps = 0;
Animation.prototy.Timer = new Timer(0);
Animation.prototy.OnFinish = function () { };

Animation.prototype.Reverse = function () {
    ///<summary>Reverses the animation by switch the To and From values.</summary>
    ///<returns type="Animation">Returns the instance.</returns>
    return this;
};

Animation.prototype.Start = function () {
    ///<summary>Starts the animation.</summary>
    ///<returns type="Animation">Returns the instance.</returns>
    return this;
}

Animation.prototype.Next = function () {
    ///<summary>Calls the next frame of the animation.</summary>
    ///<returns type="Animation">Returns the instance.</returns>
    return this;
};

Animation.prototype.Stop = function () {
    ///<summary>Stops the animation.</summary>
    ///<returns type="Animation">Returns the instance.</returns>
    return this;
}

Anchor.prototype.FadeOut =
Body.prototype.FadeOut =
Button.prototype.FadeOut =
Cell.prototype.FadeOut =
CheckBox.prototype.FadeOut =
DropDownList.prototype.FadeOut =
Content.prototype.FadeOut =
ContentButton.prototype.FadeOut =
Div.prototype.FadeOut =
Element.prototype.FadeOut =
FileUpload.prototype.FadeOut =
Header.prototype.FadeOut =
ImageElement.prototype.FadeOut =
Label.prototype.FadeOut =
List.prototype.FadeOut =
ListBox.prototype.FadeOut =
ListItem.prototype.FadeOut =
Password.prototype.FadeOut =
RadioButton.prototype.FadeOut =
Row.prototype.FadeOut =
Span.prototype.FadeOut =
Table.prototype.FadeOut =
TableBody.prototype.FadeOut =
TableFoot.prototype.FadeOut =
TableHead.prototype.FadeOut =
TextArea.prototype.FadeOut =
TextBox.prototype.FadeOut = function (time, frames, func) {
    ///<summary>Fades the element out by modifying the opacity from the current value to 0.</summary>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="6">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.FadeIn =
Body.prototype.FadeIn =
Button.prototype.FadeIn =
Cell.prototype.FadeIn =
CheckBox.prototype.FadeIn =
DropDownList.prototype.FadeIn =
Content.prototype.FadeIn =
ContentButton.prototype.FadeIn =
Div.prototype.FadeIn =
Element.prototype.FadeIn =
FileUpload.prototype.FadeIn =
Header.prototype.FadeIn =
ImageElement.prototype.FadeIn =
Label.prototype.FadeIn =
List.prototype.FadeIn =
ListBox.prototype.FadeIn =
ListItem.prototype.FadeIn =
Password.prototype.FadeIn =
RadioButton.prototype.FadeIn =
Row.prototype.FadeIn =
Span.prototype.FadeIn =
Table.prototype.FadeIn =
TableBody.prototype.FadeIn =
TableFoot.prototype.FadeIn =
TableHead.prototype.FadeIn =
TextArea.prototype.FadeIn =
TextBox.prototype.FadeIn = function (time, frames, func) {
    ///<summary>Fades the element in by modifying the opacity from the current value to 1.</summary>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="6">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.FadeTo =
Body.prototype.FadeTo =
Button.prototype.FadeTo =
Cell.prototype.FadeTo =
CheckBox.prototype.FadeTo =
DropDownList.prototype.FadeTo =
Content.prototype.FadeTo =
ContentButton.prototype.FadeTo =
Div.prototype.FadeTo =
Element.prototype.FadeTo =
FileUpload.prototype.FadeTo =
Header.prototype.FadeTo =
ImageElement.prototype.FadeTo =
Label.prototype.FadeTo =
List.prototype.FadeTo =
ListBox.prototype.FadeTo =
ListItem.prototype.FadeTo =
Password.prototype.FadeTo =
RadioButton.prototype.FadeTo =
Row.prototype.FadeTo =
Span.prototype.FadeTo =
Table.prototype.FadeTo =
TableBody.prototype.FadeTo =
TableFoot.prototype.FadeTo =
TableHead.prototype.FadeTo =
TextArea.prototype.FadeTo =
TextBox.prototype.FadeTo = function (opacity, time, frames, func) {
    ///<summary>Fades the element in by modifying the opacity from the current value to 1.</summary>
    ///<param name="opacity" type="Number">Opacity value to fade to.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="6">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.ToggleFade =
Body.prototype.ToggleFade =
Button.prototype.ToggleFade =
Cell.prototype.ToggleFade =
CheckBox.prototype.ToggleFade =
DropDownList.prototype.ToggleFade =
Content.prototype.ToggleFade =
ContentButton.prototype.ToggleFade =
Div.prototype.ToggleFade =
Element.prototype.ToggleFade =
FileUpload.prototype.ToggleFade =
Header.prototype.ToggleFade =
ImageElement.prototype.ToggleFade =
Label.prototype.ToggleFade =
List.prototype.ToggleFade =
ListBox.prototype.ToggleFade =
ListItem.prototype.ToggleFade =
Password.prototype.ToggleFade =
RadioButton.prototype.ToggleFade =
Row.prototype.ToggleFade =
Span.prototype.ToggleFade =
Table.prototype.ToggleFade =
TableBody.prototype.ToggleFade =
TableFoot.prototype.ToggleFade =
TableHead.prototype.ToggleFade =
TextArea.prototype.ToggleFade =
TextBox.prototype.ToggleFade = function (time, frames, func) {
    ///<summary>Fades the element in or out depending on the current value of opacity. A 0 fades it in, anything else fades it out.</summary>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="6">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.ResizeTo =
Body.prototype.ResizeTo =
Button.prototype.ResizeTo =
Cell.prototype.ResizeTo =
CheckBox.prototype.ResizeTo =
DropDownList.prototype.ResizeTo =
Content.prototype.ResizeTo =
ContentButton.prototype.ResizeTo =
Div.prototype.ResizeTo =
Element.prototype.ResizeTo =
FileUpload.prototype.ResizeTo =
Header.prototype.ResizeTo =
ImageElement.prototype.ResizeTo =
Label.prototype.ResizeTo =
List.prototype.ResizeTo =
ListBox.prototype.ResizeTo =
ListItem.prototype.ResizeTo =
Password.prototype.ResizeTo =
RadioButton.prototype.ResizeTo =
Row.prototype.ResizeTo =
Span.prototype.ResizeTo =
Table.prototype.ResizeTo =
TableBody.prototype.ResizeTo =
TableFoot.prototype.ResizeTo =
TableHead.prototype.ResizeTo =
TextArea.prototype.ResizeTo =
TextBox.prototype.ResizeTo = function (size, time, frames, func) {
    ///<summary>Resizes the element in an animation.</summary>
    ///<param name="size" type="Size">The size to animate the element to.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.Shrink =
Body.prototype.Shrink =
Button.prototype.Shrink =
Cell.prototype.Shrink =
CheckBox.prototype.Shrink =
DropDownList.prototype.Shrink =
Content.prototype.Shrink =
ContentButton.prototype.Shrink =
Div.prototype.Shrink =
Element.prototype.Shrink =
FileUpload.prototype.Shrink =
Header.prototype.Shrink =
ImageElement.prototype.Shrink =
Label.prototype.Shrink =
List.prototype.Shrink =
ListBox.prototype.Shrink =
ListItem.prototype.Shrink =
Password.prototype.Shrink =
RadioButton.prototype.Shrink =
Row.prototype.Shrink =
Span.prototype.Shrink =
Table.prototype.Shrink =
TableBody.prototype.Shrink =
TableFoot.prototype.Shrink =
TableHead.prototype.Shrink =
TextArea.prototype.Shrink =
TextBox.prototype.Shrink = function (direction, time, frames, func) {
    //<summary>Resizes the element in an animation to a width of 0 and height of 0.</summary>
    ///<param name="direction" type="String" optional="true" default="Direction.Diagonl">The direction to resize the element in.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.Grow =
Body.prototype.Grow =
Button.prototype.Grow =
Cell.prototype.Grow =
CheckBox.prototype.Grow =
DropDownList.prototype.Grow =
Content.prototype.Grow =
ContentButton.prototype.Grow =
Div.prototype.Grow =
Element.prototype.Grow =
FileUpload.prototype.Grow =
Header.prototype.Grow =
ImageElement.prototype.Grow =
Label.prototype.Grow =
List.prototype.Grow =
ListBox.prototype.Grow =
ListItem.prototype.Grow =
Password.prototype.Grow =
RadioButton.prototype.Grow =
Row.prototype.Grow =
Span.prototype.Grow =
Table.prototype.Grow =
TableBody.prototype.Grow =
TableFoot.prototype.Grow =
TableHead.prototype.Grow =
TextArea.prototype.Grow =
TextBox.prototype.Grow = function (direction, time, frames, func) {
    //<summary>Resizes the element in an animation to the full size width and height.</summary>
    ///<param name="direction" type="String" optional="true" default="Direction.Diagonl">The direction to resize the element in.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
}

Anchor.prototype.ToggleSize =
Body.prototype.ToggleSize =
Button.prototype.ToggleSize =
Cell.prototype.ToggleSize =
CheckBox.prototype.ToggleSize =
DropDownList.prototype.ToggleSize =
Content.prototype.ToggleSize =
ContentButton.prototype.ToggleSize =
Div.prototype.ToggleSize =
Element.prototype.ToggleSize =
FileUpload.prototype.ToggleSize =
Header.prototype.ToggleSize =
ImageElement.prototype.ToggleSize =
Label.prototype.ToggleSize =
List.prototype.ToggleSize =
ListBox.prototype.ToggleSize =
ListItem.prototype.ToggleSize =
Password.prototype.ToggleSize =
RadioButton.prototype.ToggleSize =
Row.prototype.ToggleSize =
Span.prototype.ToggleSize =
Table.prototype.ToggleSize =
TableBody.prototype.ToggleSize =
TableFoot.prototype.ToggleSize =
TableHead.prototype.ToggleSize =
TextArea.prototype.ToggleSize =
TextBox.prototype.ToggleSize = function (direction, time, frames, func) {
    //<summary>Resizes the element in an animation to a width of 0 and height of 0.</summary>
    ///<param name="direction" type="String" optional="true" default="Direction.Diagonl">The direction to resize the element in.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.SlideTo =
Body.prototype.SlideTo =
Button.prototype.SlideTo =
Cell.prototype.SlideTo =
CheckBox.prototype.SlideTo =
DropDownList.prototype.SlideTo =
Content.prototype.SlideTo =
ContentButton.prototype.SlideTo =
Div.prototype.SlideTo =
Element.prototype.SlideTo =
FileUpload.prototype.SlideTo =
Header.prototype.SlideTo =
ImageElement.prototype.SlideTo =
Label.prototype.SlideTo =
List.prototype.SlideTo =
ListBox.prototype.SlideTo =
ListItem.prototype.SlideTo =
Password.prototype.SlideTo =
RadioButton.prototype.SlideTo =
Row.prototype.SlideTo =
Span.prototype.SlideTo =
Table.prototype.SlideTo =
TableBody.prototype.SlideTo =
TableFoot.prototype.SlideTo =
TableHead.prototype.SlideTo =
TextArea.prototype.SlideTo =
TextBox.prototype.SlideTo = function (Point, time, frames, func) {
    //<summary>Resizes the element in an animation to a width of 0 and height of 0.</summary>
    ///<param name="Point" type="Point">The Point to move the element to.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="20">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.BlendBgTo =
Body.prototype.BlendBgTo =
Button.prototype.BlendBgTo =
Cell.prototype.BlendBgTo =
CheckBox.prototype.BlendBgTo =
DropDownList.prototype.BlendBgTo =
Content.prototype.BlendBgTo =
ContentButton.prototype.BlendBgTo =
Div.prototype.BlendBgTo =
Element.prototype.BlendBgTo =
FileUpload.prototype.BlendBgTo =
Header.prototype.BlendBgTo =
ImageElement.prototype.BlendBgTo =
Label.prototype.BlendBgTo =
List.prototype.BlendBgTo =
ListBox.prototype.BlendBgTo =
ListItem.prototype.BlendBgTo =
Password.prototype.BlendBgTo =
RadioButton.prototype.BlendBgTo =
Row.prototype.BlendBgTo =
Span.prototype.BlendBgTo =
Table.prototype.BlendBgTo =
TableBody.prototype.BlendBgTo =
TableFoot.prototype.BlendBgTo =
TableHead.prototype.BlendBgTo =
TextArea.prototype.BlendBgTo =
TextBox.prototype.BlendBgTo = function (color, time, frames, func) {
    ///<summary>Blends the background color into the provided color.</summary>
    ///<param name="color" type="Color">Color to bend the background to.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

Anchor.prototype.BlendFgTo =
Body.prototype.BlendFgTo =
Button.prototype.BlendFgTo =
Cell.prototype.BlendFgTo =
CheckBox.prototype.BlendFgTo =
DropDownList.prototype.BlendFgTo =
Content.prototype.BlendFgTo =
ContentButton.prototype.BlendFgTo =
Div.prototype.BlendFgTo =
Element.prototype.BlendFgTo =
FileUpload.prototype.BlendFgTo =
Header.prototype.BlendFgTo =
ImageElement.prototype.BlendFgTo =
Label.prototype.BlendFgTo =
List.prototype.BlendFgTo =
ListBox.prototype.BlendFgTo =
ListItem.prototype.BlendFgTo =
Password.prototype.BlendFgTo =
RadioButton.prototype.BlendFgTo =
Row.prototype.BlendFgTo =
Span.prototype.BlendFgTo =
Table.prototype.BlendFgTo =
TableBody.prototype.BlendFgTo =
TableFoot.prototype.BlendFgTo =
TableHead.prototype.BlendFgTo =
TextArea.prototype.BlendFgTo =
TextBox.prototype.BlendFgTo = function (color, time, frames, func) {
    ///<summary>Blends the foreground color into the provided color.</summary>
    ///<param name="color" type="Color">Color to bend the foreground to.</param>
    ///<param name="time" type="Number" optional="true" default="300">Number of milliseconds to execute the animation.</param>
    ///<param name="frames" type="Number" optional="true" default="10">Number of frames to execute the animation in.</param>
    ///<param name="func" type="Function" otpional="true">Function to execute once the animation is complete.</param>
    ///<returns type="Animation">Returns the animation object generated.</returns>
    return new Animation();
};

function Size(width, height) {
    ///<summary>Object that represents a unit of width and height in pixels.</summary>
    ///<param name="width" type="Number" optional="true">Width in pixels.</param>
    ///<param name="height" type="Number" optional="true">Height in pixels.</param>
    ///<field name="Width" type="Number">Width in pixels.</field>
    ///<field name="Height" type="Number">Height in pixels.</field>
}

Size.prototype.Width = 0;
Size.prototype.Height = 0;

function Point(x, y) {
    ///<summary>Object that represents a unit of x and y position in pixels.</summary>
    ///<param name="x" type="Number" optional="true">X in pixels.</param>
    ///<param name="y" type="Number" optional="true">Y in pixels.</param>
    ///<field name="X" type="Number">X in pixels.</field>
    ///<field name="Y" type="Number">Y in pixels.</field>
}

Point.prototype.X = 0;
Point.prototype.Y = 0;


Anchor.prototype.ToggleFade =
Body.prototype.ToggleFade =
Button.prototype.ToggleFade =
Cell.prototype.ToggleFade =
CheckBox.prototype.ToggleFade =
DropDownList.prototype.ToggleFade =
Content.prototype.ToggleFade =
ContentButton.prototype.ToggleFade =
Div.prototype.ToggleFade =
Element.prototype.ToggleFade =
FileUpload.prototype.ToggleFade =
Header.prototype.ToggleFade =
ImageElement.prototype.ToggleFade =
Label.prototype.ToggleFade =
List.prototype.ToggleFade =
ListBox.prototype.ToggleFade =
ListItem.prototype.ToggleFade =
Password.prototype.ToggleFade =
RadioButton.prototype.ToggleFade =
Row.prototype.ToggleFade =
Span.prototype.ToggleFade =
Table.prototype.ToggleFade =
TableBody.prototype.ToggleFade =
TableFoot.prototype.ToggleFade =
TableHead.prototype.ToggleFade =
TextArea.prototype.ToggleFade =
TextBox.prototype.ToggleFade = function (size) {
    ///<summary>(Property Function) Gets or sets the size of the element as a ToggleFade unit object.</summary>
    ///<param name="size" type="ToggleFade" optional="true">(Optional) The size of the object in pixels.</param>
    ///<returns type="ToggleFade">Returns the size of the element as a ToggleFade object.</returns>
    if (size === undefined) {
        return new ToggleFade();
    }

    return this;
};

Anchor.prototype.Point =
Body.prototype.Point =
Button.prototype.Point =
Cell.prototype.Point =
CheckBox.prototype.Point =
DropDownList.prototype.Point =
Content.prototype.Point =
ContentButton.prototype.Point =
Div.prototype.Point =
Element.prototype.Point =
FileUpload.prototype.Point =
Header.prototype.Point =
ImageElement.prototype.Point =
Label.prototype.Point =
List.prototype.Point =
ListBox.prototype.Point =
ListItem.prototype.Point =
Password.prototype.Point =
RadioButton.prototype.Point =
Row.prototype.Point =
Span.prototype.Point =
Table.prototype.Point =
TableBody.prototype.Point =
TableFoot.prototype.Point =
TableHead.prototype.Point =
TextArea.prototype.Point =
TextBox.prototype.Point = function (Point) {
    ///<summary>(Property Function) Gets or sets the Point of the element as a Point unit object.</summary>
    ///<param name="Point" type="Point" optional="true">(Optional) The Point of the object in pixels.</param>
    ///<returns type="Point">Returns the Point of the element as a Point object.</returns>
    if (Point === undefined) {
        return new Point();
    }

    return this;
};

nchor.prototype.Size =
Body.prototype.Size =
Button.prototype.Size =
Cell.prototype.Size =
CheckBox.prototype.Size =
DropDownList.prototype.Size =
Content.prototype.Size =
ContentButton.prototype.Size =
Div.prototype.Size =
Element.prototype.Size =
FileUpload.prototype.Size =
Header.prototype.Size =
ImageElement.prototype.Size =
Label.prototype.Size =
List.prototype.Size =
ListBox.prototype.Size =
ListItem.prototype.Size =
Password.prototype.Size =
RadioButton.prototype.Size =
Row.prototype.Size =
Span.prototype.Size =
Table.prototype.Size =
TableBody.prototype.Size =
TableFoot.prototype.Size =
TableHead.prototype.Size =
TextArea.prototype.Size =
TextBox.prototype.Size = function (size) {
    ///<summary>(Property Function) Gets or sets the size of the element as a Size unit object.</summary>
    ///<param name="size" type="size" optional="true">(Optional) The size of the object in pixels.</param>
    ///<returns type="Size">Returns the size of the element as a size object.</returns>
    if (size === undefined) {
        return new Size();
    }

    return this;
};

function Bounds() {
    ///<summary>Represents the .FormPostions of each edge of an element.</summary>
    ///<field name="left" type="Number">Left edge of the element.</field>
    ///<field name="Right" type="Number">Right edge of the element.</field>
    ///<field name="Top" type="Number">Top edge of the element.</field>
    ///<field name="Bottom" type="Number">Bottom edge of the element.</field>
}

Bounds.prototype.Left = 0;
Bounds.prototype.Right = 0;
Bounds.prototype.Top = 0;
Bounds.prototype.Bottom = 0;

Bounds.prototype.Contains = function (x, y) {
    ///<summary>Determines if the bounds area contains the given x and y values.</summary>
    ///<param name="x" type="Number">X position in pixels.</param>
    ///<param name="Y" type="Number">Y position in pixels.</param>
    ///<returns type="Boolean">Returns whether the x and y position lie within the bounds.</returns>
    return true;
};

Bounds.prototype.OnEdge = function (x, y, edge, proximity) {
    ///<summary>Determines if the x and y position is on the edge of the bounds given the proximity.</summary>
    ///<param name="x" type="Number">X position.</param>
    ///<param name="y" type="Number">Y position.</param>
    ///<param name="edge" type="Edige">The edge to test.</param>
    ///<param name="proximity" type="Number" optional="true" default="1">How close to the edge the x and y position must be to return true.</param>
    ///<returns 
};

Anchor.prototype.GetBounds =
Body.prototype.GetBounds =
Button.prototype.GetBounds =
Cell.prototype.GetBounds =
CheckBox.prototype.GetBounds =
DropDownList.prototype.GetBounds =
Content.prototype.GetBounds =
ContentButton.prototype.GetBounds =
Div.prototype.GetBounds =
Element.prototype.GetBounds =
FileUpload.prototype.GetBounds =
Header.prototype.GetBounds =
ImageElement.prototype.GetBounds =
Label.prototype.GetBounds =
List.prototype.GetBounds =
ListBox.prototype.GetBounds =
ListItem.prototype.GetBounds =
Password.prototype.GetBounds =
RadioButton.prototype.GetBounds =
Row.prototype.GetBounds =
Span.prototype.GetBounds =
Table.prototype.GetBounds =
TableBody.prototype.GetBounds =
TableFoot.prototype.GetBounds =
TableHead.prototype.GetBounds =
TextArea.prototype.GetBounds =
TextBox.prototype.GetBounds = function () {
    ///<summary>Determines the left, right, top and bottom boundaries of the element</summary>
    ///<returns type="Bounds">Returns a bounds object.</returns>
    return new Bounds();
};

Anchor.prototype.SnapTo =
Body.prototype.SnapTo =
Button.prototype.SnapTo =
Cell.prototype.SnapTo =
CheckBox.prototype.SnapTo =
DropDownList.prototype.SnapTo =
Content.prototype.SnapTo =
ContentButton.prototype.SnapTo =
Div.prototype.SnapTo =
Element.prototype.SnapTo =
FileUpload.prototype.SnapTo =
Header.prototype.SnapTo =
ImageElement.prototype.SnapTo =
Label.prototype.SnapTo =
List.prototype.SnapTo =
ListBox.prototype.SnapTo =
ListItem.prototype.SnapTo =
Password.prototype.SnapTo =
RadioButton.prototype.SnapTo =
Row.prototype.SnapTo =
Span.prototype.SnapTo =
Table.prototype.SnapTo =
TableBody.prototype.SnapTo =
TableFoot.prototype.SnapTo =
TableHead.prototype.SnapTo =
TextArea.prototype.SnapTo =
TextBox.prototype.SnapTo = function (element, side, alignment, aspect, xPad, yPad) {
    ///<summary>Moves the element to one of the sides of the parent element.</summary>
    ///<param name="element" type="Element">Element to move instance to. Can be the Client as well.</param>
    ///<param name="side" type="Side">Side to move the element to.</param>
    ///<param name="alignment" type="Alignment">How the element should be aligned to the parent element.</param>
    ///<param name="aspect" type="Aspect">Inside or outside the element.</param>
    ///<param name="xPad" type="Number" optional="true" default="0">How much to offset the element on the x plane.</param>
    ///<param name="yPad" type="Number" optional="true" default="0">How much to offset the element on the y plane.</param>
    ///<returns type="Element">Returns instance.</returns>
}

Anchor.prototype.IsClipped =
Body.prototype.IsClipped =
Button.prototype.IsClipped =
Cell.prototype.IsClipped =
CheckBox.prototype.IsClipped =
DropDownList.prototype.IsClipped =
Content.prototype.IsClipped =
ContentButton.prototype.IsClipped =
Div.prototype.IsClipped =
Element.prototype.IsClipped =
FileUpload.prototype.IsClipped =
Header.prototype.IsClipped =
ImageElement.prototype.IsClipped =
Label.prototype.IsClipped =
List.prototype.IsClipped =
ListBox.prototype.IsClipped =
ListItem.prototype.IsClipped =
Password.prototype.IsClipped =
RadioButton.prototype.IsClipped =
Row.prototype.IsClipped =
Span.prototype.IsClipped =
Table.prototype.IsClipped =
TableBody.prototype.IsClipped =
TableFoot.prototype.IsClipped =
TableHead.prototype.IsClipped =
TextArea.prototype.IsClipped =
TextBox.prototype.IsClipped = function (element) {
    ///<summary>Determines if the element provided is clipped by the instance's bounds.</summary>
    ///<param name="element" type="Element">Element to test.</param>
    ///<returns type="Boolean">Returns whether the element is clipped by the instance's view area.</returns>
};

Color.prototype.Darken = function (percentage) {
    return new Color();
};


function $TagList(id) {
    ///<summary>Returns the TagList by  the given name.</summary>
    ///<param name="id" type="String">Id of the TagList.</param>
    ///<returns type="TagList">Returns the TagList.</returns>
    return new TagList();
}

function TagList(id) {
    ///<summary>Creates a new TagList Control.</summary>
    ///<param name="id" isOptional="true">(Optional) Id of the TagList.</param>
    ///<field name="Items" type="Array">Collection of strings in the tag list.</field>
    ///<field name="Container" type="Div">Container of the tag ui elements.</field>
}

TagList.prototype.Value = function (array) {
    ///<summary>(Property Function) Gets or sets the array of strings to set the tag list to.</summary>
    ///<param name="array" type="Array" isOptiona="true">(Optional) If provided, sets the list of tags.</param>
    
    if (array === undefined) { return array.Type == Type.Array ? ["", "", "", "", "", "", ""] : ""; }
    return this;
}


TagList.DeleteIcon = null;
TagList.DeleteCharacter = "☓";
TagList.Delimeter = ",";
TagList.UpIcon = "▲";
TagList.DownIcon = "▼";
TagList.LeftIcon = "◀";
TagList.RightIcon = "▶";


function $SlideShow(id) {
	/// <summary>Returns the slide with the given id.</summary>
}

function SlideShow(id) {
	/// <summary>Creates a new SlideShow with the given id.</summary>
	/// <param name="id" type="String">Id of the SlideShow</param>
	this.Slides = new ObservableArray(this);
	this.PreviousSlide = null;
	this.CurrentSlide = null;
}

SlideShow.prototype.Slides = new ObservableArray();
SlideShow.prototype.PreviousSlide = new Div();
SlideShow.prototype.CurrentSlide = new Div();

SlideShow.prototype.Next = function () {
	/// <summary>Goes to the next slide. <summary>
	return this;
}

SlideShow.prototype.Previous = function () {
	/// <summary>Goes to the previous slide. <summary>
	return this;
}

SlideShow.prototype.GoTo = function (index) {
	/// <summary>Goes to the specified slide. <summary>
	/// <param name="index" type="Number">The index of the slide to go to.</param>
	return this;
};

function Tree(id) {
	/// <summary>Returns the Tree with the given id.</summary>
	return new Tree();
}

function $TreeNode(id) {
	/// <summary>Returns the TreeNode with the given id.</summary>
	return new TreeNode();
}

function Tree(id) {
	///<summary>Creates a new Tree control with the given id.</summary>
	///<param name="id" type="String">Id to apply to the element.</param>
	///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
	///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
	///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
	///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
	///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
	///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
	///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
	///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
	///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
	///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
	///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
	///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
	///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
	///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
	///<field name="OnScroll" type="UserEvent">(UserEvent)Fired if the element has scroll bars and the element is scroled.</field>
	///<field name="Type" type="String">Returns Type.Tree.</field>
	///<field name="Items" type="ObservableArray">Array of TreeNodes.</field>
	///<field name="OnSelectedNodeChanged" type="Event">(Event) Fires when a different TreeNode is selected.</field>
}

Tree.prototype.Items = [new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode(), new TreeNode()];
Tree.prototype.OnSelectedNodeChanged = new Event();

Tree.prototype.SelectedNode = function (node) {
	///<summary>(Property Function)Gets or sets the currently selected TreeNode in the tree.</summary>
	if (node === undefined) {
		return new TreeNode();
	}

	return this;
}

function TreeNode() {
	///<summary>Creates a new Tree control with the given id.</summary>
	///<param name="id" type="String">Id to apply to the element.</param>
	///<field name="Classes" type="ClassArray">Collection of classes applied to the element.</field>
	///<field name="IsMouseOver" type="Boolean">Set to true if the mouse is over the element.</field>
	///<field name="OnClick" type="UserEvent">(UserEvent)Fired when the user clicks on the element.</field>
	///<field name="OnDoubleClick" type="UserEvent">(UserEvent)Fired when the user double clicks on the element.</field>
	///<field name="OnMouseOut" type="UserEvent">(UserEvent)Fired when the user moves the mouse away from the element.</field>
	///<field name="OnMouseOver" type="UserEvent">(UserEvent)Fired when the user moves the mouse on to the element.</field>
	///<field name="OnMouseMove" type="UserEvent">(UserEvent)Fired when the user removes the mouse on the element.</field>
	///<field name="OnMouseDown" type="UserEvent">(UserEvent)Fired when the user presses the left mouse button down on to the element.</field>
	///<field name="OnMouseUp" type="UserEvent">(UserEvent)Fired when the user releases the left mouse button on the element.</field>
	///<field name="OnKeyDown" type="UserEvent">(UserEvent)Fired when the user presses a key down on the element.</field>
	///<field name="OnKeyUp" type="UserEvent">(UserEvent)Fired when the user releases a key on the element.</field>
	///<field name="OnKeyPress" type="UserEvent">(UserEvent)Fired when the user presses a key element.</field>
	///<field name="OnContextMenu" type="UserEvent">(UserEvent)Fired when the user makes a context menu appear over the element.</field>
	///<field name="OnMouseWheel" type="UserEvent">(UserEvent)Fired when the user rolls the mouse wheel over element.</field>
	///<field name="OnScroll" type="UserEvent">(UserEvent)Fired if the element has scroll bars and the element is scroled.</field>
	///<field name="Type" type="String">Returns Type.Tree.</field>
	///<field name="Items" type="ObservableArray">Array of TreeNodes.</field>
	///<field name="OnSelected" type="Event">(Event)Fired when this TreeNode is selected.</field>
	///<field name="ChildTree" type="Tree">(Event)Fired when this TreeNode is selected.</field>
}

TreeNode.prototype.ChildTree = new Tree();

TreeNode.prototype.Text = function (text) {
	///<summary>(Property Function)Gets or sets the text for the node.</summary>
	///<param name="text" type="String">(Optional) The text to set for the TreeNode.<param> 
	if (text === undefined) {
		return "";
	}

	return this;
}
TreeNode.prototype.Selected = function (selected) {
	///<summary>(Property Function)Gets or sets if this node is selected.</summary>
	///<param name="selected" type="Boolean">(Optional) Whether this node is selcted.<param> 
	if (selected === undefined) {
		return true;
	}

	return this;
};

TreeNode.prototype.Opened = function (opened) {
	///<summary>(Property Function)Gets or sets if this node's child tree is opened.</summary>
	///<param name="opened" type="Boolean">(Optional) Whether the node's child tree is opened.<param> 
	if (opened === undefined) {
		return true;
	}

	return this;
}