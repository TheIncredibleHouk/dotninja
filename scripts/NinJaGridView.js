///<reference path="~/scripts/NinJa.js" />
///<reference path="~/scripts/NinJaQuery.js" />
///<reference path="~/scripts/NinJaUI.js" />
///<reference path="~/scripts/NinJaUI.js" />

// Version 1.0
// TODO: Add multiple selecting via keyboard and mouse commands
// TODO: Add adding, removing and reordering columns dynamically

Type.GridView = Type.$++;
Type.GridView = Type.$++;
Type.GridViewColumn = Type.$++;
Type.GridViewRow = Type.$++;
Type.GridViewGroupRow = Type.$++;
Type.DynamicSize = Type.$++;

GridView.AscSortIcon = "▲";
GridView.DescSortIcon = "▼";
GridView.DefaultRowHeight = "";

NinJa.Extensions.Add("gridview", GridView);

var $GridView = $Anchor;
var $RowBoundEventArgs = $ColumnBoundEventArgs = $Array;

function GridView(e) {
	if (this.DOM === undefined) {
		return GridView.Inherit(GridView.Extend(new Table(e).ClassName("gridview")));
	}

	var $ = this;
	e = $.DOM;
	$.__dp = (e.getAttribute("display") || "10").ToInt();
	$.Columns = new ObservableArray($);
	$.Columns.$$ = true;

	var c, v, i, l, g, d;
	c = $.Head.Rows[0].Cells;
	g = e.getElementsByTagName("col");
	var di = {};
	l = g.length;
	for (i = 0; i < l; i++) {
		di[(g[i].getAttribute("index") || i).toString()] = g[i];
	}

	l = c.length;
	for (i = 0; i < l; i++) {
		v = c[i];
		$.Columns.Add(GridViewColumn.Inherit(GridViewColumn.Extend(v), di[i.toString()], $));
		v.Parent = this;
	}

	$.Columns.OnChange.Add(new Delegate($.ColumnsUpdate, $, [Delegate.Event]));
	$.__Selectable = (e.getAttribute("selectable") || "false").ToBoolean();
	$.__Focus = new Anchor().Style("position", "fixed").X(-100).Y(10).Text("rawr").Href("javascript: Null()");
	$.__Multiple = (e.getAttribute("multiple") || "false").ToBoolean();
	$.__MultiMode = (e.getAttribute("multimode") || "toggle");
	$.__Sortable = (e.getAttribute("sortable") || "true").ToBoolean();
	$.__SelectClass = (e.getAttribute("selectclass") || "selected");
	$.__SortClass = (e.getAttribute("sortclass") || "sorted");
	$.__ASortClass = (e.getAttribute("ascsortclass") || "");
	$.__DSortClass = (e.getAttribute("descsortclass") || "");
	$.__RowHeight = (e.getAttribute("rowheight") || GridView.DefaultRowHeight);
	$.__Loading = false;

	Page.AddElement($.__Focus);

	$.__LastIndex = -1;
	$.__LastClick = -1;
	$.__FirstRow = -1;
	$.__LastRow = -1;

	e.setAttribute("refreshrequired", "1");
	//$.OnClick.Add(new Delegate($.__Focus.Focus, $.__Focus));
	$.Style(Style.TableLayout, "fixed").NaturalDisplay = "inline-block";
	$.Data = new ObservableArray($);
	$.SelectedData = new ObservableArray($);
	$.Container = new Div().Width($.AttributeWidth()).ClassName("gridviewcontainer");
	$.Container.Style(Style.WhiteSpace, "nowrap");
	e.parentNode.replaceChild($.Container.DOM, e);
	$.ScrollBar = new ScrollBar();
	$.ScrollBar.Style(Style.Float, "right");
	$.Holder = new Div().Style(Style.Display, "inline-block");
	$.Holder.AddElement($);
	$.Container.AddElements([$.ScrollBar, $]);
	$.Style(Style.BorderCollapse, "separate");
	$.AscSortIcon = GridView.AscSortIcon;
	$.DescSortIcon = GridView.DescSortIcon;
	$.SortIcon = new Span().Style(Style.Float, "right");
	$.OnSelectionChanged = $.SelectedData.OnChange;
	$.OnRowBound = new Event($);
	$.MessageRow = new Row();
	$.MessageRow.Cells.Add(new Cell());
	$.__Focus.OnKeyDown.Add(new Delegate($.HandleKey, $, [Delegate.Event]));
	$.ScrollBar.OnScrollChange.Add(new Delegate($.Refresh, $));
	$.OnMouseWheel.Add(new Delegate($.HandleScroll, $, [Delegate.Event]));
	$.__M = false;
	if (Client.Browser.Type === BrowserType.iPad || Client.Browser.Type === BrowserType.Android) {
		$.Body.OnTouchStart.Add(new Delegate($._mobCapture, $, [Delegate.Event]));
		$.Body.OnTouchEnd.Add(new Delegate($._mobRelease, $));
		$.Body.OnTouchMove.Add(new Delegate($._mobSwipe, $, [Delegate.Event]));
		$.__M = true;
	}

	v = $.Container.Style(Style.Width);
	if (v.Type === Type.String) {
		if (v.Contains("%")) {
			Client.OnResize.Add(new Delegate($.RefreshDisplay, $));
		}
	}

	$.CurrentMenu = null;
	$.MenuCell = null;
	$.RefreshRows();
	$.Data.OnChange.Add(new Delegate($.RefreshData, $));
	$.RefreshData();
	$.SelectedData.OnChange.Add(new Delegate($.Refresh, $));
	Page.OnClick.Add(new Delegate(this.HideCurrentMenu, this));

	if ($.__Selectable) {
		if ($.Container.onselectstart !== undefined) {
			$.Container.onselectstart = function () { return false; };
		}
		else {
			$.Container.OnMouseDown.Add(function (b) { b.Handled = true; b.CancelEvent = true; });
		}
	}

	if ($.__Sortable) {
		$.__Order = SortOrder.Ascending;
		c = $.Columns, l = c.length;
		d = new Delegate($.Sort, $, [Delegate.Event]);
		for (i = 0; i < l; i++) {
			if (c[i].__Sort) {
				c[i].OnClick.Add(d);
			}
		}
	}

	$.__Sort = null;
	$.Type = Type.GridView;

	if (Client.Storage.Local) {
		i = Client.Storage.Local.GetItem(Page.Href().pathname + ":" + this.DOM.id);
		if (i) {
			this.Sort(i.s, i.o);
		}
	}

	return e;
}

