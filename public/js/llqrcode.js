var _aa = {};
_aa._ab = function (f, e) {
    var d = qrcode.width;
    var b = qrcode.height;
    var c = true;
    for (var g = 0; g < e.length && c; g += 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw"Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
    c = true;
    for (var g = e.length - 2; g >= 0 && c; g -= 2) {
        var a = Math.floor(e[g]);
        var h = Math.floor(e[g + 1]);
        if (a < -1 || a > d || h < -1 || h > b) {
            throw"Error._ab "
        }
        c = false;
        if (a == -1) {
            e[g] = 0;
            c = true
        } else {
            if (a == d) {
                e[g] = d - 1;
                c = true
            }
        }
        if (h == -1) {
            e[g + 1] = 0;
            c = true
        } else {
            if (h == b) {
                e[g + 1] = b - 1;
                c = true
            }
        }
    }
};
_aa._af = function (b, d, a) {
    var k = new _ac(d);
    var j = new Array(d << 1);
    for (var f = 0; f < d; f++) {
        var g = j.length;
        var i = f + 0.5;
        for (var h = 0; h < g; h += 2) {
            j[h] = (h >> 1) + 0.5;
            j[h + 1] = i
        }
        a._ad(j);
        _aa._ab(b, j);
        try {
            for (var h = 0; h < g; h += 2) {
                var e = b[Math.floor(j[h]) + qrcode.width * Math.floor(j[h + 1])];
                if (e) {
                    k._dq(h >> 1, f)
                }
            }
        } catch (c) {
            throw"Error._ab"
        }
    }
    return k
};
_aa._ah = function (h, o, l, k, q, p, b, a, f, e, n, m, s, r, d, c, j, i) {
    var g = _ae._ag(l, k, q, p, b, a, f, e, n, m, s, r, d, c, j, i);
    return _aa._af(h, o, g)
};

function _a1(b, a) {
    this.count = b;
    this._fc = a;
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("_dm", function () {
        return this._fc
    })
}

function _a2(a, c, b) {
    this._bm = a;
    if (b) {
        this._do = new Array(c, b)
    } else {
        this._do = new Array(c)
    }
    this.__defineGetter__("_bo", function () {
        return this._bm
    });
    this.__defineGetter__("_dn", function () {
        return this._bm * this._fo
    });
    this.__defineGetter__("_fo", function () {
        var e = 0;
        for (var d = 0; d < this._do.length; d++) {
            e += this._do[d].length
        }
        return e
    });
    this._fb = function () {
        return this._do
    }
}

function _a3(k, l, h, g, f, e) {
    this._bs = k;
    this._ar = l;
    this._do = new Array(h, g, f, e);
    var j = 0;
    var b = h._bo;
    var a = h._fb();
    for (var d = 0; d < a.length; d++) {
        var c = a[d];
        j += c.Count * (c._dm + b)
    }
    this._br = j;
    this.__defineGetter__("_fd", function () {
        return this._bs
    });
    this.__defineGetter__("_as", function () {
        return this._ar
    });
    this.__defineGetter__("_dp", function () {
        return this._br
    });
    this.__defineGetter__("_cr", function () {
        return 17 + 4 * this._bs
    });
    this._aq = function () {
        var q = this._cr;
        var o = new _ac(q);
        o._bq(0, 0, 9, 9);
        o._bq(q - 8, 0, 8, 9);
        o._bq(0, q - 8, 9, 8);
        var n = this._ar.length;
        for (var m = 0; m < n; m++) {
            var p = this._ar[m] - 2;
            for (var r = 0; r < n; r++) {
                if ((m == 0 && (r == 0 || r == n - 1)) || (m == n - 1 && r == 0)) {
                    continue
                }
                o._bq(this._ar[r] - 2, p, 5, 5)
            }
        }
        o._bq(6, 9, 1, q - 17);
        o._bq(9, 6, q - 17, 1);
        if (this._bs > 6) {
            o._bq(q - 11, 0, 3, 6);
            o._bq(0, q - 11, 6, 3)
        }
        return o
    };
    this._bu = function (i) {
        return this._do[i.ordinal()]
    }
}

_a3._bv = new Array(31892, 34236, 39577, 42195, 48118, 51042, 55367, 58893, 63784, 68472, 70749, 76311, 79154, 84390, 87683, 92361, 96236, 102084, 102881, 110507, 110734, 117786, 119615, 126325, 127568, 133589, 136944, 141498, 145311, 150283, 152622, 158308, 161089, 167017);
_a3.VERSIONS = _ay();
_a3._av = function (a) {
    if (a < 1 || a > 40) {
        throw"bad arguments"
    }
    return _a3.VERSIONS[a - 1]
};
_a3._at = function (b) {
    if (b % 4 != 1) {
        throw"Error _at"
    }
    try {
        return _a3._av((b - 17) >> 2)
    } catch (a) {
        throw"Error _av"
    }
};
_a3._aw = function (d) {
    var b = 4294967295;
    var f = 0;
    for (var c = 0; c < _a3._bv.length; c++) {
        var a = _a3._bv[c];
        if (a == d) {
            return this._av(c + 7)
        }
        var e = _ax._gj(d, a);
        if (e < b) {
            f = c + 7;
            b = e
        }
    }
    if (b <= 3) {
        return this._av(f)
    }
    return null
};

function _ay() {
    return new Array(new _a3(1, new Array(), new _a2(7, new _a1(1, 19)), new _a2(10, new _a1(1, 16)), new _a2(13, new _a1(1, 13)), new _a2(17, new _a1(1, 9))), new _a3(2, new Array(6, 18), new _a2(10, new _a1(1, 34)), new _a2(16, new _a1(1, 28)), new _a2(22, new _a1(1, 22)), new _a2(28, new _a1(1, 16))), new _a3(3, new Array(6, 22), new _a2(15, new _a1(1, 55)), new _a2(26, new _a1(1, 44)), new _a2(18, new _a1(2, 17)), new _a2(22, new _a1(2, 13))), new _a3(4, new Array(6, 26), new _a2(20, new _a1(1, 80)), new _a2(18, new _a1(2, 32)), new _a2(26, new _a1(2, 24)), new _a2(16, new _a1(4, 9))), new _a3(5, new Array(6, 30), new _a2(26, new _a1(1, 108)), new _a2(24, new _a1(2, 43)), new _a2(18, new _a1(2, 15), new _a1(2, 16)), new _a2(22, new _a1(2, 11), new _a1(2, 12))), new _a3(6, new Array(6, 34), new _a2(18, new _a1(2, 68)), new _a2(16, new _a1(4, 27)), new _a2(24, new _a1(4, 19)), new _a2(28, new _a1(4, 15))), new _a3(7, new Array(6, 22, 38), new _a2(20, new _a1(2, 78)), new _a2(18, new _a1(4, 31)), new _a2(18, new _a1(2, 14), new _a1(4, 15)), new _a2(26, new _a1(4, 13), new _a1(1, 14))), new _a3(8, new Array(6, 24, 42), new _a2(24, new _a1(2, 97)), new _a2(22, new _a1(2, 38), new _a1(2, 39)), new _a2(22, new _a1(4, 18), new _a1(2, 19)), new _a2(26, new _a1(4, 14), new _a1(2, 15))), new _a3(9, new Array(6, 26, 46), new _a2(30, new _a1(2, 116)), new _a2(22, new _a1(3, 36), new _a1(2, 37)), new _a2(20, new _a1(4, 16), new _a1(4, 17)), new _a2(24, new _a1(4, 12), new _a1(4, 13))), new _a3(10, new Array(6, 28, 50), new _a2(18, new _a1(2, 68), new _a1(2, 69)), new _a2(26, new _a1(4, 43), new _a1(1, 44)), new _a2(24, new _a1(6, 19), new _a1(2, 20)), new _a2(28, new _a1(6, 15), new _a1(2, 16))), new _a3(11, new Array(6, 30, 54), new _a2(20, new _a1(4, 81)), new _a2(30, new _a1(1, 50), new _a1(4, 51)), new _a2(28, new _a1(4, 22), new _a1(4, 23)), new _a2(24, new _a1(3, 12), new _a1(8, 13))), new _a3(12, new Array(6, 32, 58), new _a2(24, new _a1(2, 92), new _a1(2, 93)), new _a2(22, new _a1(6, 36), new _a1(2, 37)), new _a2(26, new _a1(4, 20), new _a1(6, 21)), new _a2(28, new _a1(7, 14), new _a1(4, 15))), new _a3(13, new Array(6, 34, 62), new _a2(26, new _a1(4, 107)), new _a2(22, new _a1(8, 37), new _a1(1, 38)), new _a2(24, new _a1(8, 20), new _a1(4, 21)), new _a2(22, new _a1(12, 11), new _a1(4, 12))), new _a3(14, new Array(6, 26, 46, 66), new _a2(30, new _a1(3, 115), new _a1(1, 116)), new _a2(24, new _a1(4, 40), new _a1(5, 41)), new _a2(20, new _a1(11, 16), new _a1(5, 17)), new _a2(24, new _a1(11, 12), new _a1(5, 13))), new _a3(15, new Array(6, 26, 48, 70), new _a2(22, new _a1(5, 87), new _a1(1, 88)), new _a2(24, new _a1(5, 41), new _a1(5, 42)), new _a2(30, new _a1(5, 24), new _a1(7, 25)), new _a2(24, new _a1(11, 12), new _a1(7, 13))), new _a3(16, new Array(6, 26, 50, 74), new _a2(24, new _a1(5, 98), new _a1(1, 99)), new _a2(28, new _a1(7, 45), new _a1(3, 46)), new _a2(24, new _a1(15, 19), new _a1(2, 20)), new _a2(30, new _a1(3, 15), new _a1(13, 16))), new _a3(17, new Array(6, 30, 54, 78), new _a2(28, new _a1(1, 107), new _a1(5, 108)), new _a2(28, new _a1(10, 46), new _a1(1, 47)), new _a2(28, new _a1(1, 22), new _a1(15, 23)), new _a2(28, new _a1(2, 14), new _a1(17, 15))), new _a3(18, new Array(6, 30, 56, 82), new _a2(30, new _a1(5, 120), new _a1(1, 121)), new _a2(26, new _a1(9, 43), new _a1(4, 44)), new _a2(28, new _a1(17, 22), new _a1(1, 23)), new _a2(28, new _a1(2, 14), new _a1(19, 15))), new _a3(19, new Array(6, 30, 58, 86), new _a2(28, new _a1(3, 113), new _a1(4, 114)), new _a2(26, new _a1(3, 44), new _a1(11, 45)), new _a2(26, new _a1(17, 21), new _a1(4, 22)), new _a2(26, new _a1(9, 13), new _a1(16, 14))), new _a3(20, new Array(6, 34, 62, 90), new _a2(28, new _a1(3, 107), new _a1(5, 108)), new _a2(26, new _a1(3, 41), new _a1(13, 42)), new _a2(30, new _a1(15, 24), new _a1(5, 25)), new _a2(28, new _a1(15, 15), new _a1(10, 16))), new _a3(21, new Array(6, 28, 50, 72, 94), new _a2(28, new _a1(4, 116), new _a1(4, 117)), new _a2(26, new _a1(17, 42)), new _a2(28, new _a1(17, 22), new _a1(6, 23)), new _a2(30, new _a1(19, 16), new _a1(6, 17))), new _a3(22, new Array(6, 26, 50, 74, 98), new _a2(28, new _a1(2, 111), new _a1(7, 112)), new _a2(28, new _a1(17, 46)), new _a2(30, new _a1(7, 24), new _a1(16, 25)), new _a2(24, new _a1(34, 13))), new _a3(23, new Array(6, 30, 54, 74, 102), new _a2(30, new _a1(4, 121), new _a1(5, 122)), new _a2(28, new _a1(4, 47), new _a1(14, 48)), new _a2(30, new _a1(11, 24), new _a1(14, 25)), new _a2(30, new _a1(16, 15), new _a1(14, 16))), new _a3(24, new Array(6, 28, 54, 80, 106), new _a2(30, new _a1(6, 117), new _a1(4, 118)), new _a2(28, new _a1(6, 45), new _a1(14, 46)), new _a2(30, new _a1(11, 24), new _a1(16, 25)), new _a2(30, new _a1(30, 16), new _a1(2, 17))), new _a3(25, new Array(6, 32, 58, 84, 110), new _a2(26, new _a1(8, 106), new _a1(4, 107)), new _a2(28, new _a1(8, 47), new _a1(13, 48)), new _a2(30, new _a1(7, 24), new _a1(22, 25)), new _a2(30, new _a1(22, 15), new _a1(13, 16))), new _a3(26, new Array(6, 30, 58, 86, 114), new _a2(28, new _a1(10, 114), new _a1(2, 115)), new _a2(28, new _a1(19, 46), new _a1(4, 47)), new _a2(28, new _a1(28, 22), new _a1(6, 23)), new _a2(30, new _a1(33, 16), new _a1(4, 17))), new _a3(27, new Array(6, 34, 62, 90, 118), new _a2(30, new _a1(8, 122), new _a1(4, 123)), new _a2(28, new _a1(22, 45), new _a1(3, 46)), new _a2(30, new _a1(8, 23), new _a1(26, 24)), new _a2(30, new _a1(12, 15), new _a1(28, 16))), new _a3(28, new Array(6, 26, 50, 74, 98, 122), new _a2(30, new _a1(3, 117), new _a1(10, 118)), new _a2(28, new _a1(3, 45), new _a1(23, 46)), new _a2(30, new _a1(4, 24), new _a1(31, 25)), new _a2(30, new _a1(11, 15), new _a1(31, 16))), new _a3(29, new Array(6, 30, 54, 78, 102, 126), new _a2(30, new _a1(7, 116), new _a1(7, 117)), new _a2(28, new _a1(21, 45), new _a1(7, 46)), new _a2(30, new _a1(1, 23), new _a1(37, 24)), new _a2(30, new _a1(19, 15), new _a1(26, 16))), new _a3(30, new Array(6, 26, 52, 78, 104, 130), new _a2(30, new _a1(5, 115), new _a1(10, 116)), new _a2(28, new _a1(19, 47), new _a1(10, 48)), new _a2(30, new _a1(15, 24), new _a1(25, 25)), new _a2(30, new _a1(23, 15), new _a1(25, 16))), new _a3(31, new Array(6, 30, 56, 82, 108, 134), new _a2(30, new _a1(13, 115), new _a1(3, 116)), new _a2(28, new _a1(2, 46), new _a1(29, 47)), new _a2(30, new _a1(42, 24), new _a1(1, 25)), new _a2(30, new _a1(23, 15), new _a1(28, 16))), new _a3(32, new Array(6, 34, 60, 86, 112, 138), new _a2(30, new _a1(17, 115)), new _a2(28, new _a1(10, 46), new _a1(23, 47)), new _a2(30, new _a1(10, 24), new _a1(35, 25)), new _a2(30, new _a1(19, 15), new _a1(35, 16))), new _a3(33, new Array(6, 30, 58, 86, 114, 142), new _a2(30, new _a1(17, 115), new _a1(1, 116)), new _a2(28, new _a1(14, 46), new _a1(21, 47)), new _a2(30, new _a1(29, 24), new _a1(19, 25)), new _a2(30, new _a1(11, 15), new _a1(46, 16))), new _a3(34, new Array(6, 34, 62, 90, 118, 146), new _a2(30, new _a1(13, 115), new _a1(6, 116)), new _a2(28, new _a1(14, 46), new _a1(23, 47)), new _a2(30, new _a1(44, 24), new _a1(7, 25)), new _a2(30, new _a1(59, 16), new _a1(1, 17))), new _a3(35, new Array(6, 30, 54, 78, 102, 126, 150), new _a2(30, new _a1(12, 121), new _a1(7, 122)), new _a2(28, new _a1(12, 47), new _a1(26, 48)), new _a2(30, new _a1(39, 24), new _a1(14, 25)), new _a2(30, new _a1(22, 15), new _a1(41, 16))), new _a3(36, new Array(6, 24, 50, 76, 102, 128, 154), new _a2(30, new _a1(6, 121), new _a1(14, 122)), new _a2(28, new _a1(6, 47), new _a1(34, 48)), new _a2(30, new _a1(46, 24), new _a1(10, 25)), new _a2(30, new _a1(2, 15), new _a1(64, 16))), new _a3(37, new Array(6, 28, 54, 80, 106, 132, 158), new _a2(30, new _a1(17, 122), new _a1(4, 123)), new _a2(28, new _a1(29, 46), new _a1(14, 47)), new _a2(30, new _a1(49, 24), new _a1(10, 25)), new _a2(30, new _a1(24, 15), new _a1(46, 16))), new _a3(38, new Array(6, 32, 58, 84, 110, 136, 162), new _a2(30, new _a1(4, 122), new _a1(18, 123)), new _a2(28, new _a1(13, 46), new _a1(32, 47)), new _a2(30, new _a1(48, 24), new _a1(14, 25)), new _a2(30, new _a1(42, 15), new _a1(32, 16))), new _a3(39, new Array(6, 26, 54, 82, 110, 138, 166), new _a2(30, new _a1(20, 117), new _a1(4, 118)), new _a2(28, new _a1(40, 47), new _a1(7, 48)), new _a2(30, new _a1(43, 24), new _a1(22, 25)), new _a2(30, new _a1(10, 15), new _a1(67, 16))), new _a3(40, new Array(6, 30, 58, 86, 114, 142, 170), new _a2(30, new _a1(19, 118), new _a1(6, 119)), new _a2(28, new _a1(18, 47), new _a1(31, 48)), new _a2(30, new _a1(34, 24), new _a1(34, 25)), new _a2(30, new _a1(20, 15), new _a1(61, 16))))
}

function _ae(i, f, c, h, e, b, g, d, a) {
    this.a11 = i;
    this.a12 = h;
    this.a13 = g;
    this.a21 = f;
    this.a22 = e;
    this.a23 = d;
    this.a31 = c;
    this.a32 = b;
    this.a33 = a;
    this._ad = function (v) {
        var s = v.length;
        var z = this.a11;
        var w = this.a12;
        var u = this.a13;
        var q = this.a21;
        var p = this.a22;
        var o = this.a23;
        var m = this.a31;
        var k = this.a32;
        var j = this.a33;
        for (var n = 0; n < s; n += 2) {
            var t = v[n];
            var r = v[n + 1];
            var l = u * t + o * r + j;
            v[n] = (z * t + q * r + m) / l;
            v[n + 1] = (w * t + p * r + k) / l
        }
    };
    this._fp = function (m, k) {
        var q = m.length;
        for (var l = 0; l < q; l++) {
            var j = m[l];
            var p = k[l];
            var o = this.a13 * j + this.a23 * p + this.a33;
            m[l] = (this.a11 * j + this.a21 * p + this.a31) / o;
            k[l] = (this.a12 * j + this.a22 * p + this.a32) / o
        }
    };
    this._fr = function () {
        return new _ae(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21)
    };
    this.times = function (j) {
        return new _ae(this.a11 * j.a11 + this.a21 * j.a12 + this.a31 * j.a13, this.a11 * j.a21 + this.a21 * j.a22 + this.a31 * j.a23, this.a11 * j.a31 + this.a21 * j.a32 + this.a31 * j.a33, this.a12 * j.a11 + this.a22 * j.a12 + this.a32 * j.a13, this.a12 * j.a21 + this.a22 * j.a22 + this.a32 * j.a23, this.a12 * j.a31 + this.a22 * j.a32 + this.a32 * j.a33, this.a13 * j.a11 + this.a23 * j.a12 + this.a33 * j.a13, this.a13 * j.a21 + this.a23 * j.a22 + this.a33 * j.a23, this.a13 * j.a31 + this.a23 * j.a32 + this.a33 * j.a33)
    }
}

_ae._ag = function (p, e, o, d, n, c, m, b, h, q, l, f, a, j, i, r) {
    var g = this._be(p, e, o, d, n, c, m, b);
    var k = this._bf(h, q, l, f, a, j, i, r);
    return k.times(g)
};
_ae._bf = function (d, p, c, m, b, k, a, j) {
    var h = j - k;
    var f = p - m + k - j;
    if (h == 0 && f == 0) {
        return new _ae(c - d, b - c, d, m - p, k - m, p, 0, 0, 1)
    } else {
        var q = c - b;
        var o = a - b;
        var l = d - c + b - a;
        var i = m - k;
        var e = q * h - o * i;
        var n = (l * h - o * f) / e;
        var g = (q * f - l * i) / e;
        return new _ae(c - d + n * c, a - d + g * a, d, m - p + n * m, j - p + g * j, p, n, g, 1)
    }
};
_ae._be = function (f, h, d, g, b, e, a, c) {
    return this._bf(f, h, d, g, b, e, a, c)._fr()
};

function _bg(b, a) {
    this.bits = b;
    this.points = a
}

function Detector(a) {
    this.image = a;
    this._am = null;
    this._bi = function (m, l, c, b) {
        var d = Math.abs(b - l) > Math.abs(c - m);
        if (d) {
            var r = m;
            m = l;
            l = r;
            r = c;
            c = b;
            b = r
        }
        var j = Math.abs(c - m);
        var i = Math.abs(b - l);
        var p = -j >> 1;
        var u = l < b ? 1 : -1;
        var f = m < c ? 1 : -1;
        var e = 0;
        for (var h = m, g = l; h != c; h += f) {
            var t = d ? g : h;
            var s = d ? h : g;
            if (e == 1) {
                if (this.image[t + s * qrcode.width]) {
                    e++
                }
            } else {
                if (!this.image[t + s * qrcode.width]) {
                    e++
                }
            }
            if (e == 3) {
                var o = h - m;
                var n = g - l;
                return Math.sqrt((o * o + n * n))
            }
            p += i;
            if (p > 0) {
                if (g == b) {
                    break
                }
                g += u;
                p -= j
            }
        }
        var k = c - m;
        var q = b - l;
        return Math.sqrt((k * k + q * q))
    };
    this._bh = function (i, g, h, f) {
        var b = this._bi(i, g, h, f);
        var e = 1;
        var d = i - (h - i);
        if (d < 0) {
            e = i / (i - d);
            d = 0
        } else {
            if (d >= qrcode.width) {
                e = (qrcode.width - 1 - i) / (d - i);
                d = qrcode.width - 1
            }
        }
        var c = Math.floor(g - (f - g) * e);
        e = 1;
        if (c < 0) {
            e = g / (g - c);
            c = 0
        } else {
            if (c >= qrcode.height) {
                e = (qrcode.height - 1 - g) / (c - g);
                c = qrcode.height - 1
            }
        }
        d = Math.floor(i + (d - i) * e);
        b += this._bi(i, g, d, c);
        return b - 1
    };
    this._bj = function (c, d) {
        var b = this._bh(Math.floor(c.X), Math.floor(c.Y), Math.floor(d.X), Math.floor(d.Y));
        var e = this._bh(Math.floor(d.X), Math.floor(d.Y), Math.floor(c.X), Math.floor(c.Y));
        if (isNaN(b)) {
            return e / 7
        }
        if (isNaN(e)) {
            return b / 7
        }
        return (b + e) / 14
    };
    this._bk = function (d, c, b) {
        return (this._bj(d, c) + this._bj(d, b)) / 2
    };
    this.distance = function (d, b) {
        var e = d.X - b.X;
        var c = d.Y - b.Y;
        return Math.sqrt((e * e + c * c))
    };
    this._bx = function (g, f, d, e) {
        var b = Math.round(this.distance(g, f) / e);
        var c = Math.round(this.distance(g, d) / e);
        var h = ((b + c) >> 1) + 7;
        switch (h & 3) {
            case 0:
                h++;
                break;
            case 2:
                h--;
                break;
            case 3:
                throw"Error"
        }
        return h
    };
    this._bl = function (g, f, d, j) {
        var k = Math.floor(j * g);
        var h = Math.max(0, f - k);
        var i = Math.min(qrcode.width - 1, f + k);
        if (i - h < g * 3) {
            throw"Error"
        }
        var b = Math.max(0, d - k);
        var c = Math.min(qrcode.height - 1, d + k);
        var e = new _ak(this.image, h, b, i - h, c - b, g, this._am);
        return e.find()
    };
    this.createTransform = function (l, h, k, b, g) {
        var j = g - 3.5;
        var i;
        var f;
        var e;
        var c;
        if (b != null) {
            i = b.X;
            f = b.Y;
            e = c = j - 3
        } else {
            i = (h.X - l.X) + k.X;
            f = (h.Y - l.Y) + k.Y;
            e = c = j
        }
        var d = _ae._ag(3.5, 3.5, j, 3.5, e, c, 3.5, j, l.X, l.Y, h.X, h.Y, i, f, k.X, k.Y);
        return d
    };
    this._bz = function (e, b, d) {
        var c = _aa;
        return c._af(e, d, b)
    };
    this._cd = function (q) {
        var j = q._gq;
        var h = q._gs;
        var n = q._gp;
        var d = this._bk(j, h, n);
        if (d < 1) {
            throw"Error"
        }
        var r = this._bx(j, h, n, d);
        var b = _a3._at(r);
        var k = b._cr - 7;
        var l = null;
        if (b._as.length > 0) {
            var f = h.X - j.X + n.X;
            var e = h.Y - j.Y + n.Y;
            var c = 1 - 3 / k;
            var t = Math.floor(j.X + c * (f - j.X));
            var s = Math.floor(j.Y + c * (e - j.Y));
            for (var p = 4; p <= 16; p <<= 1) {
                l = this._bl(d, t, s, p);
                break
            }
        }
        var g = this.createTransform(j, h, n, l, r);
        var m = this._bz(this.image, g, r);
        var o;
        if (l == null) {
            o = new Array(n, j, h)
        } else {
            o = new Array(n, j, h, l)
        }
        return new _bg(m, o)
    };
    this.detect = function () {
        var b = new _cc()._ce(this.image);
        return this._cd(b)
    }
}

var _ca = 21522;
var _cb = new Array(new Array(21522, 0), new Array(20773, 1), new Array(24188, 2), new Array(23371, 3), new Array(17913, 4), new Array(16590, 5), new Array(20375, 6), new Array(19104, 7), new Array(30660, 8), new Array(29427, 9), new Array(32170, 10), new Array(30877, 11), new Array(26159, 12), new Array(25368, 13), new Array(27713, 14), new Array(26998, 15), new Array(5769, 16), new Array(5054, 17), new Array(7399, 18), new Array(6608, 19), new Array(1890, 20), new Array(597, 21), new Array(3340, 22), new Array(2107, 23), new Array(13663, 24), new Array(12392, 25), new Array(16177, 26), new Array(14854, 27), new Array(9396, 28), new Array(8579, 29), new Array(11994, 30), new Array(11245, 31));
var _ch = new Array(0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4);

function _ax(a) {
    this._cf = _cg.forBits((a >> 3) & 3);
    this._fe = (a & 7);
    this.__defineGetter__("_cg", function () {
        return this._cf
    });
    this.__defineGetter__("_dx", function () {
        return this._fe
    });
    this.GetHashCode = function () {
        return (this._cf.ordinal() << 3) | _fe
    };
    this.Equals = function (c) {
        var b = c;
        return this._cf == b._cf && this._fe == b._fe
    }
}

_ax._gj = function (d, c) {
    d ^= c;
    return _ch[d & 15] + _ch[(_ew(d, 4) & 15)] + _ch[(_ew(d, 8) & 15)] + _ch[(_ew(d, 12) & 15)] + _ch[(_ew(d, 16) & 15)] + _ch[(_ew(d, 20) & 15)] + _ch[(_ew(d, 24) & 15)] + _ch[(_ew(d, 28) & 15)]
};
_ax._ci = function (a) {
    var b = _ax._cj(a);
    if (b != null) {
        return b
    }
    return _ax._cj(a ^ _ca)
};
_ax._cj = function (d) {
    var b = 4294967295;
    var a = 0;
    for (var c = 0; c < _cb.length; c++) {
        var g = _cb[c];
        var f = g[0];
        if (f == d) {
            return new _ax(g[1])
        }
        var e = this._gj(d, f);
        if (e < b) {
            a = g[1];
            b = e
        }
    }
    if (b <= 3) {
        return new _ax(a)
    }
    return null
};

function _cg(a, c, b) {
    this._ff = a;
    this.bits = c;
    this.name = b;
    this.__defineGetter__("Bits", function () {
        return this.bits
    });
    this.__defineGetter__("Name", function () {
        return this.name
    });
    this.ordinal = function () {
        return this._ff
    }
}

_cg.forBits = function (a) {
    if (a < 0 || a >= FOR_BITS.length) {
        throw"bad arguments"
    }
    return FOR_BITS[a]
};
var L = new _cg(0, 1, "L");
var M = new _cg(1, 0, "M");
var Q = new _cg(2, 3, "Q");
var H = new _cg(3, 2, "H");
var FOR_BITS = new Array(M, L, H, Q);

function _ac(d, a) {
    if (!a) {
        a = d
    }
    if (d < 1 || a < 1) {
        throw"Both dimensions must be greater than 0"
    }
    this.width = d;
    this.height = a;
    var c = d >> 5;
    if ((d & 31) != 0) {
        c++
    }
    this.rowSize = c;
    this.bits = new Array(c * a);
    for (var b = 0; b < this.bits.length; b++) {
        this.bits[b] = 0
    }
    this.__defineGetter__("Width", function () {
        return this.width
    });
    this.__defineGetter__("Height", function () {
        return this.height
    });
    this.__defineGetter__("Dimension", function () {
        if (this.width != this.height) {
            throw"Can't call getDimension() on a non-square matrix"
        }
        return this.width
    });
    this._ds = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        return ((_ew(this.bits[f], (e & 31))) & 1) != 0
    };
    this._dq = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] |= 1 << (e & 31)
    };
    this.flip = function (e, g) {
        var f = g * this.rowSize + (e >> 5);
        this.bits[f] ^= 1 << (e & 31)
    };
    this.clear = function () {
        var e = this.bits.length;
        for (var f = 0; f < e; f++) {
            this.bits[f] = 0
        }
    };
    this._bq = function (g, j, f, m) {
        if (j < 0 || g < 0) {
            throw"Left and top must be nonnegative"
        }
        if (m < 1 || f < 1) {
            throw"Height and width must be at least 1"
        }
        var l = g + f;
        var e = j + m;
        if (e > this.height || l > this.width) {
            throw"The region must fit inside the matrix"
        }
        for (var i = j; i < e; i++) {
            var h = i * this.rowSize;
            for (var k = g; k < l; k++) {
                this.bits[h + (k >> 5)] |= 1 << (k & 31)
            }
        }
    }
}

