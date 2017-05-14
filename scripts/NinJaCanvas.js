///<reference path="~/scripts/NinJa.js" />

NinJa.Mapper.Add("CANVAS", Canvas);

$Canvas = $Anchor;
Type.Canvas = "Canvas";
Type.Brush = "Brush";


function Canvas(e) {
	if (e === undefined || e.Type == Type.String) {
		return Canvas.New(NinJa.CreateElement("canvas", e));
	}

	var $ = this;
	$.DOM = e;
	e.$ = $;

	Element.Extend($);
	Element.Inherit($, e);


	var ctx = $.Context = e.getContext('2d');
	$.PixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
	$.Type = Type.Canvas;
	$.PixelTransate = 0.5;
	$.__Buffer = false;
}

Canvas.Extensions = [];

Canvas.prototype.Buffered = function (b) {
	if (b === undefined) {
		return this.__Buffer;
	}

	this.__Buffer = b;
	if (this.__Buffer) {
		this.__BufferContext = new Canvas().CanvasWidth(this.CanvasWidth()).CanvasHeight(this.CanvasHeight()).Context;
	}

	return this;
};

Canvas.prototype.BeginDraw = function () {

	if (this.__Buffer === false) {
		throw ("Unable to start buffered drawing - enable buffering using the Buffered(true) function.");
	}
	this.__Context = this.Context;
	this.Context = this.__BufferContext;
};

Canvas.prototype.EndDraw = function () {

	if (this.__Buffer === false) {
		throw ("Unable to end buffered drawing - enable buffering using the Buffered(true) function.");
	}
	this.Context = this.__Context;
	this.Context.putImageData(this.__BufferContext.getImageData(0, 0, this.DOM.width, this.DOM.height), 0, 0, 0, 0, this.DOM.width, this.DOM.height);

};

Canvas.prototype.CanvasWidth = function (w) {
	if (w === undefined) {
		return this.DOM.width;
	}
	this.DOM.width = (w * this.PixelRatio);

	return this;
};

Canvas.prototype.CanvasHeight = function (h) {
	if (h === undefined) {
		return this.DOM.height;
	}

	this.DOM.height = (h * this.PixelRatio);

	return this;
};

Canvas.prototype.Fill = function (brush) {
	this.Context.fillStyle = brush.Normalize(this.Context);
	this.Context.fillRect(0, 0, this.Width(), this.Height());
	return this;
}

Canvas.prototype.FillCircle = function (brush, x, y, radius) {
	this.Context.fillStyle = brush.Normalize(this.Context);
	this.Context.beginPath();
	this.Context.arc(x + this.PixelTransate, y + this.PixelTransate, radius, 0, Math.PI * 2, true);
	this.Context.closePath();
	this.Context.fill();
	return this;
};

Canvas.prototype.FillRectangle = function (brush, rectangle) {
	this.Context.fillStyle = brush.Normalize(this.Context);
	this.Context.fillRect(rectangle.X + this.PixelTransate, rectangle.Y + this.PixelTransate, rectangle.Width, rectangle.Height);
	return this;
}

Canvas.prototype.DrawLine = function (pen, point1, point2) {
	this.Context.strokeStyle = pen.Color.Normalize();
	this.Context.lineWidth = pen.Thickness;

	this.Context.beginPath();
	this.Context.moveTo(point1.X + this.PixelTransate, point1.Y + this.PixelTransate);
	this.Context.lineTo(point2.X + this.PixelTransate, point2.Y + this.PixelTransate);
	this.Context.stroke();
	return this;
}

Canvas.prototype.DrawRectangle = function (pen, rectangle) {
	this.Context.strokeStyle = pen.Color.Normalize();
	this.Context.lineWidth = pen.Thickness;
	this.Context.strokeRect(rectangle.X + this.PixelTransate, rectangle.Y + this.PixelTransate, rectangle.Width, rectangle.Height);
	return this;
}

Canvas.prototype.DrawImage = function (image, x, y) {
	this.Context.drawImage(image, x + this.PixelTransate, y + this.PixelTransate);
	return this;
}