GridView.prototype._mobCapture = function (e) {
	this.__swipe = true;
	this.__yRef = e.TouchStates[0].Y;
	this.__sRef = this.ScrollBar.Value();
};

GridView.prototype._mobSwipe = function (e) {
	if (e.TouchStates.length > 1) { return; }
	e.Handled = true;
	if (this.__swipe === true) {
		this.ScrollBar.Value(this.__sRef + parseInt(((this.__yRef - e.TouchStates[0].Y) / this.__RowHeight), 10));
	}
};

GridView.prototype._mobRelease = function () {
	this.__swipe = false;
};

GridView.prototype.ColumnsUpdate = function (e) {
	var i, a = e.Objects, l = a.length;
	switch (e.ModificationType) {
		case ModificationType.Add:
			for (i = 0; i < l; i++) {
				this.Head.Rows[0].Cells.Insert(e.Index + i, a[i]);
			}
			break;

		case ModificationType.Remove:
		case ModificationType.Clear:
			for (i = 0; i < l; i++) {
				this.Head.Rows[0].Cells.Remove(a[i]);
			}
			break;
	}
	this.RefreshRows();
	this.RefreshData();
};

GridView.prototype.Sort = function (e, o) {
	var s, p, q = this.SortIcon.DOM.parentNode;

	if (e === undefined) {
		this.Data.Sort(this.__Sort, this.__Order, true);
		return this;
	}

	if (q !== null && q.$ !== undefined) {
		this.SortIcon.Parent().ClassName("");
	}

	if (e.Sender) {
		s = e.Sender, p = s.__Data;
		if (s.__sb.length > 0) {
			p = s.__sb;
		}
	}
	else {
		p = e;
	}



	if (!p) {
		this.__Order = SortOrder.Ascending;
		this.__Sort = null;
		if (q !== null && q.$ !== undefined) {
			q.$.RemoveElement(this.SortIcon).ClassName("");
		}
		return this;
	}

	if (p === this.__Sort) {
		this.__Order = this.__Order === SortOrder.Ascending ? SortOrder.Descending : SortOrder.Ascending;
	}
	else {
		this.__Order = o || SortOrder.Ascending;
		if (s !== undefined) {
			s.InsertElement(0, this.SortIcon);
		}
		else {
			var a = this.Columns, l = a.length, v, i;
			for (i = 0; i < l; i++) {
				v = a[i];
				if (v.__sb === p) {
					v.InsertElement(0, this.SortIcon);
					break;
				}
			}
		}
	}
	if (this.SortIcon.Parent() !== null) {
		this.SortIcon.Parent().ClassName(this.__SortClass);
	}
	this.SortIcon.Text(this.__Order === SortOrder.Ascending ? this.AscSortIcon : this.DescSortIcon);
	this.__Sort = p;
	this.Data.Sort(p, this.__Order, true);
	this.Refresh();
	if (Client.Storage.Local) {
		Client.Storage.Local.SetItem(Page.Href().pathname + ":" + this.DOM.id, { s: this.__Sort, o: this.__Order });
	}
	return this;
};