function _dl(a, b) {
    this._dv = a;
    this._dw = b;
    this.__defineGetter__("_du", function () {
        return this._dv
    });
    this.__defineGetter__("Codewords", function () {
        return this._dw
    })
}

_dl._gn = function (c, h, r) {
    if (c.length != h._dp) {
        throw"bad arguments"
    }
    var k = h._bu(r);
    var e = 0;
    var d = k._fb();
    for (var q = 0; q < d.length; q++) {
        e += d[q].Count
    }
    var l = new Array(e);
    var n = 0;
    for (var o = 0; o < d.length; o++) {
        var f = d[o];
        for (var q = 0; q < f.Count; q++) {
            var m = f._dm;
            var s = k._bo + m;
            l[n++] = new _dl(m, new Array(s))
        }
    }
    var t = l[0]._dw.length;
    var b = l.length - 1;
    while (b >= 0) {
        var v = l[b]._dw.length;
        if (v == t) {
            break
        }
        b--
    }
    b++;
    var g = t - k._bo;
    var a = 0;
    for (var q = 0; q < g; q++) {
        for (var o = 0; o < n; o++) {
            l[o]._dw[q] = c[a++]
        }
    }
    for (var o = b; o < n; o++) {
        l[o]._dw[g] = c[a++]
    }
    var p = l[0]._dw.length;
    for (var q = g; q < p; q++) {
        for (var o = 0; o < n; o++) {
            var u = o < b ? q : q + 1;
            l[o]._dw[u] = c[a++]
        }
    }
    return l
};

