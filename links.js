function createLink(srcNode, destNode, id) {
	let link = {};
	
	// Id
	if (id == null)
		link.id = nextLinkId++;
	else
		link.id = id;
	
	
	// Nodes
	link.srcNode = srcNode;
	link.destNode = destNode;
	
	srcNode.outs.set(destNode.id, link);
	destNode.ins.set(srcNode.id, link);
	
	
	// Arrow	
	link.arrowElem = createArrowElem(link);
	
	
	// Label
	link.labelElem = createLabelElem(link);
	
	
	updateLink(link);
	
	
	links.add(link);
	
	
	return link;
}

function createArrowElem(link) {
	let arrowElem = auxArrow.cloneNode(true);
	
	arrowElem.id = '';
	
	arrowElem.children[0].children[0].id = 'arrow' + link.id
	arrowElem.children[1].style.markerEnd = 'url(#arrow' + link.id + ')';
	
	arrowElem.style.display = '';

	arrowsDiv.appendChild(arrowElem);
	
	return arrowElem;
}

function createLabelElem(link) {
	let labelElem = document.createElement('div');
	
	
	// Class
	labelElem.classList.add('label');
	
	
	labelElem.addEventListener('dblclick', function () {
		event.stopPropagation();
		
		startEditingLink(link);
	});
	
	labelElem.addEventListener('mousedown', function () {
		// Propagate all non-LMB events
		if (event.button !== 0)
			return;
		// Steal all LMB events
		event.stopPropagation();
		
		
		// If editing, do nothing
		if (labelElem.contentEditable === 'true')
			return;
			
		
		// Not editing, stop other edits
		stopEditing();
		
		
		// Selection
		performLinkSelection([link], true);
	});
	
	nodesDiv.appendChild(labelElem);
	
	return labelElem;
}

function setArrowPoints(arrowElem, srcPos, destPos) {
	let absStart = srcPos.min(destPos);
	let absEnd = srcPos.max(destPos);
	
	absStart.x -= 7;
	absStart.y -= 7;
	
	absEnd.x += 7;
	absEnd.y += 7;
	
	let size = absEnd.sub(absStart);
	
	arrowElem.style.width = size.x;
	arrowElem.style.height = size.y;
	
	arrowElem.style.left = absStart.x;
	arrowElem.style.top = absStart.y;
	
	let relSrc = srcPos.sub(absStart);
	let relDest = destPos.sub(absStart);
	
	let d = 'M' + relSrc.x + ',' + relSrc.y
		+ ' L' + relDest.x + ',' + relDest.y;
	
	arrowElem.children[1].setAttribute('d', d);
}

function updateLink(link) {
	// Arrow
	let srcEdgePoint = getNodeEdgePoint(link.srcNode, link.destNode.mapPos);
	let destEdgePoint = getNodeEdgePoint(link.destNode, link.srcNode.mapPos);
	setArrowPoints(link.arrowElem, srcEdgePoint, destEdgePoint);
	
	// Label
	let labelPos = srcEdgePoint.mix(destEdgePoint, 0.5);
	
	link.labelElem.style.left = labelPos.x;
	link.labelElem.style.top = labelPos.y;
}

function showAuxArrow() {
	auxArrow.style.display = "";
}
function hideAuxArrow() {
	auxArrow.style.display = "none";
}



function startEditingLink(link) {
	stopEditing();

	link.labelElem.contentEditable = true;
	link.labelElem.focus();
}




function selectLink(link) {
	link.labelElem.classList.toggle('selected', true);
	
	link.selected = true;
	
	selectedLinks.add(link);
}

function unselectLink(link) {
	link.labelElem.classList.toggle('selected', false);
	
	link.selected = false;
	
	selectedLinks.delete(link);
}

function toggleLinkSelection(link) {
	if (link.selected)
		unselectLink(link);
	else
		selectLink(link);
}

function performLinkSelection(links, canReset) {
	if (event.ctrlKey) {
		for (let link of links)
			toggleLinkSelection(link);
		return;
	}
	
	
	if (canReset && !event.shiftKey) {
		for (let link of links) {
			if (!link.selected) {
				unselectAll();
				break;
			}
		}
	}
	
	
	for (let link of links)
		selectLink(link);
}

function unselectAllLinks() {
	for (let link of selectedLinks)
		unselectLink(link);
}

function linksIntersectingSelectArea(selectionEnd) {
	let intersecting = new Set();

	let rect = getSelectAreaRect(selectionEnd);

	for (let link of links)
		if (rectsIntersect(rect, getLinkScreenRect(link)))
			intersecting.add(link);
			
	return intersecting;
}

function selectAllLinks() {
	for (let link of links)
		selectLink(link);
}

function getOnlySelectedLink() {
	if (selectedNodes.size === 0 && selectedLinks.size === 1)
		return selectedLinks.values().next().value;
}




function deleteLink(link) {
	arrowsDiv.removeChild(link.arrowElem);
	
	nodesDiv.removeChild(link.labelElem);

	link.srcNode.outs.delete(link.destNode.id);
	link.destNode.ins.delete(link.srcNode.id);
	
	selectedLinks.delete(link);
	
	links.delete(link);
}

function deleteSelectedLinks() {
	for (let link of selectedLinks)
		deleteLink(link);
}

function deleteAllLinks() {
	for (let link of links)
		deleteLink(link);
}






function getLinkMapPos(link) {
	let srcEdgePoint = getNodeEdgePoint(link.srcNode, link.destNode.mapPos);
	let destEdgePoint = getNodeEdgePoint(link.destNode, link.srcNode.mapPos);
	
	return srcEdgePoint.mix(destEdgePoint, 0.5)
}

function getLinkScreenPos(link) {
	return mapToScreenPos(getLinkMapPos(link));
}

function getLinkMapSize(link) {
	return Vec2(link.labelElem.offsetWidth, link.labelElem.offsetHeight);
}
function getLinkScreenSize(link) {
	return mapToScreenVec(getLinkMapSize(link));
}

function getLinkScreenRect(link) {
	let screenPos = getLinkScreenPos(link);
	let screenSize = getLinkScreenSize(link);
	
	let screenRect = {};
	
	screenRect.left = screenPos.x - screenSize.x / 2;
	screenRect.top = screenPos.y - screenSize.y / 2;
	screenRect.width = screenSize.x;
	screenRect.height = screenSize.y;
	screenRect.right = screenRect.left + screenRect.width;
	screenRect.bottom = screenRect.top + screenRect.height;
	
	return screenRect;
}