GridView.prototype.Bind = function (data) {
	var v = this.ScrollBar.Value();

	this.Data.BeginUpdate();
	this.Data.Clear();
	if (data) {
		this.Data.AddRange(data);
	}
	if (this.Data.length === 0) {
		this.MessageRow.Cells[0].Text("No items");
	}
	this.__LastIndex = -1;
	this.__LastRow = null;
	this.Data.EndUpdate();
	this.__Loading = true;
	this.ScrollBar.Value(v);
	this.SelectedData.Clear();
	this.__Loading = false;
	this.Refresh();
	this.RefreshDisplay();
};

GridView.prototype.Loading = function (txt) {
	this.Data.Clear();
	txt = txt || "Loading...";
	this.__Loading = true;
	this.MessageRow.Cells[0].Text(txt);
	return this;
};

GridView.prototype.Refresh = function () {
	this.HideCurrentMenu();
	if (this.__Loading) { return this; }
	var r = this.Rows, l = r.length, j = 0, v, u, i, c, s, q = this.ScrollBar.Value();
	this.__LastRow = -1;
	this.__FirstRow = -1;
	var o = document.createElement("TBODY");
	this.Body.DOM.parentNode.replaceChild(o, this.Body.DOM);
	for (i = 1, j = q; i < l; i++, j++) {
		v = this.Data[j];
		u = r[i];
		s = this.SelectedData.Contains(v);
		c = s ? this.__SelectClass : "";
		u.Bind(v).ClassName(c);
		if (this.OnRowBound.length > 0) {
			this.OnRowBound.Fire(new RowBoundEventArgs(this, u, v));
		}

		if (s) {
			if (this.__FirstRow === -1) {
				this.__FirstRow = i;
			}
			this.__LastRow = i;
		}
		u.Index = j;
	}

	if (this.Data.length > 0) {
		this.Rows[0].Collapsed(true);
		this.Rows[1].Collapsed(false);
	}
	else {
		this.Rows[0].Collapsed(false).Cells[0].Text("No items.").ColumnSpan(this.Columns.length);
		this.Rows[1].Collapsed(true);
	}

	o.parentNode.replaceChild(this.Body.DOM, o);
	return this;
};


GridView.prototype.RefreshData = function () {
	if (this.__Sort) {
		this.Sort();
	}
	var i, c = this.Columns, l = c.length, h = 0, i, j, d = this.Data, k = d.length;
	for (j = 0; j < k; j++) {
		d[j].__P = [];
		h = 0;
		for (i = 0; i < l; i++) {
			if (!c[i].Collapsed()) {
				d[j].__P[h++] = c[i].__Premutate(d[j]);

			}
		}
	}

	if (this.Data.length <= this.__dp) {
		this.ScrollBar.Collapsed(true);
		this.ScrollBar.MaxValue(0);
	}
	else {
		this.ScrollBar.Collapsed(false);
		this.ScrollBar.MaxValue(this.Data.length - this.__dp);
	}

	this.Refresh();
	this.RefreshDisplay();
};

GridView.prototype.ScrollToItem = function (item) {
	if (item) {
		var index = this.Data.IndexOf(item), a = this.ScrollBar.Value(), b = this.__dp, c = b + a;
		if (index >= a && index < c) {
			return;
		}
		else if (index >= c) {
			this.ScrollBar.Value(index - b + 1);
		}
		else if (index < a) {
			this.ScrollBar.Value(index);
		}
	}
};