function _cl(a) {
    var b = a.Dimension;
    if (b < 21 || (b & 3) != 1) {
        throw"Error _cl"
    }
    this._au = a;
    this._cp = null;
    this._co = null;
    this._dk = function (d, c, e) {
        return this._au._ds(d, c) ? (e << 1) | 1 : e << 1
    };
    this._cm = function () {
        if (this._co != null) {
            return this._co
        }
        var g = 0;
        for (var e = 0; e < 6; e++) {
            g = this._dk(e, 8, g)
        }
        g = this._dk(7, 8, g);
        g = this._dk(8, 8, g);
        g = this._dk(8, 7, g);
        for (var c = 5; c >= 0; c--) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        var f = this._au.Dimension;
        g = 0;
        var d = f - 8;
        for (var e = f - 1; e >= d; e--) {
            g = this._dk(e, 8, g)
        }
        for (var c = f - 7; c < f; c++) {
            g = this._dk(8, c, g)
        }
        this._co = _ax._ci(g);
        if (this._co != null) {
            return this._co
        }
        throw"Error _cm"
    };
    this._cq = function () {
        if (this._cp != null) {
            return this._cp
        }
        var h = this._au.Dimension;
        var f = (h - 17) >> 2;
        if (f <= 6) {
            return _a3._av(f)
        }
        var g = 0;
        var e = h - 11;
        for (var c = 5; c >= 0; c--) {
            for (var d = h - 9; d >= e; d--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        g = 0;
        for (var d = 5; d >= 0; d--) {
            for (var c = h - 9; c >= e; c--) {
                g = this._dk(d, c, g)
            }
        }
        this._cp = _a3._aw(g);
        if (this._cp != null && this._cp._cr == h) {
            return this._cp
        }
        throw"Error _cq"
    };
    this._gk = function () {
        var q = this._cm();
        var o = this._cq();
        var c = _dx._gl(q._dx);
        var f = this._au.Dimension;
        c._dj(this._au, f);
        var k = o._aq();
        var n = true;
        var r = new Array(o._dp);
        var m = 0;
        var p = 0;
        var h = 0;
        for (var e = f - 1; e > 0; e -= 2) {
            if (e == 6) {
                e--
            }
            for (var l = 0; l < f; l++) {
                var g = n ? f - 1 - l : l;
                for (var d = 0; d < 2; d++) {
                    if (!k._ds(e - d, g)) {
                        h++;
                        p <<= 1;
                        if (this._au._ds(e - d, g)) {
                            p |= 1
                        }
                        if (h == 8) {
                            r[m++] = p;
                            h = 0;
                            p = 0
                        }
                    }
                }
            }
            n ^= true
        }
        if (m != o._dp) {
            throw"Error _gk"
        }
        return r
    }
}

var _dx = {};
_dx._gl = function (a) {
    if (a < 0 || a > 7) {
        throw"bad arguments"
    }
    return _dx._dy[a]
};

function _fg() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return ((b + a) & 1) == 0
    }
}

