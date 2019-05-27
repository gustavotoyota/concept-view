function updateMapTransform() {
	map.style.transform = 'scale(' + view.zoom + ') translate(' + view.mapPos.x + 'px, ' + view.mapPos.y + 'px)';
}



function getScreenCenter() {
	return Vec2(display.offsetWidth, display.offsetHeight).div(2);
}



function screenToMapVec(screenVec) {
	return screenVec.div(view.zoom);
}
function mapToScreenVec(mapVec) {
	return mapVec.mult(view.zoom);
}



function screenToMapPos(screenPos) {
	return screenToMapVec(screenPos.sub(getScreenCenter())).sub(view.mapPos);
}
function mapToScreenPos(mapPos) {
	return mapToScreenVec(mapPos.add(view.mapPos)).add(getScreenCenter());
}



function getMouseScreenPos() {
	let rect = display.getBoundingClientRect();
	
	return Vec2(event.clientX - rect.left, event.clientY - rect.top);
}
function getMouseMapPos() {
	return screenToMapPos(getMouseScreenPos());
}