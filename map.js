function genMapData() {
	let mapData = {};
	
	mapData.view = {};
	mapData.view.zoom = view.zoom;
	mapData.view.mapPos = view.mapPos;
	
	mapData.nodes = {};
	mapData.nodes.list = [];
	for (let node of nodes.values()) {
		let nodeData = {};
		
		nodeData.id = node.id;
		
		nodeData.mapPos = node.mapPos;
		
		nodeData.html = node.elem.innerHTML;
		
		mapData.nodes.list.push(nodeData);
	}
	mapData.nodes.nextId = nextNodeId;
	
	
	mapData.links = {};
	mapData.links.list = [];
	for (let link of links) {
		let linkData = {};
		
		linkData.id = link.id;
		
		linkData.srcNodeId = link.srcNode.id;
		linkData.destNodeId = link.destNode.id;
		
		linkData.labelHTML = link.labelElem.innerHTML;
		
		mapData.links.list.push(linkData);
	}
	mapData.links.nextId = nextLinkId;
	
	return mapData;
}

function loadMapData(mapData) {
	// Copy view
	view.zoom = mapData.view.zoom;
	view.mapPos = Vec2(mapData.view.mapPos);
	
	// Create nodes
	for (let nodeData of mapData.nodes.list) {
		let node = createNode(Vec2(nodeData.mapPos), nodeData.id);
		
		node.elem.innerHTML = nodeData.html;
	}
	nextNodeId = mapData.nodes.nextId;
	
	// Create links
	for (let linkData of mapData.links.list) {
		let link = createLink(
			nodes.get(linkData.srcNodeId),
			nodes.get(linkData.destNodeId),
			linkData.id
		);
		
		link.labelElem.innerHTML = linkData.labelHTML;
	}
	nextLinkId = mapData.links.nextId;
}





function saveMap() {
	let mapData = genMapData();
	
	let jsonMapData = JSON.stringify(mapData, null, 4);
	
	downloadFile('concept.json', jsonMapData);
}

function loadMap(jsonMapData) {
	deleteAllNodes();
	
	
	let mapData = JSON.parse(jsonMapData);
	
	loadMapData(mapData);
	
	
	// Unselect and stop editing
	stopEditing();
	unselectAll();
	
	
	// Update map transformation
	updateMapTransform();
}