function _fh() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (b & 1) == 0
    }
}

function _fi() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return a % 3 == 0
    }
}

function _fj() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (b + a) % 3 == 0
    }
}

function _fk() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return (((_ew(b, 1)) + (a / 3)) & 1) == 0
    }
}

function _fl() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (c, b) {
        var a = c * b;
        return (a & 1) + (a % 3) == 0
    }
}

function _fm() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (c, b) {
        var a = c * b;
        return (((a & 1) + (a % 3)) & 1) == 0
    }
}

function _fn() {
    this._dj = function (c, d) {
        for (var b = 0; b < d; b++) {
            for (var a = 0; a < d; a++) {
                if (this._fw(b, a)) {
                    c.flip(a, b)
                }
            }
        }
    };
    this._fw = function (b, a) {
        return ((((b + a) & 1) + ((b * a) % 3)) & 1) == 0
    }
}

_dx._dy = new Array(new _fg(), new _fh(), new _fi(), new _fj(), new _fk(), new _fl(), new _fm(), new _fn());

function _db(a) {
    this._fa = a;
    this.decode = function (j, f) {
        var c = new _bp(this._fa, j);
        var p = new Array(f);
        for (var g = 0; g < p.length; g++) {
            p[g] = 0
        }
        var m = false;
        var d = true;
        for (var g = 0; g < f; g++) {
            var q = c.evaluateAt(this._fa.exp(m ? g + 1 : g));
            p[p.length - 1 - g] = q;
            if (q != 0) {
                d = false
            }
        }
        if (d) {
            return
        }
        var b = new _bp(this._fa, p);
        var l = this._eb(this._fa._ba(f, 1), b, f);
        var o = l[0];
        var n = l[1];
        var k = this._ey(o);
        var e = this._di(n, k, m);
        for (var g = 0; g < k.length; g++) {
            var h = j.length - 1 - this._fa.log(k[g]);
            if (h < 0) {
                throw"ReedSolomonException Bad error location"
            }
            j[h] = _az._bd(j[h], e[g])
        }
    };
    this._eb = function (z, y, f) {
        if (z._ec < y._ec) {
            var w = z;
            z = y;
            y = w
        }
        var B = z;
        var k = y;
        var o = this._fa.One;
        var j = this._fa.Zero;
        var e = this._fa.Zero;
        var i = this._fa.One;
        while (k._ec >= Math.floor(f / 2)) {
            var x = B;
            var g = o;
            var v = e;
            B = k;
            o = j;
            e = i;
            if (B.Zero) {
                throw"r_{i-1} was zero"
            }
            k = x;
            var m = this._fa.Zero;
            var p = B._ex(B._ec);
            var h = this._fa.inverse(p);
            while (k._ec >= B._ec && !k.Zero) {
                var c = k._ec - B._ec;
                var A = this._fa.multiply(k._ex(k._ec), h);
                m = m._bd(this._fa._ba(c, A));
                k = k._bd(B._dc(c, A))
            }
            j = m.multiply1(o)._bd(g);
            i = m.multiply1(e)._bd(v)
        }
        var u = i._ex(0);
        if (u == 0) {
            throw"ReedSolomonException sigmaTilde(0) was zero"
        }
        var d = this._fa.inverse(u);
        var n = i.multiply2(d);
        var l = k.multiply2(d);
        return new Array(n, l)
    };
    this._ey = function (f) {
        var g = f._ec;
        if (g == 1) {
            return new Array(f._ex(1))
        }
        var b = new Array(g);
        var d = 0;
        for (var c = 1; c < 256 && d < g; c++) {
            if (f.evaluateAt(c) == 0) {
                b[d] = this._fa.inverse(c);
                d++
            }
        }
        if (d != g) {
            throw"Error locator degree does not match number of roots"
        }
        return b
    };
    this._di = function (f, h, g) {
        var k = h.length;
        var l = new Array(k);
        for (var e = 0; e < k; e++) {
            var b = this._fa.inverse(h[e]);
            var c = 1;
            for (var d = 0; d < k; d++) {
                if (e != d) {
                    c = this._fa.multiply(c, _az._bd(1, this._fa.multiply(h[d], b)))
                }
            }
            l[e] = this._fa.multiply(f.evaluateAt(b), this._fa.inverse(c));
            if (g) {
                l[e] = this._fa.multiply(l[e], b)
            }
        }
        return l
    }
}

