function RichText(document) {
	this.document = document;
}

RichText.prototype.perform = function (name, value) {
	this.document.execCommand(name, false, value);
}

RichText.prototype.undo = function () {
	this.perform("undo");
}
RichText.prototype.redo = function () {
	this.perform("redo");
}

RichText.prototype.copy = function () {
	this.perform("copy");
}
RichText.prototype.cut = function () {
	this.perform("cut");
}
RichText.prototype.paste = function () {
	this.perform("paste");
}

RichText.prototype.toggleBold = function () {
	this.perform("bold");
}
RichText.prototype.toggleItalic = function () {
	this.perform("italic");
}
RichText.prototype.toggleUnderline = function () {
	this.perform("underline");
}
RichText.prototype.toggleStrike = function () {
	this.perform("strikeThrough");
}

RichText.prototype.setFontName = function (name) {
	this.perform("fontName", name);
}
RichText.prototype.setFontSize = function (size) {
	this.perform("fontSize", size);
}

RichText.prototype.setForeColor = function (color) {
	this.perform("foreColor", color);
}
RichText.prototype.setBackColor = function (color) {
	this.perform("backColor", color);
}

RichText.prototype.justifyCenter = function () {
	this.perform("justifyCenter");
}
RichText.prototype.justifyFull = function () {
	this.perform("justifyFull");
}
RichText.prototype.justifyLeft = function () {
	this.perform("justifyLeft");
}
RichText.prototype.justifyRight = function () {
	this.perform("justifyRight");
}

RichText.prototype.subscript = function () {
	this.perform("subscript");
}
RichText.prototype.superscript = function () {
	this.perform("superscript");
}

RichText.prototype.createLink = function (url) {
	this.perform("createLink", url);
}
RichText.prototype.removeLink = function () {
	this.perform("unlink");
}

RichText.prototype.insertRule = function () {
	this.perform("insertHorizontalRule");
}
RichText.prototype.insertHTML = function (html) {
	this.perform("insertHTML", html);
}
RichText.prototype.insertImage = function (source) {
	this.perform("insertImage", source);
}
RichText.prototype.insertOrderedList = function () {
	this.perform("insertOrderedList");
}
RichText.prototype.insertUnorderedList = function () {
	this.perform("insertUnorderedList");
}
RichText.prototype.insertParagraph = function () {
	this.perform("insertParagraph");
}
RichText.prototype.insertText = function (text) {
	this.perform("insertText", text);
}

RichText.prototype.indent = function () {
	this.perform("indent");
}
RichText.prototype.outdent = function () {
	this.perform("outdent");
}

RichText.prototype.formatBlock = function (tag) {
	this.perform("formatBlock", tag);
}

RichText.prototype.removeFormat = function () {
	this.perform("removeFormat");
}

RichText.prototype.backDelete = function () {
	this.perform("delete");
}
RichText.prototype.frontDelete = function () {
	this.perform("forwardDelete");
}

RichText.prototype.selectAll = function () {
	this.perform("selectAll");
}

RichText.prototype.toggleCSS = function () {
	this.perform("styleWithCSS");
}

RichText.prototype.queryState = function (name) {
	return this.document.queryCommandState(name);
}
RichText.prototype.queryValue = function (name) {
	return this.document.queryCommandValue(name);
}

RichText.prototype.checkBold = function () {
	return this.queryState("bold");
}
RichText.prototype.checkItalic = function () {
	return this.queryState("italic");
}
RichText.prototype.checkUnderline = function () {
	return this.queryState("underline");
}
RichText.prototype.checkStrike = function () {
	return this.queryState("strikeThrough");
}

RichText.prototype.getFontName = function () {
	return this.queryValue("fontName");
}
RichText.prototype.getFontSize = function () {
	return this.queryValue("fontSize");
}

RichText.prototype.getForeColor = function () {
	return this.queryValue("foreColor");
}
RichText.prototype.getBackColor = function () {
	return this.queryValue("backColor");
}

RichText.prototype.checkJustifyCenter = function () {
	return this.queryState("justifyCenter");
}
RichText.prototype.checkJustifyFull = function () {
	return this.queryState("justifyFull");
}
RichText.prototype.checkJustifyLeft = function () {
	return this.queryState("justifyLeft");
}
RichText.prototype.checkJustifyRight = function () {
	return this.queryState("justifyRight");
}

RichText.prototype.checkSubscript = function () {
	return this.queryState("subscript");
}
RichText.prototype.checkSuperscript = function () {
	return this.queryState("superscript");
}