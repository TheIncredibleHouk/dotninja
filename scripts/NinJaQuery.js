///<reference path="~/scripts/NinJa.js" />

var NinJaQuery = { Version: "1.0" };
Type.QueryClause = Type.$++;
Type.Group = Type.$++;

var SortOrder = {};

SortOrder.Ascending = 0;
SortOrder.Descending = 1;

Anchor.prototype.Query =
Body.prototype.Query =
Cell.prototype.Query =
Content.prototype.Query =
ContentButton.prototype.Query =
Div.prototype.Query =
Header.prototype.Query =
Label.prototype.Query =
List.prototype.Query =
ListItem.prototype.Query =
Row.prototype.Query =
Span.prototype.Query =
Table.prototype.Query =
TableBody.prototype.Query =
TableFoot.prototype.Query =
TableHead.prototype.Query =
TextBox.prototype.Query = function (q) {
	var a = Array.From(this.DOM.querySelectorAll(q)), l = a.length, i;
	for (i = 0; i < l; i++) {
		a[i] = a[i].$ || a[i];
	}

	return a;
};

Array.prototype.As = function (type) {
	var v = type.prototype, n;
	for (n in v) {
		this[n] = new CollectiveFunction(n);
	}

	return this;
};

function CollectiveFunction(p) {
	function f() {
		var v = [];
		var a = Array.From(arguments);
		var l = this.length;
		var w;
		for (var i = 0; i < l; i++) {
			w = this[i];
			v.Add(w[p].apply(w, a));
		}

		if (arguments.length == 1 || p == "Style") {
			return this;
		}

		return v;
	}

	return f;
}

function From(collection) {
	return new QueryClause(collection);
};

function QueryClause(collection) {
	this.WhereClause = null;

	if (collection.Type == Type.Array) {
		this.Array = collection;
	}
	else if (collection.Type == Type.Dictionary) {
		var a = [];
		this.Array = a;
		collection.ForEach(function (i) {
			a.Add(i);
		});
	}
	else {
		this.Array = Array.From(collection);
	}

	this.Type = Type.QueryClause;
};

QueryClause.prototype.Where = function (func) {
	this.WhereClause = func;
	return this;
};

QueryClause.prototype.Select = function (property) {
	return this._Select(property, 0);
};

QueryClause.prototype.SelectFirst = function (property, t) {
	return this._Select(property, t);
};

QueryClause.prototype._Select = function (property, t) {
	var a = [];

	if (this.Array.length == 0) {
		return a;
	}

	var c = this.Array;
	var l = c.length;
	var v, u;

	for (var i = 0; i < l; i++) {
		v = c[i];
		if (this.WhereClause) {
			if (!this.WhereClause(v)) {
				continue;
			}
		}
		if (property) {
			u = NinJa.EvalBind(property, v);
			a.push(NullOrUndefined(u) ? "" : u);
		}
		else {
			a.push(v);
		}

		if (t == 1 && a.length > 0) {
			return a[0];
		}
	}

	return a;
};

Array.prototype.Distinct = function (property) {
	var a = [], i, l, v;
	if (property == undefined) {
		l = this.length;
		for (i = 0; i < l; i++) {
			v = this[i];
			if (!a.Contains(v)) {
				a.push(v);
			}
		}
	}
	else {
		l = this.length;
		for (i = 0; i < l; i++) {
			v = NinJa.EvalBind(property, this[i]) || "";
			if (!a.Contains(v)) {
				a.push(v);
			}
		}
	}

	return a;
};

Array.prototype.Index = function () {
	var l = this.length, i, v;
	for (i = 0; i < l; i++) {
		v = this[i];
		v.$Index = Array.Index(v);
	}
	return this;
};

Array.Index = function (o) {
	var p, w, k = "";
	for (p in o) {
		if (o.hasOwnProperty(p)) {
			w = o[p];
			if (!NullOrUndefined(w)) {
				switch (typeof w) {
					case "boolean":
					case "number":
						k += w.toString().toLowerCase();
						break;

					case "string":
						k += w.toLowerCase();
						break;

					case "object":
						if (w.hasOwnProperty("getDate") || w.Type == Type.DateTime) {
							k += w.ToString();
						}
						else {
							k += Array.Index(w);
						}
						break;
				}
			}
		}
	}

	return k;
};

Array.prototype.Filter = function (s) {
	s = s.toLowerCase().Split(" ", true);
	if (s.length == 0) {
		return this;
	}

	var l = this.length, i, a = [], j, k = s.length, c, v;
	for (i = 0; i < l; i++) {
		v = this[i];
		c = true;

		for (j = 0; j < k; j++) {
			if (v.$Index) {
				if (!v.$Index.Contains(s[j])) {
					c = false;
					break;
				}
			}
		}

		if (c && !a.Contains(v)) {
			a.push(v);
		}
	}
	return a;
};