function _bp(f, e) {
    if (e == null || e.length == 0) {
        throw"bad arguments"
    }
    this._fa = f;
    var c = e.length;
    if (c > 1 && e[0] == 0) {
        var d = 1;
        while (d < c && e[d] == 0) {
            d++
        }
        if (d == c) {
            this._dd = f.Zero._dd
        } else {
            this._dd = new Array(c - d);
            for (var b = 0; b < this._dd.length; b++) {
                this._dd[b] = 0
            }
            for (var a = 0; a < this._dd.length; a++) {
                this._dd[a] = e[d + a]
            }
        }
    } else {
        this._dd = e
    }
    this.__defineGetter__("Zero", function () {
        return this._dd[0] == 0
    });
    this.__defineGetter__("_ec", function () {
        return this._dd.length - 1
    });
    this.__defineGetter__("Coefficients", function () {
        return this._dd
    });
    this._ex = function (g) {
        return this._dd[this._dd.length - 1 - g]
    };
    this.evaluateAt = function (h) {
        if (h == 0) {
            return this._ex(0)
        }
        var l = this._dd.length;
        if (h == 1) {
            var g = 0;
            for (var k = 0; k < l; k++) {
                g = _az._bd(g, this._dd[k])
            }
            return g
        }
        var j = this._dd[0];
        for (var k = 1; k < l; k++) {
            j = _az._bd(this._fa.multiply(h, j), this._dd[k])
        }
        return j
    };
    this._bd = function (g) {
        if (this._fa != g._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (this.Zero) {
            return g
        }
        if (g.Zero) {
            return this
        }
        var o = this._dd;
        var n = g._dd;
        if (o.length > n.length) {
            var j = o;
            o = n;
            n = j
        }
        var h = new Array(n.length);
        var k = n.length - o.length;
        for (var m = 0; m < k; m++) {
            h[m] = n[m]
        }
        for (var l = k; l < n.length; l++) {
            h[l] = _az._bd(o[l - k], n[l])
        }
        return new _bp(f, h)
    };
    this.multiply1 = function (o) {
        if (this._fa != o._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (this.Zero || o.Zero) {
            return this._fa.Zero
        }
        var q = this._dd;
        var g = q.length;
        var l = o._dd;
        var n = l.length;
        var p = new Array(g + n - 1);
        for (var m = 0; m < g; m++) {
            var h = q[m];
            for (var k = 0; k < n; k++) {
                p[m + k] = _az._bd(p[m + k], this._fa.multiply(h, l[k]))
            }
        }
        return new _bp(this._fa, p)
    };
    this.multiply2 = function (g) {
        if (g == 0) {
            return this._fa.Zero
        }
        if (g == 1) {
            return this
        }
        var j = this._dd.length;
        var k = new Array(j);
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa, k)
    };
    this._dc = function (l, g) {
        if (l < 0) {
            throw"bad arguments"
        }
        if (g == 0) {
            return this._fa.Zero
        }
        var j = this._dd.length;
        var k = new Array(j + l);
        for (var h = 0; h < k.length; h++) {
            k[h] = 0
        }
        for (var h = 0; h < j; h++) {
            k[h] = this._fa.multiply(this._dd[h], g)
        }
        return new _bp(this._fa, k)
    };
    this.divide = function (l) {
        if (this._fa != l._fa) {
            throw"GF256Polys do not have same _az _fa"
        }
        if (l.Zero) {
            throw"Divide by 0"
        }
        var j = this._fa.Zero;
        var o = this;
        var g = l._ex(l._ec);
        var n = this._fa.inverse(g);
        while (o._ec >= l._ec && !o.Zero) {
            var m = o._ec - l._ec;
            var h = this._fa.multiply(o._ex(o._ec), n);
            var i = l._dc(m, h);
            var k = this._fa._ba(m, h);
            j = j._bd(k);
            o = o._bd(i)
        }
        return new Array(j, o)
    }
}

function _az(b) {
    this._gh = new Array(256);
    this._gi = new Array(256);
    var a = 1;
    for (var e = 0; e < 256; e++) {
        this._gh[e] = a;
        a <<= 1;
        if (a >= 256) {
            a ^= b
        }
    }
    for (var e = 0; e < 255; e++) {
        this._gi[this._gh[e]] = e
    }
    var d = new Array(1);
    d[0] = 0;
    this.zero = new _bp(this, new Array(d));
    var c = new Array(1);
    c[0] = 1;
    this.one = new _bp(this, new Array(c));
    this.__defineGetter__("Zero", function () {
        return this.zero
    });
    this.__defineGetter__("One", function () {
        return this.one
    });
    this._ba = function (j, f) {
        if (j < 0) {
            throw"bad arguments"
        }
        if (f == 0) {
            return zero
        }
        var h = new Array(j + 1);
        for (var g = 0; g < h.length; g++) {
            h[g] = 0
        }
        h[0] = f;
        return new _bp(this, h)
    };
    this.exp = function (f) {
        return this._gh[f]
    };
    this.log = function (f) {
        if (f == 0) {
            throw"bad arguments"
        }
        return this._gi[f]
    };
    this.inverse = function (f) {
        if (f == 0) {
            throw"System.ArithmeticException"
        }
        return this._gh[255 - this._gi[f]]
    };
    this.multiply = function (g, f) {
        if (g == 0 || f == 0) {
            return 0
        }
        if (g == 1) {
            return f
        }
        if (f == 1) {
            return g
        }
        return this._gh[(this._gi[g] + this._gi[f]) % 255]
    }
}

_az._bb = new _az(285);
_az._bc = new _az(301);
_az._bd = function (d, c) {
    return d ^ c
};
var Decoder = {};
Decoder.rsDecoder = new _db(_az._bb);
Decoder.correctErrors = function (g, b) {
    var d = g.length;
    var f = new Array(d);
    for (var e = 0; e < d; e++) {
        f[e] = g[e] & 255
    }
    var a = g.length - b;
    try {
        Decoder.rsDecoder.decode(f, a)
    } catch (c) {
        throw c
    }
    for (var e = 0; e < b; e++) {
        g[e] = f[e]
    }
};
Decoder.decode = function (q) {
    var b = new _cl(q);
    var o = b._cq();
    var c = b._cm()._cg;
    var p = b._gk();
    var a = _dl._gn(p, o, c);
    var f = 0;
    for (var k = 0; k < a.length; k++) {
        f += a[k]._du
    }
    var e = new Array(f);
    var n = 0;
    for (var h = 0; h < a.length; h++) {
        var m = a[h];
        var d = m.Codewords;
        var g = m._du;
        Decoder.correctErrors(d, g);
        for (var k = 0; k < g; k++) {
            e[n++] = d[k]
        }
    }
    var l = new QRCodeDataBlockReader(e, o._fd, c.Bits);
    return l
};
var qrcode = {};
qrcode.imagedata = null;
qrcode.width = 0;
qrcode.height = 0;
qrcode.qrCodeSymbol = null;
qrcode.debug = false;
qrcode.maxImgSize = 1024 * 1024;
qrcode._eo = [[10, 9, 8, 8], [12, 11, 16, 10], [14, 13, 16, 12]];
qrcode.callback = null;
qrcode.vidSuccess = function (a) {
    qrcode.localstream = a;
    if (qrcode.webkit) {
        qrcode.video.src = window.webkitURL.createObjectURL(a)
    } else {
        if (qrcode.moz) {
            qrcode.video.mozSrcObject = a;
            qrcode.video.play()
        } else {
            qrcode.video.src = a
        }
    }
    qrcode.gUM = true;
    qrcode.canvas_qr2 = document.createElement("canvas");
    qrcode.canvas_qr2.id = "qr-canvas";
    qrcode.qrcontext2 = qrcode.canvas_qr2.getContext("2d");
    qrcode.canvas_qr2.width = qrcode.video.videoWidth;
    qrcode.canvas_qr2.height = qrcode.video.videoHeight;
    setTimeout(qrcode.captureToCanvas, 500)
};
qrcode.vidError = function (a) {
    qrcode.gUM = false;
    return
};
qrcode.captureToCanvas = function () {
    if (qrcode.gUM) {
        try {
            if (qrcode.video.videoWidth == 0) {
                setTimeout(qrcode.captureToCanvas, 500);
                return
            } else {
                qrcode.canvas_qr2.width = qrcode.video.videoWidth;
                qrcode.canvas_qr2.height = qrcode.video.videoHeight
            }
            qrcode.qrcontext2.drawImage(qrcode.video, 0, 0);
            try {
                qrcode.decode()
            } catch (a) {
                console.log(a);
                setTimeout(qrcode.captureToCanvas, 500)
            }
        } catch (a) {
            console.log(a);
            setTimeout(qrcode.captureToCanvas, 500)
        }
    }
};
qrcode.setWebcam = function (c) {
    var d = navigator;
    qrcode.video = document.getElementById(c);
    var a = true;
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        try {
            navigator.mediaDevices.enumerateDevices().then(function (e) {
                e.forEach(function (f) {
                    console.log("deb1");
                    if (f.kind === "videoinput") {
                        if (f.label.toLowerCase().search("back") > -1) {
                            a = [{sourceId: f.deviceId}]
                        }
                    }
                    console.log(f.kind + ": " + f.label + " id = " + f.deviceId)
                })
            })
        } catch (b) {
            console.log(b)
        }
    } else {
        console.log("no navigator.mediaDevices.enumerateDevices")
    }
    if (d.getUserMedia) {
        d.getUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
    } else {
        if (d.webkitGetUserMedia) {
            qrcode.webkit = true;
            d.webkitGetUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
        } else {
            if (d.mozGetUserMedia) {
                qrcode.moz = true;
                d.mozGetUserMedia({video: a, audio: false}, qrcode.vidSuccess, qrcode.vidError)
            }
        }
    }
};
qrcode.decode = function (d,b64) {
    if (arguments.length == 0) {
        if (qrcode.canvas_qr2) {
            var b = qrcode.canvas_qr2;
            var a = qrcode.qrcontext2
        } else {
            var b = document.getElementById("qr-canvas");
            var a = b.getContext("2d")
        }
        qrcode.width = b.width;
        qrcode.height = b.height;
        qrcode.imagedata = a.getImageData(0, 0, qrcode.width, qrcode.height);
        qrcode.result = qrcode.process(a);
        if (qrcode.callback != null) {
            qrcode.callback(qrcode.result,b64)
        }
        return qrcode.result
    } else {
        var c = new Image();
        c.crossOrigin = "Anonymous";
        c.onload = function () {
            var g = document.getElementById("out-canvas");
            if (g != null) {
                var j = g.getContext("2d");
                j.clearRect(0, 0, 320, 240);
                j.drawImage(c, 0, 0, 320, 240)
            }
            var i = document.createElement("canvas");
            var h = i.getContext("2d");
            var f = c.height;
            var l = c.width;
            if (c.width * c.height > qrcode.maxImgSize) {
                var k = c.width / c.height;
                f = Math.sqrt(qrcode.maxImgSize / k);
                l = k * f
            }
            i.width = l;
            i.height = f;
            h.drawImage(c, 0, 0, i.width, i.height);
            qrcode.width = i.width;
            qrcode.height = i.height;
            try {
                qrcode.imagedata = h.getImageData(0, 0, i.width, i.height)
            } catch (m) {
                qrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
                if (qrcode.callback != null) {
                    qrcode.callback(qrcode.result,b64)
                }
                return
            }
            try {
                qrcode.result = qrcode.process(h)
            } catch (m) {
                console.log(m);
                qrcode.result = "error decoding QR Code"
            }
            if (qrcode.callback != null) {
                qrcode.callback(qrcode.result,b64)
            }
        };
        c.onerror = function () {
            if (qrcode.callback != null) {
                qrcode.callback("Failed to load the image")
            }
        };
        c.src = d
    }
};
qrcode.isUrl = function (a) {
    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return b.test(a)
};
qrcode.decode_url = function (b) {
    var d = "";
    try {
        d = escape(b)
    } catch (c) {
        console.log(c);
        d = b
    }
    var a = "";
    try {
        a = decodeURIComponent(d)
    } catch (c) {
        console.log(c);
        a = d
    }
    return a
};
qrcode.decode_utf8 = function (a) {
    if (qrcode.isUrl(a)) {
        return qrcode.decode_url(a)
    } else {
        return a
    }
};
qrcode.process = function (q) {
    var a = new Date().getTime();
    var c = qrcode.grayScaleToBitmap(qrcode.grayscale());
    if (qrcode.debug) {
        for (var m = 0; m < qrcode.height; m++) {
            for (var n = 0; n < qrcode.width; n++) {
                var o = (n * 4) + (m * qrcode.width * 4);
                qrcode.imagedata.data[o] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 1] = c[n + m * qrcode.width] ? 0 : 0;
                qrcode.imagedata.data[o + 2] = c[n + m * qrcode.width] ? 255 : 0
            }
        }
        q.putImageData(qrcode.imagedata, 0, 0)
    }
    var h = new Detector(c);
    var p = h.detect();
    if (qrcode.debug) {
        for (var m = 0; m < p.bits.Height; m++) {
            for (var n = 0; n < p.bits.Width; n++) {
                var o = (n * 4 * 2) + (m * 2 * qrcode.width * 4);
                qrcode.imagedata.data[o] = p.bits._ds(n, m) ? 0 : 0;
                qrcode.imagedata.data[o + 1] = p.bits._ds(n, m) ? 0 : 0;
                qrcode.imagedata.data[o + 2] = p.bits._ds(n, m) ? 255 : 0
            }
        }
        q.putImageData(qrcode.imagedata, 0, 0)
    }
    var k = Decoder.decode(p.bits);
    var g = k.DataByte;
    var l = "";
    for (var f = 0; f < g.length; f++) {
        for (var e = 0; e < g[f].length; e++) {
            l += String.fromCharCode(g[f][e])
        }
    }
    var d = new Date().getTime();
    var b = d - a;
    console.log(b);
    return qrcode.decode_utf8(l)
};
qrcode.getPixel = function (b, d) {
    if (qrcode.width < b) {
        throw"point error"
    }
    if (qrcode.height < d) {
        throw"point error"
    }
    var a = (b * 4) + (d * qrcode.width * 4);
    var c = (qrcode.imagedata.data[a] * 33 + qrcode.imagedata.data[a + 1] * 34 + qrcode.imagedata.data[a + 2] * 33) / 100;
    return c
};
qrcode.binarize = function (d) {
    var c = new Array(qrcode.width * qrcode.height);
    for (var e = 0; e < qrcode.height; e++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, e);
            c[b + e * qrcode.width] = a <= d ? true : false
        }
    }
    return c
};
qrcode._em = function (d) {
    var c = 4;
    var k = Math.floor(qrcode.width / c);
    var j = Math.floor(qrcode.height / c);
    var f = new Array(c);
    for (var g = 0; g < c; g++) {
        f[g] = new Array(c);
        for (var e = 0; e < c; e++) {
            f[g][e] = new Array(0, 0)
        }
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            f[a][o][0] = 255;
            for (var l = 0; l < j; l++) {
                for (var n = 0; n < k; n++) {
                    var h = d[k * a + n + (j * o + l) * qrcode.width];
                    if (h < f[a][o][0]) {
                        f[a][o][0] = h
                    }
                    if (h > f[a][o][1]) {
                        f[a][o][1] = h
                    }
                }
            }
        }
    }
    var m = new Array(c);
    for (var b = 0; b < c; b++) {
        m[b] = new Array(c)
    }
    for (var o = 0; o < c; o++) {
        for (var a = 0; a < c; a++) {
            m[a][o] = Math.floor((f[a][o][0] + f[a][o][1]) / 2)
        }
    }
    return m
};
qrcode.grayScaleToBitmap = function (f) {
    var k = qrcode._em(f);
    var b = k.length;
    var e = Math.floor(qrcode.width / b);
    var d = Math.floor(qrcode.height / b);
    var h = new ArrayBuffer(qrcode.width * qrcode.height);
    var c = new Uint8Array(h);
    for (var j = 0; j < b; j++) {
        for (var a = 0; a < b; a++) {
            for (var g = 0; g < d; g++) {
                for (var i = 0; i < e; i++) {
                    c[e * a + i + (d * j + g) * qrcode.width] = (f[e * a + i + (d * j + g) * qrcode.width] < k[a][j]) ? true : false
                }
            }
        }
    }
    return c
};
qrcode.grayscale = function () {
    var e = new ArrayBuffer(qrcode.width * qrcode.height);
    var c = new Uint8Array(e);
    for (var d = 0; d < qrcode.height; d++) {
        for (var b = 0; b < qrcode.width; b++) {
            var a = qrcode.getPixel(b, d);
            c[b + d * qrcode.width] = a
        }
    }
    return c
};

