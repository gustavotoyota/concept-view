function List() {
    this.clear();
}

List.prototype.pushFront = function (item) {
    var node = {item: item, prev: null, next: this.begin};
    if (this.begin == null)
        this.end = node;
    else
        this.begin.prev = node;
    this.begin = node;
    
    ++this.length;
    
    return node;
}
List.prototype.pushBack = function (item) {
    var node = {item: item, prev: this.end, next: null};
    if (this.end == null)
        this.begin = node;
    else
        this.end.next = node;
    this.end = node;
    
    ++this.length;
    
    return node;
}

List.prototype.remove = function (node) {
    if (node.prev == null)
        this.begin = node.next;
    else
        node.prev.next = node.next;
    if (node.next == null)
        this.end = node.prev;
    else
        node.next.prev = node.prev;
    
    --this.length;
}

List.prototype.popFront = function () {
    var node = this.begin;
    if (node.next == null)
        this.end = null;
    else
        node.next.prev = null;
    this.begin = node.next;
    
    --this.length;
}

List.prototype.popBack = function () {
    var node = this.end;
    if (node.prev == null)
        this.begin = null;
    else
        node.prev.next = null;
    this.end = node.prev;
    
    --this.length;
}

List.prototype.clear = function () {
    this.begin = null;
    this.end = null;
    
    this.length = 0;
}