GridView.prototype.RowHeight = function (v) {
	if (v === undefined) {
		return this.__RowHeight;
	}

	this.__RowHeight = v;
	this.RefreshRows();
	this.Refresh();
	return this;
};

GridView.prototype.DisplayRows = function (d) {
	if (d === undefined) {
		return this.__dp;
	}

	if (this.__dp !== d) {
		this.__dp = d;
		this.RefreshRows();
		this.RefreshData();
		this.ScrollBar.Collapsed(false);
		this.ScrollBar.Height(this.LayoutHeight()).__RefreshView();
		this.ScrollBar.MaxValue(this.Data.length - this.__dp);
		this.RefreshDisplay();
	}

	return this;
};

GridView.prototype.RefreshRows = function () {
	this.Rows.BeginUpdate();
	this.Rows.Clear();
	var i, r = [], v, l = this.__dp;
	var d = new Delegate(this.HandleClick, this, [Delegate.Event]);
	r.Add(this.MessageRow.Collapsed(true));
	this.MessageRow.Cells[0].AttributeHeight(this.__RowHeight);
	for (i = 0; i < l; i++) {
		v = new GridViewRow();
		v.Parent = this;
		v.__M = this.__M;
		v.RefreshColumns(this.Columns, this);
		v.Bind(null);
		if (this.__Selectable) {
			v.OnClick.Add(d);
			v.OnContextMenu.Add(d);
		}
		if (this.__RowHeight) {
			v.Cells[0].AttributeHeight(this.__RowHeight);
		}
		r.Add(v);
	}
	this.Rows.AddRange(r);
	this.Rows.EndUpdate();
	return this;
};

GridView.prototype.HandleClick = function (e) {
	var t = e.Sender.Tag, c, i = this.Data.IndexOf(t);
	c = i;
	if (!NullOrUndefined(t)) {
		this.SelectedData.BeginUpdate();
		if (this.__Multiple) {
			if (this.__MultiMode == "toggle") {
				if (Keyboard.ShiftKey) {
					this.SelectedData.Clear().AddRange(this.Data.Subset(this.__LastIndex, i));
					i = this.__LastIndex;
				}
				else {
					if (this.SelectedData.Contains(t)) {
						this.SelectedData.Remove(t);
					}
					else {
						this.SelectedData.Add(t);
					}
				}
			}
		}
		else {
			if (!this.SelectedData.Contains(t)) {
				this.SelectedData.Clear();
				this.SelectedData.Add(t);
			}
		}

		this.__LastIndex = i;
		this.__LastClick = c;
		this.SelectedData.EndUpdate();
	}
};

GridView.prototype.HandleScroll = function (e) {
	if (this.ScrollBar.Collapsed()) { return; }
	this.ScrollBar.Value(this.ScrollBar.Value() + e.Clicks);
	e.Handled = true;
};

GridView.prototype.HandleKey = function (e) {
	var i = this.__LastIndex, d = this.Data, sd = this.SelectedData, u = false;
	if (d.length === 0) { return; }

	e.Handled = true;
	switch (e.Key) {
		case Keys.A:
			if (Keyboard.ControlKey) {
				sd.BeginUpdate();
				if (sd.length !== d.length) {
					sd.Clear().AddRange(d);
				}
				else {
					sd.Clear();
				}
				sd.EndUpdate();
			}
			break;

		case Keys.DownArrow:

			i++;
			if (i >= d.length) {
				i = d.length - 1;
			}

			if (this.__LastIndex !== i) {
				u = true;
				if (this.__LastRow === this.__dp) {
					this.ScrollBar.Value(this.ScrollBar.Value() + 1);

				}
			}

			break;

		case Keys.UpArrow:
			u = true;
			i--;
			if (i < 0) {
				i = 0;
			}

			if (this.__LastIndex !== i) {
				u = true;
				if (this.__FirstRow === 1) {
					this.ScrollBar.Value(this.ScrollBar.Value() - 1);
				}
			}

			break;

		case Keys.Home:

			i = 0;
			this.ScrollBar.Value(0);
			u = true;
			break;


		case Keys.End:
			u = true;
			i = d.length - 1;
			this.ScrollBar.Value(i);
			break;

		case Keys.PageUp:
			u = true;
			i = i - 10;
			if (i < 0) {
				i = 0;
			}

			this.ScrollBar.Value(this.ScrollBar.Value() - this.__dp);
			break;

		case Keys.PageDown:
			u = true;

			i = i + 10;
			if (i >= d.length) {
				i = d.length - 1;
			}

			this.ScrollBar.Value(this.ScrollBar.Value() + this.__dp);
			break;
	}

	if (u === true) {
		sd.BeginUpdate();
		if (Keyboard.ShiftKey) {
			sd.Clear().AddRange(d.Subset(this.__LastClick, i));
		}
		else {
			sd.Clear();
			sd.Add(d[i]);
			this.__LastClick = i;
		}
		sd.EndUpdate();
	}

	this.__LastIndex = i;
};

