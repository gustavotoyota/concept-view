function createNodeElem(node) {
	let elem = document.createElement('div');
	
	
	// Class
	elem.classList.add('node');
	
	
	elem.addEventListener('dblclick', function () {
		event.stopPropagation();
		
		if (elem.contentEditable === 'true')
			return;
		
		startEditingNode(node);
	});
	
	
	elem.addEventListener('mousedown', function () {
		// Propagate all MMB events
		if (event.button === 1)
			return;
		
		// Don't propagate RMB events
		if (event.button === 2) {
			event.stopPropagation();
			return;
		}
		
		// Steal all LMB events
		event.stopPropagation();
		
		
		// If editing, do nothing
		if (elem.contentEditable === 'true')
			return;
			
		
		// Not editing, stop other edits
		stopEditing();
		
		
		event.preventDefault();
		
		
		// Linking
		if (event.altKey) {
			linkSrc = node;
			
			selectOnlyNode(node);
			
			let destPos = getMouseMapPos();
			setArrowPoints(auxArrow, destPos, destPos);
			showAuxArrow();
			
			return;
		}
		

		// Selecting
		performNodeSelection([node], true);
		
		
		// Dragging
		if (!event.ctrlKey && !event.shiftKey)
			dragLast = getMouseMapPos();
	});
	elem.addEventListener('mouseup', function () {
		// Linking
		if (event.button === 0 && isLinking()
		&& linkSrc !== node
		&& !linkSrc.outs.has(node.id)) {
			createLink(linkSrc, node);
			
			selectOnlyNode(node);
			
			hideAuxArrow();
			
			linkSrc = null;
		}
	});
	
	
	
	elem.addEventListener('input', function () {
		onUpdate();
	});
	
	
	
	nodesDiv.appendChild(elem);
	
	
	
	return elem;
}

function createNode(pos, id) {
	let node = {};
	
	// Id
	if (id == null)
		node.id = nextNodeId++;
	else
		node.id = id;
	nodes.set(node.id, node);
	
	
	// Element
	node.elem = createNodeElem(node);
	elemNodes.set(node.elem, node);
	
	
	// Links
	node.ins = new Map();
	node.outs = new Map();
	
	
	// Position
	setNodePos(node, pos);
	
	
	// Editing
	startEditingNode(node);
	
	
	return node;
}




function deleteNode(node) {
	elemNodes.delete(node.elem);
	
	nodesDiv.removeChild(node.elem);
	
	for (let link of node.ins.values())
		deleteLink(link);
	for (let link of node.outs.values())
		deleteLink(link);
		
	selectedNodes.delete(node);
	
	nodes.delete(node.id);
}

function deleteSelectedNodes() {
	for (let node of selectedNodes)
		deleteNode(node);
}

function deleteAllNodes() {
	for (let node of nodes.values())
		deleteNode(node);
}





function setNodePos(node, pos) {
	node.elem.style.left = pos.x + 'px';
	node.elem.style.top = pos.y + 'px';
	
	node.mapPos = pos;
}




function startEditingNode(node) {
	stopEditing();
	
	selectOnlyNode(node);
	
	node.elem.contentEditable = true;
	node.elem.focus();
	
	richText.selectAll();
}



function selectNode(node) {
	node.elem.classList.toggle('selected', true);
	
	node.selected = true;
	
	selectedNodes.add(node);
}

function unselectNode(node) {
	node.elem.classList.toggle('selected', false);

	node.selected = false;
	
	selectedNodes.delete(node);
}

function toggleNodeSelection(node) {
	if (node.selected)
		unselectNode(node);
	else
		selectNode(node);
}

function performNodeSelection(nodes, canReset) {
	if (event.ctrlKey) {
		for (let node of nodes.values())
			toggleNodeSelection(node);
		return;
	}
	
	
	if (canReset && !event.shiftKey) {
		for (let node of nodes.values()) {
			if (!node.selected) {
				unselectAll();
				break;
			}
		}
	}
	
	
	for (let node of nodes.values())
		selectNode(node);
}

function unselectAllNodes() {
	for (let node of selectedNodes)
		unselectNode(node);
}

function selectOnlyNode(node) {
	unselectAll();
	
	selectNode(node);
}

function selectAllNodes() {
	for (let node of nodes.values())
		selectNode(node);
}

function getOnlySelectedNode() {
	if (selectedNodes.size === 1 && selectedLinks.size === 0)
		return selectedNodes.values().next().value;
}





function getNodeMapSize(node) {
	return Vec2(node.elem.offsetWidth, node.elem.offsetHeight);
}
function getNodeScreenSize(node) {
	return mapToScreenVec(getNodeMapSize(node));
}
function getNodeScreenRect(node) {
	let screenPos = mapToScreenPos(node.mapPos);
	let screenSize = getNodeScreenSize(node);
	
	let screenRect = {};
	
	screenRect.left = screenPos.x - screenSize.x / 2;
	screenRect.top = screenPos.y - screenSize.y / 2;
	screenRect.width = screenSize.x;
	screenRect.height = screenSize.y;
	screenRect.right = screenRect.left + screenRect.width;
	screenRect.bottom = screenRect.top + screenRect.height;
	
	return screenRect;
}






function updateNodeLinks(node) {
	for (let link of node.ins.values())
		updateLink(link);
	for (let link of node.outs.values())
		updateLink(link);
}






function getNodeEdgePoint(node, srcPos) {
	let dir = srcPos.sub(node.mapPos);
	let half = getNodeMapSize(node).div(2);
	
	if (dir.x === 0)
		return node.mapPos.add(0, half.y * Math.sign(dir.y));
	
	let dirSlope = Math.abs(dir.y / dir.x);
	let sizeSlope = half.y / half.x;
	
	if (dirSlope < sizeSlope) {
		let relEdgePoint = dir.div(Math.abs(dir.x)).mult(half.x);
		
		return node.mapPos.add(relEdgePoint);
	} else {
		let relEdgePoint = dir.div(Math.abs(dir.y)).mult(half.y);
	
		return node.mapPos.add(relEdgePoint);
	}
}