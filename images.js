let observer = new MutationObserver(function (mutations) {
	for (let mutation of mutations) {
		if (mutation.type !== 'childList')
			continue;
		
		for (let elem of mutation.addedNodes)
			initElemImages(elem);
	}
});

function initElemImages(elem) {
	for (let child of elem.childNodes)
		initElemImages(child);
	
	if (!(elem instanceof HTMLImageElement))
		return;
	
	elem.addEventListener('load', () => {
		updateNodeLinks(getElemNode(elem));
	});
}

observer.observe(map, {
	attributes: false,
	characterData: true,
	childList: true,
	subtree: true,
	attributeOldValue: false,
	characterDataOldValue: false
});