GridView.prototype.RefreshDisplay = function () {
	if (!this.Displayed()) { return this; }

	this.ScrollBar.Height(this.LayoutHeight()).__RefreshView();
	var a = this.Columns, l = a.length, v, w, u, i, o;

	o = document.createElement("THEAD");
	this.AttributeWidth(0);
	var total, fullTotal = this.Container.Width() - this.ScrollBar.LayoutWidth() - 1;
	total = fullTotal;
	this.AttributeWidth(total);
	this.Head.DOM.parentNode.replaceChild(o, this.Head.DOM);
	var lq = [];
	for (i = 0; i < l; i++) {
		w = this.Columns[i];
		if (w.Collapsed()) {
			continue;
		}

		v = w.__Width;
		switch (v.DynamicSizeType) {
			case DynamicSizeType.Static:
				w.Width(v.Value);
				total -= v.Value;
				break;

			case DynamicSizeType.Relative:
				u = total * v.Value;
				w.Width(u);
				total -= u;
				break;

			case DynamicSizeType.Liquid:
				lq.Add(w);
				break;
		}
	}

	l = lq.length;
	u = (total / lq.length).Round();
	for (i = 0; i < l; i++) {
		lq[i].Width(u);
		total -= u;
	}

	if (total < 0) {
		lq[i - 1].Width(u + total);
	}

	o.parentNode.replaceChild(this.Head.DOM, o);
	return this;
};

function GridViewColumn(c, p) {
	if (this.DOM === undefined) {
		return GridViewColumn.Inherit(GridViewColumn.Extend(new Header().Attribute("type", "check")));
	}

	var $ = this, v, e = $.DOM;
	$.Style(Style.Overflow, "hidden").Style(Style.WhiteSpace, "nowrap").Style("position", "relative");


	if (c) {
		$.__HAlign = c.getAttribute("align") || "left";
		$.__VAlign = c.getAttribute("valign") || "top";
		$.__Style = c.getAttribute("style") || "";
		$.__cs = c.getAttribute("class") || "";
	}
	else {
		$.__HAlign = "left";
		$.__VAlign = "top";
		$.__Style = "";
		$.__cs = "";
	}

	$.__Target = e.getAttribute("target") || "";
	$.__Type = e.getAttribute("type") || "text";
	$.__HTML = (e.getAttribute("html") || "true").ToBoolean();
	$.__Sort = (e.getAttribute("sortable") || "true").ToBoolean();
	$.__Width = new DynamicSize(e.getAttribute("width") || "*");
	$.__dp = e.getAttribute("display") || "";
	$.__Data = e.getAttribute("data") || "";
	$.__sb = e.getAttribute("sortby") || $.__Data;
	$.OnItemClick = new Event().AddRange($.OnClick);
	$.OnClick.Clear();

	if ($.__Type == GridViewColumnType.Select) {
		v = new CheckBox();
		v.OnClick.Add(new Delegate($.SelectAllClicked, $));
		$.AddElement(v);
		$.__C = v;
	}

	if ($.__Type == GridViewColumnType.Menu) {
		$Div($.__Target).Style("position", "absolute").X(0).Y(0).Collapsed(true);
	}

	if ($.__Type == GridViewColumnType.PopUp) {
		$.__Ex = ($.DOM.getAttribute("extra") || "500,500").Split(",");
	}

	if (!$.__dp && $.__Data.length > 0) {
		$.__dp = "{" + $.__Data + "}";
	}

	$.OnColumnBound = new Event($);
	var o = e.getAttribute("onbound");
	if (o) {
		$.OnColumnBound.Add(window[o]);
	}

	$.Type = Type.GridViewColumn;
}