function _ew(a, b) {
    if (a >= 0) {
        return a >> b
    } else {
        return (a >> b) + (2 << ~b)
    }
}

var _gf = 3;
var _eh = 57;
var _el = 8;
var _eg = 2;
qrcode._er = function (c) {
    function b(m, k) {
        var n = m.X - k.X;
        var l = m.Y - k.Y;
        return Math.sqrt((n * n + l * l))
    }

    function d(k, o, n) {
        var m = o.x;
        var l = o.y;
        return ((n.x - m) * (k.y - l)) - ((n.y - l) * (k.x - m))
    }

    var i = b(c[0], c[1]);
    var f = b(c[1], c[2]);
    var e = b(c[0], c[2]);
    var a, j, h;
    if (f >= i && f >= e) {
        j = c[0];
        a = c[1];
        h = c[2]
    } else {
        if (e >= f && e >= i) {
            j = c[1];
            a = c[0];
            h = c[2]
        } else {
            j = c[2];
            a = c[0];
            h = c[1]
        }
    }
    if (d(a, j, h) < 0) {
        var g = a;
        a = h;
        h = g
    }
    c[0] = a;
    c[1] = j;
    c[2] = h
};

function _cz(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function () {
        return this._aj
    });
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("X", function () {
        return this.x
    });
    this.__defineGetter__("Y", function () {
        return this.y
    });
    this._ek = function () {
        this.count++
    };
    this._ev = function (f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}

