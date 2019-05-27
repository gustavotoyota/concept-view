display.addEventListener('dblclick', function () {
	createNode(getMouseMapPos());
});



display.addEventListener('mousedown', function () {
	stopEditing();
	
	
	// Pan
	if (event.button === 1) {
		panLast = getMouseScreenPos();
		return;
	}
	
	// Select
	if (event.button === 0) {
		if (!event.ctrlKey && !event.shiftKey) {
			unselectAll();
		}
			
		selectionStart = getMouseScreenPos();
		
		showSelectArea();
		
		return;
	}
});
display.addEventListener('mousemove', function () {
	if (isPanning()) {
		let panCurr = getMouseScreenPos();
		view.mapPos = view.mapPos.add(screenToMapVec(panCurr.sub(panLast)));
		panLast = panCurr;
		
		updateMapTransform();
	}
	
	if (isSelecting()) {
		updateSelectRect(getMouseScreenPos());
	}
	
	if (isDragging()) {
		let dragCurr = getMouseMapPos();
		
		for (let node of selectedNodes)
			setNodePos(node, node.mapPos.add(dragCurr.sub(dragLast)));
		for (let node of selectedNodes)
			updateNodeLinks(node);
			
		dragLast = dragCurr;
	}
	
	if (isLinking()) {
		setArrowPoints(auxArrow, linkSrc.mapPos, getMouseMapPos());
	}
});
display.addEventListener('mouseup', function () {
	if (isPanning()) {
		panLast = null;
	}
	
	if (isSelecting()) {
		let selectionEnd = getMouseScreenPos();
		
		let intersectingNodes = nodesIntersectingSelectArea(selectionEnd);
		performNodeSelection(intersectingNodes);
		
		let intersectingLinks = linksIntersectingSelectArea(selectionEnd);
		performLinkSelection(intersectingLinks);
		
		hideSelectArea();
	
		selectionStart = null;
	}
	
	if (isDragging()) {
		dragLast = null;
	}
	
	if (isLinking()) {
		let linkDest = createNode(getMouseMapPos());
		
		createLink(linkSrc, linkDest);
		
		hideAuxArrow();
		
		linkSrc = null;
	}
});

display.addEventListener('wheel', function () {
	if (event.deltaY < 0)
		view.zoom /= 1.1;
	else
		view.zoom *= 1.1;
		
	updateMapTransform();
});

display.addEventListener('scroll', function () {
	display.scrollLeft = 0;
});

addEventListener('keydown', function () {
	if (isEditing())
		return;

	if (event.keyCode === 46) {
		deleteSelection();
		return;
	}
	
	if (event.keyCode === 65 && event.ctrlKey) {
		selectAll();
		return;
	}
	
	if (event.keyCode === 83 && event.ctrlKey) {
		saveMap();
		return;
	}
	
	let selectedNode = getOnlySelectedNode();
	if (event.keyCode === 113 && selectedNode) {
		startEditingNode(selectedNode);
		return;
	}
	
	let selectedLink = getOnlySelectedLink();
	if (event.keyCode === 113 && selectedLink) {
		startEditingLink(selectedLink);
		return;
	}
});