GridViewColumn.prototype.SelectAllClicked = function () {
	if (this.__C.Checked()) {
		this.Parent.SelectedData.BeginUpdate().Clear().AddRange(this.Parent.Data).EndUpdate();
	}
	else {
		this.Parent.SelectedData.Clear();
	}

};

GridViewColumn.prototype.__Premutate = function (d) {
	switch (this.__Type) {
		case GridViewColumnType.Link:
		case GridViewColumnType.PopUp:
			return { __T: String.BindFormat(this.__dp, d), __D: String.BindFormat(this.__Data, d) };

		case GridViewColumnType.Function:
			return { __T: String.BindFormat(this.__dp, d) };

		case GridViewColumnType.Custom:
			return { __T: window[this.__dp](d), __D: window[this.__Data](d) };

		default:
			return { __T: String.BindFormat(this.__dp, d), __D: NinJa.EvalBind(this.__Data, d) || "" };
	}
};


function GridViewRow() {
	return GridViewRow.Extend(new Row());
}

GridViewRow.prototype.ToggleItemSelect = function () {
	this.Parent.SelectedData.BeginUpdate();
	if (this.__C.Checked()) {
		if (this.Parent.__Multiple !== true) {
			this.Parent.SelectedData.Clear();
		}

		this.Parent.SelectedData.Add(this.Tag);
	}
	else {
		this.Parent.SelectedData.Remove(this.Tag);
	}

	this.Parent.SelectedData.EndUpdate();
};

GridViewRow.prototype.Bind = function (d) {
	this.Tag = d;
	this.Index = 0;
	var a = this.Cells, l = a.length, i, v, w, u, t, ev = new ColumnBoundEventArgs();
	for (i = 0; i < l; i++) {
		v = a[i];
		w = v.__Col;
		ev.Cancel = false;
		if (d !== undefined && w.OnColumnBound.length > 0) {
			ev.Column = w;
			ev.Item = d;
			ev.Sender = v;
			w.OnColumnBound.Fire(ev);
		}
		if (!d || ev.Cancel) {
			switch (w.__Type) {
				case GridViewColumnType.Select:
					v.__C.Collapsed(true);
					break;

				case GridViewColumnType.Custom:
				case GridViewColumnType.Text:
					v.Content("&nbsp;");
					break;

				case GridViewColumnType.PopUp:
				case GridViewColumnType.Function:
				case GridViewColumnType.Link:
				case GridViewColumnType.Menu:
					v.__A.Collapsed(true);
					break;

				case GridViewColumnType.Image:
					v.__I.Collapsed(true);
					break;
			}
		}
		else {
			t = d.__P[i].__T;
			u = d.__P[i].__D;
			switch (w.__Type) {
				case GridViewColumnType.Select:
					v.__C.OnCheckChanged.Enabled(false);
					v.__C.Collapsed(false).Checked(this.Parent.SelectedData.Contains(this.Tag));
					v.__C.OnCheckChanged.Enabled(true);
					break;

				case GridViewColumnType.Custom:
				case GridViewColumnType.Text:
					if (NullOrUndefined(t)) {
						v.Text("  ");
					}
					else {
						if (w.__HTML) {
							v.Content(t);
						}
						else {
							v.Text(t);
						}
					}
					break;

				case GridViewColumnType.Function:
					v.__A.Collapsed(false);
					v.__D.Parameters[0] = d;
					v.__D.Parameters[1] = this;
					v.__D.Parameters[2] = v;

					if (w.__HTML) {
						v.__A.Content(t);
					}
					else {
						v.__A.Text(t);
					}
					break;

				case GridViewColumnType.PopUp:
					if (this.__M) {
						v.__A.Collapsed(false).Href(u);
					}
					else {
						v.__A.Collapsed(false).OnClick[0].Parameters[0] = u;
					}

					if (w.__HTML) {
						v.__A.Content(t);
					}
					else {
						v.__A.Text(t);
					}
					break;

				case GridViewColumnType.Link:
					v.__A.Href(u).Collapsed(false).Target(w.__Target);
					if (w.__HTML) {
						v.__A.Content(t);
					}
					else {
						v.__A.Text(t);
					}
					break;

				case GridViewColumnType.Menu:
					v.__A.Collapsed(false);
					v.__D.Parameters[0] = u;
					v.__D.Parameters[1] = v;

					if (w.__HTML) {
						v.__A.Content(t);
					}
					else {
						v.__A.Text(t);
					}
					break;

				case GridViewColumnType.Image:
					if (!t) {
						v.__I.Collapsed(true);
					}
					else {
						v.__I.Source(t).Collapsed(false);
					}
					break;
			}
		}
	}
	return this;
};