function _es(a) {
    this._go = a[0];
    this._gu = a[1];
    this._gr = a[2];
    this.__defineGetter__("_gp", function () {
        return this._go
    });
    this.__defineGetter__("_gq", function () {
        return this._gu
    });
    this.__defineGetter__("_gs", function () {
        return this._gr
    })
}

function _cc() {
    this.image = null;
    this._cv = [];
    this._ge = false;
    this._al = new Array(0, 0, 0, 0, 0);
    this._am = null;
    this.__defineGetter__("_da", function () {
        this._al[0] = 0;
        this._al[1] = 0;
        this._al[2] = 0;
        this._al[3] = 0;
        this._al[4] = 0;
        return this._al
    });
    this._ao = function (f) {
        var b = 0;
        for (var d = 0; d < 5; d++) {
            var e = f[d];
            if (e == 0) {
                return false
            }
            b += e
        }
        if (b < 7) {
            return false
        }
        var c = Math.floor((b << _el) / 7);
        var a = Math.floor(c / 2);
        return Math.abs(c - (f[0] << _el)) < a && Math.abs(c - (f[1] << _el)) < a && Math.abs(3 * c - (f[2] << _el)) < 3 * a && Math.abs(c - (f[3] << _el)) < a && Math.abs(c - (f[4] << _el)) < a
    };
    this._an = function (b, a) {
        return (a - b[4] - b[3]) - b[2] / 2
    };
    this._ap = function (a, j, d, g) {
        var c = this.image;
        var h = qrcode.height;
        var b = this._da;
        var f = a;
        while (f >= 0 && c[j + f * qrcode.width]) {
            b[2]++;
            f--
        }
        if (f < 0) {
            return NaN
        }
        while (f >= 0 && !c[j + f * qrcode.width] && b[1] <= d) {
            b[1]++;
            f--
        }
        if (f < 0 || b[1] > d) {
            return NaN
        }
        while (f >= 0 && c[j + f * qrcode.width] && b[0] <= d) {
            b[0]++;
            f--
        }
        if (b[0] > d) {
            return NaN
        }
        f = a + 1;
        while (f < h && c[j + f * qrcode.width]) {
            b[2]++;
            f++
        }
        if (f == h) {
            return NaN
        }
        while (f < h && !c[j + f * qrcode.width] && b[3] < d) {
            b[3]++;
            f++
        }
        if (f == h || b[3] >= d) {
            return NaN
        }
        while (f < h && c[j + f * qrcode.width] && b[4] < d) {
            b[4]++;
            f++
        }
        if (b[4] >= d) {
            return NaN
        }
        var e = b[0] + b[1] + b[2] + b[3] + b[4];
        if (5 * Math.abs(e - g) >= 2 * g) {
            return NaN
        }
        return this._ao(b) ? this._an(b, f) : NaN
    };
    this._ej = function (b, a, e, h) {
        var d = this.image;
        var i = qrcode.width;
        var c = this._da;
        var g = b;
        while (g >= 0 && d[g + a * qrcode.width]) {
            c[2]++;
            g--
        }
        if (g < 0) {
            return NaN
        }
        while (g >= 0 && !d[g + a * qrcode.width] && c[1] <= e) {
            c[1]++;
            g--
        }
        if (g < 0 || c[1] > e) {
            return NaN
        }
        while (g >= 0 && d[g + a * qrcode.width] && c[0] <= e) {
            c[0]++;
            g--
        }
        if (c[0] > e) {
            return NaN
        }
        g = b + 1;
        while (g < i && d[g + a * qrcode.width]) {
            c[2]++;
            g++
        }
        if (g == i) {
            return NaN
        }
        while (g < i && !d[g + a * qrcode.width] && c[3] < e) {
            c[3]++;
            g++
        }
        if (g == i || c[3] >= e) {
            return NaN
        }
        while (g < i && d[g + a * qrcode.width] && c[4] < e) {
            c[4]++;
            g++
        }
        if (c[4] >= e) {
            return NaN
        }
        var f = c[0] + c[1] + c[2] + c[3] + c[4];
        if (5 * Math.abs(f - h) >= h) {
            return NaN
        }
        return this._ao(c) ? this._an(c, g) : NaN
    };
    this._cu = function (c, f, e) {
        var d = c[0] + c[1] + c[2] + c[3] + c[4];
        var n = this._an(c, e);
        var b = this._ap(f, Math.floor(n), c[2], d);
        if (!isNaN(b)) {
            n = this._ej(Math.floor(n), Math.floor(b), c[2], d);
            if (!isNaN(n)) {
                var l = d / 7;
                var m = false;
                var h = this._cv.length;
                for (var g = 0; g < h; g++) {
                    var a = this._cv[g];
                    if (a._ev(l, b, n)) {
                        a._ek();
                        m = true;
                        break
                    }
                }
                if (!m) {
                    var k = new _cz(n, b, l);
                    this._cv.push(k);
                    if (this._am != null) {
                        this._am._ep(k)
                    }
                }
                return true
            }
        }
        return false
    };
    this._ee = function () {
        var h = this._cv.length;
        if (h < 3) {
            throw"Couldn't find enough finder patterns (found " + h + ")"
        }
        if (h > 3) {
            var b = 0;
            var j = 0;
            for (var d = 0; d < h; d++) {
                var g = this._cv[d]._ei;
                b += g;
                j += (g * g)
            }
            var a = b / h;
            this._cv.sort(function (m, l) {
                var k = Math.abs(l._ei - a);
                var i = Math.abs(m._ei - a);
                if (k < i) {
                    return (-1)
                } else {
                    if (k == i) {
                        return 0
                    } else {
                        return 1
                    }
                }
            });
            var e = Math.sqrt(j / h - a * a);
            var c = Math.max(0.2 * a, e);
            for (var d = this._cv.length - 1; d >= 0; d--) {
                var f = this._cv[d];
                if (Math.abs(f._ei - a) > c) {
                    this._cv.splice(d, 1)
                }
            }
        }
        if (this._cv.length > 3) {
            this._cv.sort(function (k, i) {
                if (k.count > i.count) {
                    return -1
                }
                if (k.count < i.count) {
                    return 1
                }
                return 0
            })
        }
        return new Array(this._cv[0], this._cv[1], this._cv[2])
    };
    this._eq = function () {
        var b = this._cv.length;
        if (b <= 1) {
            return 0
        }
        var c = null;
        for (var d = 0; d < b; d++) {
            var a = this._cv[d];
            if (a.Count >= _eg) {
                if (c == null) {
                    c = a
                } else {
                    this._ge = true;
                    return Math.floor((Math.abs(c.X - a.X) - Math.abs(c.Y - a.Y)) / 2)
                }
            }
        }
        return 0
    };
    this._cx = function () {
        var g = 0;
        var c = 0;
        var a = this._cv.length;
        for (var d = 0; d < a; d++) {
            var f = this._cv[d];
            if (f.Count >= _eg) {
                g++;
                c += f._ei
            }
        }
        if (g < 3) {
            return false
        }
        var e = c / a;
        var b = 0;
        for (var d = 0; d < a; d++) {
            f = this._cv[d];
            b += Math.abs(f._ei - e)
        }
        return b <= 0.05 * c
    };
    this._ce = function (e) {
        var o = false;
        this.image = e;
        var n = qrcode.height;
        var k = qrcode.width;
        var a = Math.floor((3 * n) / (4 * _eh));
        if (a < _gf || o) {
            a = _gf
        }
        var g = false;
        var d = new Array(5);
        for (var h = a - 1; h < n && !g; h += a) {
            d[0] = 0;
            d[1] = 0;
            d[2] = 0;
            d[3] = 0;
            d[4] = 0;
            var b = 0;
            for (var f = 0; f < k; f++) {
                if (e[f + h * qrcode.width]) {
                    if ((b & 1) == 1) {
                        b++
                    }
                    d[b]++
                } else {
                    if ((b & 1) == 0) {
                        if (b == 4) {
                            if (this._ao(d)) {
                                var c = this._cu(d, h, f);
                                if (c) {
                                    a = 2;
                                    if (this._ge) {
                                        g = this._cx()
                                    } else {
                                        var m = this._eq();
                                        if (m > d[2]) {
                                            h += m - d[2] - a;
                                            f = k - 1
                                        }
                                    }
                                } else {
                                    do {
                                        f++
                                    } while (f < k && !e[f + h * qrcode.width]);
                                    f--
                                }
                                b = 0;
                                d[0] = 0;
                                d[1] = 0;
                                d[2] = 0;
                                d[3] = 0;
                                d[4] = 0
                            } else {
                                d[0] = d[2];
                                d[1] = d[3];
                                d[2] = d[4];
                                d[3] = 1;
                                d[4] = 0;
                                b = 3
                            }
                        } else {
                            d[++b]++
                        }
                    } else {
                        d[b]++
                    }
                }
            }
            if (this._ao(d)) {
                var c = this._cu(d, h, k);
                if (c) {
                    a = d[0];
                    if (this._ge) {
                        g = _cx()
                    }
                }
            }
        }
        var l = this._ee();
        qrcode._er(l);
        return new _es(l)
    }
}

