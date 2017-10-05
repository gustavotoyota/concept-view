function Vec2(a, b) {
    if (a === undefined) {
        this.x = 0;
        this.y = 0;
    } else if (typeof b == "number") {
        this.x = a;
        this.y = b;
    } else if (typeof a == "number") {
        this.x = a;
        this.y = a;
    } else {
        this.x = a.x;
        this.y = a.y;
    }
}

function sign(value) {
    return value < 0 ? -1 : 1;
}
function clamp(min, max, value) {
    return Math.max(min, Math.min(max, value));
}

Vec2.prototype.add = function (a, b) {
    var v = new Vec2(a, b);
    return new Vec2(this.x + v.x, this.y + v.y);
}
Vec2.prototype.sub = function (a, b) {
    var v = new Vec2(a, b);
    return new Vec2(this.x - v.x, this.y - v.y);
}
Vec2.prototype.mult = function (a, b) {
    var v = new Vec2(a, b);
    return new Vec2(this.x * v.x, this.y * v.y);
}
Vec2.prototype.div = function (a, b) {
    var v = new Vec2(a, b);
    return new Vec2(this.x / v.x, this.y / v.y);
}

Vec2.prototype.clamp = function (min, max) {
    return new Vec2(clamp(min.x, max.x, this.x), clamp(min.y, max.y, this.y));
}
Vec2.prototype.abs = function () {
    return new Vec2(Math.abs(this.x), Math.abs(this.y));
}
Vec2.prototype.lenSqr = function () {
    return this.x * this.x + this.y * this.y;
}
Vec2.prototype.len = function () {
    return Math.sqrt(this.lenSqr());
}
Vec2.prototype.distSqr = function (a, b) {
    return this.sub(a, b).lenSqr();
}
Vec2.prototype.dist = function (a, b) {
    return this.sub(a, b).len();
}
Vec2.prototype.normal = function (a, b) {
    return this.div(this.len());
}
Vec2.prototype.dot = function (a, b) {
    var v = new Vec2(a, b);
    return this.x * v.x + this.y * v.y;
}
Vec2.prototype.sign = function () {
    return new Vec2(sign(this.x), sign(this.y));
}
Vec2.prototype.neg = function () {
    return new Vec2(-this.x, -this.y);
}
Vec2.prototype.sqr = function () {
    return this.mult(this);
}
Vec2.prototype.pow = function (exp) {
    return new Vec2(Math.pow(this.x, exp), Math.pow(this.y, exp));
}

Vec2.prototype.equal = function (a, b) {
    var v = new Vec2(a, b);
    return this.x == v.x && this.y == v.y;
}
Vec2.prototype.diff = function (a, b) {
    var v = new Vec2(a, b);
    return this.x != v.x || this.y != v.y;
}