Array.prototype.FindNearest = function (v) {
	var l = this.length, a = this, i = 1, r = a[0], m = Math.abs(v - r), c;
	for (; i < l; i++) {
		c = Math.abs(v - a[i]);
		if (c < m) {
			m = c;
			r = a[i];
		}
	}

	return r;
};

Array.prototype.Sort = function (property, sortorder, ignoreCase) {
	if (this.length == 0) return this;
	sortorder = sortorder === undefined ? SortOrder.Ascending : sortorder;
	if (property !== undefined) {
		this.sort(function (a, b) {
			var v1 = NinJa.EvalBind(property, a);
			var v2 = NinJa.EvalBind(property, b);
			if (v1.Type == Type.String && v2.Type == Type.String && ignoreCase) {
				v1 = v1.toLowerCase();
				v2 = v2.toLowerCase();
			}
			if ((v1 === null || v1 === undefined) || (v2 === null || v2 === undefined)) {
				if ((v1 === null || v1 === undefined) && (v2 !== null && v2 !== undefined)) {
					return sortorder == SortOrder.Descending ? -1 : 1;
				}

				else if ((v1 !== null || v1 !== undefined) && !(v2 === null || v2 === undefined)) {
					return sortorder == SortOrder.Descending ? 1 : -1;
				}

				return 0;
			}

			return sortorder == SortOrder.Descending ? v1.Compare(v2) * -1 : v1.Compare(v2);
		});
	}
	else {
		this.sort(function (a, b) {
			var v1 = a;
			var v2 = b;

			if (v1.Type == Type.String && v2.Type == Type.String && ignoreCase) {
				v1 = v1.toLowerCase();
				v2 = v2.toLowerCase();
			}

			if ((v1 === null || v1 === undefined) || (v2 === null || v2 === undefined)) {
				if ((v1 === null || v1 === undefined) && (v2 !== null && v2 !== undefined)) {
					return sortorder == SortOrder.Descending ? -1 : 1;
				}

				else if ((v1 !== null || v1 !== undefined) && !(v2 === null || v2 === undefined)) {
					return sortorder == SortOrder.Descending ? 1 : -1;
				}

				return 0;
			}

			return sortorder == SortOrder.Descending ? v1.Compare(v2) * -1 : v1.Compare(v2);
		});
	}

	return this;
};

//Array.prototype.Randomize = function () {
//    var a = this.Copy(), l = this.length, i = 0;
//    this.Clear();
//    for (; i < l; i++) {
//        this.Add(a[Math.random(
//    }
//};

Array.prototype.Flatten = function () {
	var a = [];
	var v, k;
	var l = this.length;
	for (var i = 0; i < l; i++) {
		v = this[i];
		k = v.length;
		for (var j = 0; j < k; j++) {
			a.push(v[j]);
		}
	}

	return a;
};

Array.prototype.Sum = function () {
	var i, r = 0, isString = false, l = this.length, v;
	for (i = 0; i < l; i++) {
		v = this[i];
		if (v.Type === Type.String) {
			if (!v.IsFloat()) {
				isString = true;
				break;
			}

			v = v.ToFloat();
		}

		r += v;
	}

	if (isString) {
		r = "";
		for (i = 0; i < l; i++) {
			r += this[i];
		}
	}

	return r;
};

Array.prototype.Intersect = function (a) {
	var b = [], l = a.length, i;
	for (i = 0; i < l; i++) {
		if (this.Contains(a[i])) {
			b.push(a[i]);
		}
	}

	return b;
};

Array.prototype.Set = function (property, value) {
	var l = this.length;
	var v, w;
	for (var i = 0; i < l; i++) {
		v = this[i];
		w = v[property];
		if (w.Type == Type.Function) {
			v[property](value);
		} else {
			v[property] = value;
		}
	}

	return this;
};

Array.prototype.Maximum = function () {
	return Math.max.apply(this);
};

Array.prototype.Minimum = function () {
	return Math.min.apply(this);
};

Array.prototype.Group = function (property) {
	var a = new Dictionary();
	var l = this.length;
	var v, w, i;
	for (i = 0; i < l; i++) {
		v = this[i];
		w = NinJa.EvalBind(property, v);
		if (a[w] === undefined) {
			a[w] = [];
		}

		a[w].Add(v);
	}
	;

	return a;
};

Array.prototype.Subset = function (s, e) {

	var a = [], b, i;
	if (s < 0) { return a; }
	e = NullOrUndefined(e) ? this.length : e;
	if (e > this.length) {
		e = this.length;
	}

	if (s > e) {
		b = e;
		e = s;
		s = b;
	}
	for (i = s; i < e; i++) {
		a.Add(this[i]);
	}

	return a;
};

Array.prototype.Take = function (t) {
	return this.Subset(0, t);
};