function _ai(c, a, b) {
    this.x = c;
    this.y = a;
    this.count = 1;
    this._aj = b;
    this.__defineGetter__("_ei", function () {
        return this._aj
    });
    this.__defineGetter__("Count", function () {
        return this.count
    });
    this.__defineGetter__("X", function () {
        return Math.floor(this.x)
    });
    this.__defineGetter__("Y", function () {
        return Math.floor(this.y)
    });
    this._ek = function () {
        this.count++
    };
    this._ev = function (f, e, d) {
        if (Math.abs(e - this.y) <= f && Math.abs(d - this.x) <= f) {
            var g = Math.abs(f - this._aj);
            return g <= 1 || g / this._aj <= 1
        }
        return false
    }
}

function _ak(g, c, b, f, a, e, d) {
    this.image = g;
    this._cv = new Array();
    this.startX = c;
    this.startY = b;
    this.width = f;
    this.height = a;
    this._ef = e;
    this._al = new Array(0, 0, 0);
    this._am = d;
    this._an = function (i, h) {
        return (h - i[2]) - i[1] / 2
    };
    this._ao = function (l) {
        var k = this._ef;
        var h = k / 2;
        for (var j = 0; j < 3; j++) {
            if (Math.abs(k - l[j]) >= h) {
                return false
            }
        }
        return true
    };
    this._ap = function (h, q, l, o) {
        var k = this.image;
        var p = qrcode.height;
        var j = this._al;
        j[0] = 0;
        j[1] = 0;
        j[2] = 0;
        var n = h;
        while (n >= 0 && k[q + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n--
        }
        if (n < 0 || j[1] > l) {
            return NaN
        }
        while (n >= 0 && !k[q + n * qrcode.width] && j[0] <= l) {
            j[0]++;
            n--
        }
        if (j[0] > l) {
            return NaN
        }
        n = h + 1;
        while (n < p && k[q + n * qrcode.width] && j[1] <= l) {
            j[1]++;
            n++
        }
        if (n == p || j[1] > l) {
            return NaN
        }
        while (n < p && !k[q + n * qrcode.width] && j[2] <= l) {
            j[2]++;
            n++
        }
        if (j[2] > l) {
            return NaN
        }
        var m = j[0] + j[1] + j[2];
        if (5 * Math.abs(m - o) >= 2 * o) {
            return NaN
        }
        return this._ao(j) ? this._an(j, n) : NaN
    };
    this._cu = function (l, o, n) {
        var m = l[0] + l[1] + l[2];
        var t = this._an(l, n);
        var k = this._ap(o, Math.floor(t), 2 * l[1], m);
        if (!isNaN(k)) {
            var s = (l[0] + l[1] + l[2]) / 3;
            var q = this._cv.length;
            for (var p = 0; p < q; p++) {
                var h = this._cv[p];
                if (h._ev(s, k, t)) {
                    return new _ai(t, k, s)
                }
            }
            var r = new _ai(t, k, s);
            this._cv.push(r);
            if (this._am != null) {
                this._am._ep(r)
            }
        }
        return null
    };
    this.find = function () {
        var p = this.startX;
        var s = this.height;
        var q = p + f;
        var r = b + (s >> 1);
        var m = new Array(0, 0, 0);
        for (var k = 0; k < s; k++) {
            var o = r + ((k & 1) == 0 ? ((k + 1) >> 1) : -((k + 1) >> 1));
            m[0] = 0;
            m[1] = 0;
            m[2] = 0;
            var n = p;
            while (n < q && !g[n + qrcode.width * o]) {
                n++
            }
            var h = 0;
            while (n < q) {
                if (g[n + o * qrcode.width]) {
                    if (h == 1) {
                        m[h]++
                    } else {
                        if (h == 2) {
                            if (this._ao(m)) {
                                var l = this._cu(m, o, n);
                                if (l != null) {
                                    return l
                                }
                            }
                            m[0] = m[2];
                            m[1] = 1;
                            m[2] = 0;
                            h = 1
                        } else {
                            m[++h]++
                        }
                    }
                } else {
                    if (h == 1) {
                        h++
                    }
                    m[h]++
                }
                n++
            }
            if (this._ao(m)) {
                var l = this._cu(m, o, q);
                if (l != null) {
                    return l
                }
            }
        }
        if (!(this._cv.length == 0)) {
            return this._cv[0]
        }
        throw"Couldn't find enough alignment patterns"
    }
}

function QRCodeDataBlockReader(c, a, b) {
    this._ed = 0;
    this._cw = 7;
    this.dataLength = 0;
    this.blocks = c;
    this._en = b;
    if (a <= 9) {
        this.dataLengthMode = 0
    } else {
        if (a >= 10 && a <= 26) {
            this.dataLengthMode = 1
        } else {
            if (a >= 27 && a <= 40) {
                this.dataLengthMode = 2
            }
        }
    }
    this._gd = function (f) {
        var k = 0;
        if (f < this._cw + 1) {
            var m = 0;
            for (var e = 0; e < f; e++) {
                m += (1 << e)
            }
            m <<= (this._cw - f + 1);
            k = (this.blocks[this._ed] & m) >> (this._cw - f + 1);
            this._cw -= f;
            return k
        } else {
            if (f < this._cw + 1 + 8) {
                var j = 0;
                for (var e = 0; e < this._cw + 1; e++) {
                    j += (1 << e)
                }
                k = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                this._ed++;
                k += ((this.blocks[this._ed]) >> (8 - (f - (this._cw + 1))));
                this._cw = this._cw - f % 8;
                if (this._cw < 0) {
                    this._cw = 8 + this._cw
                }
                return k
            } else {
                if (f < this._cw + 1 + 16) {
                    var j = 0;
                    var h = 0;
                    for (var e = 0; e < this._cw + 1; e++) {
                        j += (1 << e)
                    }
                    var g = (this.blocks[this._ed] & j) << (f - (this._cw + 1));
                    this._ed++;
                    var d = this.blocks[this._ed] << (f - (this._cw + 1 + 8));
                    this._ed++;
                    for (var e = 0; e < f - (this._cw + 1 + 8); e++) {
                        h += (1 << e)
                    }
                    h <<= 8 - (f - (this._cw + 1 + 8));
                    var l = (this.blocks[this._ed] & h) >> (8 - (f - (this._cw + 1 + 8)));
                    k = g + d + l;
                    this._cw = this._cw - (f - 8) % 8;
                    if (this._cw < 0) {
                        this._cw = 8 + this._cw
                    }
                    return k
                } else {
                    return 0
                }
            }
        }
    };
    this.NextMode = function () {
        if ((this._ed > this.blocks.length - this._en - 2)) {
            return 0
        } else {
            return this._gd(4)
        }
    };
    this.getDataLength = function (d) {
        var e = 0;
        while (true) {
            if ((d >> e) == 1) {
                break
            }
            e++
        }
        return this._gd(qrcode._eo[this.dataLengthMode][e])
    };
    this.getRomanAndFigureString = function (h) {
        var f = h;
        var g = 0;
        var j = "";
        var d = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":");
        do {
            if (f > 1) {
                g = this._gd(11);
                var i = Math.floor(g / 45);
                var e = g % 45;
                j += d[i];
                j += d[e];
                f -= 2
            } else {
                if (f == 1) {
                    g = this._gd(6);
                    j += d[g];
                    f -= 1
                }
            }
        } while (f > 0);
        return j
    };
    this.getFigureString = function (f) {
        var d = f;
        var e = 0;
        var g = "";
        do {
            if (d >= 3) {
                e = this._gd(10);
                if (e < 100) {
                    g += "0"
                }
                if (e < 10) {
                    g += "0"
                }
                d -= 3
            } else {
                if (d == 2) {
                    e = this._gd(7);
                    if (e < 10) {
                        g += "0"
                    }
                    d -= 2
                } else {
                    if (d == 1) {
                        e = this._gd(4);
                        d -= 1
                    }
                }
            }
            g += e
        } while (d > 0);
        return g
    };
    this.get8bitByteArray = function (g) {
        var e = g;
        var f = 0;
        var d = new Array();
        do {
            f = this._gd(8);
            d.push(f);
            e--
        } while (e > 0);
        return d
    };
    this.getKanjiString = function (j) {
        var g = j;
        var i = 0;
        var h = "";
        do {
            i = _gd(13);
            var e = i % 192;
            var f = i / 192;
            var k = (f << 8) + e;
            var d = 0;
            if (k + 33088 <= 40956) {
                d = k + 33088
            } else {
                d = k + 49472
            }
            h += String.fromCharCode(d);
            g--
        } while (g > 0);
        return h
    };
    this.__defineGetter__("DataByte", function () {
        var h = new Array();
        var e = 1;
        var f = 2;
        var d = 4;
        var o = 8;
        do {
            var l = this.NextMode();
            if (l == 0) {
                if (h.length > 0) {
                    break
                } else {
                    throw"Empty data block"
                }
            }
            if (l != e && l != f && l != d && l != o) {
                throw"Invalid mode: " + l + " in (block:" + this._ed + " bit:" + this._cw + ")"
            }
            var g = this.getDataLength(l);
            if (g < 1) {
                throw"Invalid data length: " + g
            }
            switch (l) {
                case e:
                    var m = this.getFigureString(g);
                    var k = new Array(m.length);
                    for (var i = 0; i < m.length; i++) {
                        k[i] = m.charCodeAt(i)
                    }
                    h.push(k);
                    break;
                case f:
                    var m = this.getRomanAndFigureString(g);
                    var k = new Array(m.length);
                    for (var i = 0; i < m.length; i++) {
                        k[i] = m.charCodeAt(i)
                    }
                    h.push(k);
                    break;
                case d:
                    var n = this.get8bitByteArray(g);
                    h.push(n);
                    break;
                case o:
                    var m = this.getKanjiString(g);
                    h.push(m);
                    break
            }
        } while (true);
        return h
    })
};