GridViewRow.prototype.HandleColumnClick = function (c) {
	c.OnItemClick.Fire(new EventArgs(this, this.Tag));
};

GridView.prototype.HideCurrentMenu = function () {
	if (this.MenuCell != null) {
		this.MenuCell.Classes.Remove("active");
		if (this.CurrentMenu != null) {
			this.CurrentMenu.Collapsed(true);
		}

		this.MenuCell = this.CurrentMenu = null;
	}
}

GridView.prototype.HandleMenu = function (o, c, m) {
	var e = Event.Current;
	this.HideCurrentMenu();
	var t = $Template(m).Bind(o).Collapsed(false);
	var s = c.Y() > (Client.Height() + Client.VerticalScrollPosition()) / 2 ? Side.Top : Side.Bottom;
	var a = c.X() > (Client.Width() + Client.HorizontalScrollPosition()) / 2 ? Alignment.Right : Alignment.Left;
	t.SnapTo(c, s, a, Aspect.Outside, 0, 0);

	this.CurrentMenu = t;
	this.MenuCell = c;
	c.Classes.Add("active");
	e.CancelEvent = e.Handled = true;
};

GridViewRow.prototype.RefreshColumns = function (columns, p) {
	this.Cells.BeginUpdate();
	this.Cells.Clear();
	var a = columns;
	var l = a.length;
	var i, v, c = [], b, x;

	for (i = 0; i < l; i++) {
		v = a[i];
		if (v.Collapsed()) { continue; }
		b = new Cell()
               .ClassName(v.__cs)
               .HorizontalAlignment(v.__HAlign)
               .VerticalAlignment(v.__VAlign);
		b.OnClick.Add(new Delegate(this.HandleColumnClick, this, [v]));
		b.DOM.setAttribute("style", v.__Style);
		b.Style(Style.Overflow, "hidden").Style(Style.WhiteSpace, "nowrap");
		b.__Col = v;
		switch (v.__Type) {
			case GridViewColumnType.Select:
				x = new CheckBox();
				x.OnCheckChanged.Add(new Delegate(this.ToggleItemSelect, this));
				b.AddElement(x);
				b.__C = this.__C = x;
				break;

			case GridViewColumnType.Function:
				x = new Anchor();
				b.__A = x;
				b.AddElement(x);
				b.__D = new Delegate(window[v.__Data]);
				x.OnClick.Add(b.__D);
				break;

			case GridViewColumnType.Menu:
				x = new Anchor();
				b.__A = x;
				b.AddElement(x);
				b.__D = new Delegate(p.HandleMenu, p, [null, null, v.__Target]);
				x.OnClick.Add(b.__D);
				break;

			case GridViewColumnType.PopUp:
				x = new Anchor();
				b.__A = x;
				b.AddElement(x);
				if (this.__M === true) {
					x.Target("__blank");
				}
				else {
					x.OnClick.Add(new Delegate(SafePopUp, null, ["", v.__Ex[0], v.__Ex[1]]));
				}

				break;
			case GridViewColumnType.Link:
				x = new Anchor();
				b.__A = x;
				b.AddElement(x);
				break;

			case GridViewColumnType.Image:
				x = new ImageElement();
				b.__I = x;
				b.AddElement(x);
				break;
		}
		c.Add(b);
	}

	this.Cells.AddRange(c);
	this.Cells.EndUpdate();
};

var GridViewColumnType = {
	Select: "select",
	Text: "text",
	Image: "image",
	Link: "link",
	PopUp: "popup",
	Function: "function",
	Menu: "menu",
	Custom: "custom"
};

function RowBoundEventArgs(sender, row, item) {
	this.Sender = sender;
	this.Row = row;
	this.Item = item;
	this.Cancel = false;
}

function ColumnBoundEventArgs(sender, col, item) {
	this.Sender = sender;
	this.Column = col;
	this.Item = item;
	this.Cancel = false;
}