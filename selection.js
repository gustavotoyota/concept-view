function showSelectArea() {
	updateSelectRect(selectionStart);

	selectArea.style.display = "";
}
function hideSelectArea() {
	selectArea.style.display = "none";
}





function getSelectAreaRect(selectionEnd) {
	let rect = {};
	
	rect.left = Math.min(selectionStart.x, selectionEnd.x);
	rect.top = Math.min(selectionStart.y, selectionEnd.y);
	rect.right = Math.max(selectionStart.x, selectionEnd.x);
	rect.bottom = Math.max(selectionStart.y, selectionEnd.y);
	rect.width = rect.right - rect.left;
	rect.height = rect.bottom - rect.top;
	
	return rect;
}

function updateSelectRect(selectionEnd) {
	let start = selectionStart.min(selectionEnd);
	let end = selectionStart.max(selectionEnd);
	
	selectRect.setAttribute('x', start.x);
	selectRect.setAttribute('y', start.y);
	
	selectRect.setAttribute('width', end.x - start.x);
	selectRect.setAttribute('height', end.y - start.y);
}

function nodesIntersectingSelectArea(selectionEnd) {
	let intersecting = new Set();

	let rect = getSelectAreaRect(selectionEnd);

	for (let node of nodes.values())
		if (rectsIntersect(rect, getNodeScreenRect(node)))
			intersecting.add(node);
			
	return intersecting;
}





function selectAll() {
	selectAllNodes();
	selectAllLinks();
}
function unselectAll() {
	unselectAllNodes();
	unselectAllLinks();
}




function deleteSelection() {
	deleteSelectedNodes();
	deleteSelectedLinks();
}