Canvas.prototype.DrawImageScale = function (image, x, y, scale) {
	this.Context.drawImage(image, x + this.PixelTransate, y + this.PixelTransate, image.Width() / scale, image.Height() / scale);
	return this;
}

Canvas.prototype.DrawImageStretch = function (image, sourceReg, destReg) {
	this.Context.drawImage(image, sourceReg.X + this.PixelTransate, sourceReg.Y + this.PixelTransate, sourceReg.Width, sourceReg.Height, destReg.X + this.PixelTransate, destReg.Y + this.PixelTransate, destReg.Width, destReg.Height);
	return this;
}

Canvas.prototype.FillImage = function (image) {
	this.Context.drawImage(image, 0 + this.PixelTransate, 0 + this.PixelTransate, image.Width(), image.Height(), 0 + this.PixelTransate, 0 + this.PixelTransate, this.Width(), this.Height());
	return this;
}

Canvas.prototype.DrawPolygon = function (pen, points, origX, origY) {
	origX = origX || 0;
	origY = origY || 0;
	var c = this.Context;
	c.strokeStyle = pen.Color.Normalize();
	c.beginPath();
	c.translate(origX, origY);
	var a = points, l = a.length, i;
	c.moveTo(a[0].X, a[0].Y);
	for (i = 1; i < l; i++) {
		c.lineTo(a[i].X, a[i].Y);
	}
	c.closePath();
	c.stroke();
	return this;
};

Canvas.prototype.FillPolygon = function (brush, points, origX, origY) {
	origX = origX || 0;
	origY = origY || 0;
	var c = this.Context;
	c.fillStyle = brush.Normalize(this.Context);
	c.beginPath();
	c.translate(origX, origY);
	var a = points, l = a.length, i;
	c.moveTo(a[0].X, a[0].Y);
	for (i = 1; i < l; i++) {
		c.lineTo(a[i].X, a[i].Y);
	}
	c.closePath();
	c.fill();
	return this;
};

function Polygon() {
	this.Points = [];
}

function Rectangle(x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}

Color.prototype.Normalize = function (context) {
	if (this.Alpha > 0) {
		return "rgba(" + this.Red + ", " + this.Green + ", " + this.Blue + ", " + this.Alpha + ")";
	}

	return "rgb(" + this.Red + ", " + this.Green + ", " + this.Blue + ")";
};



function SolidBrush(color) {
	this.Color = color.Type == Type.String ? new Color(color) : color;
}

SolidBrush.prototype.Normalize = function () {
	return this.Color.Normalize();
}

SolidBrush.FromRGB = function (r, g, b) {
	return new SolidBrush(new Color(r, g, b));
};

SolidBrush.FromRGBA = function (r, g, b, a) {
	return new SolidBrush(new Color(r, g, b, a));
};

SolidBrush.FromPredefined = function (name) {
	return new SolidBrush(name);
}

var GradientType = {
	Linear: 0,
	Radial: 1
};

function LinearGradientBrush(startX, startY, endX, endY) {
	this.StartX = startX;
	this.StartY = startY;
	this.EndX = endX;
	this.EndY = endY;
	this.Stops = [];
	this.GradientType = GradientType.Linear;
}

LinearGradientBrush.prototype.Normalize = function (context) {
	var a;
	switch (this.GradientType) {
		case GradientType.Linear:
			a = context.createLinearGradient(this.StartX, this.StartY, this.EndX, this.EndY);
			break;
	}

	this.Stops.ForEach(function (i) {
		a.addColorStop(i.Offset, i.Color.Normalize());
	});

	return a;
}


function GradientStop(offset, color) {
	this.Offset = offset;
	this.Color = color.Is == Type.String ? new Color(color) : color;
}

function Pen(color, thickness) {
	this.Color = color;
	this.Thickness = thickness == undefined ? 1 : thickness;
}

Pen.FromRGB = function (r, g, b) {
	return new Pen(new Color(r, g, b));
};

Pen.FromRGBA = function (r, g, b, a) {
	return new Pen(new Color(r, g, b, a));
};

Pen.FromPredefined = function (name) {
	return new Pen(new Color(name));
}

function Rectangle(x, y, width, height) {
	///<summary>Creates a rectangle to be used for 
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
