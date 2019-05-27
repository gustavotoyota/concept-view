function rectsIntersect(a, b) {
	return !(
		a.right < b.left
		|| a.bottom < b.top
		|| b.right < a.left
		|| b.bottom < a.top
	);
}


function getEditElems() {
	return document.querySelectorAll("[contenteditable=true]");
}

function isEditing() {
	return getEditElems().length > 0;
}

function stopEditing() {
	for (let elem of getEditElems())
		elem.contentEditable = false;
}

function getElemIndex(elem) {
	var idx = 0;
	
	while ((elem = elem.previousElementSibling) != null)
		++idx;
		
	return idx;
}

function downloadFile(fileName, content) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
	element.setAttribute('download', fileName);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function getElemNode(elem) {
	while (!elem.classList.contains('node'))
		elem = elem.parentElement;
	
	return elemNodes.get(elem);
}