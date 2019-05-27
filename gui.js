let richText = new RichText(document);
richText.toggleCSS();

left.addEventListener('click', () => { richText.justifyLeft(); });
center.addEventListener('click', () => { richText.justifyCenter(); });
right.addEventListener('click', () => { richText.justifyRight(); });
full.addEventListener('click', () => { richText.justifyFull(); });

bold.addEventListener('click', () => { richText.toggleBold(); });
italic.addEventListener('click', () => { richText.toggleItalic(); });
underline.addEventListener('click', () => { richText.toggleUnderline(); });
strike.addEventListener('click', () => { richText.toggleStrike(); });

subscript.addEventListener('click', () => { richText.subscript(); });
superscript.addEventListener('click', () => { richText.superscript(); });

ordered.addEventListener('click', () => { richText.insertOrderedList(); });
unordered.addEventListener('click', () => { richText.insertUnorderedList(); });

link.addEventListener('click', () => { richText.createLink(prompt('URL:', '')); });
rule.addEventListener('click', () => { richText.insertRule(); });
image.addEventListener('click', () => { richText.insertImage(prompt('URL:', '')); });
html.addEventListener('click', () => { richText.insertHTML(prompt('HTML:', '')); });

load.addEventListener('change', () => {
	let reader = new FileReader();
	
	reader.onload = function () {
		loadMap(reader.result);
	};
	
	reader.readAsText(load.files[0]);
	
	load.value = '';
});
save.addEventListener('click', () => { saveMap(); });


function onUpdate() {
	left.classList.toggle('down', richText.checkJustifyLeft());
	center.classList.toggle('down', richText.checkJustifyCenter());
	right.classList.toggle('down', richText.checkJustifyRight());
	full.classList.toggle('down', richText.checkJustifyFull());
	
	bold.classList.toggle('down', richText.checkBold());
	italic.classList.toggle('down', richText.checkItalic());
	underline.classList.toggle('down', richText.checkUnderline());
	strike.classList.toggle('down', richText.checkStrike());
	
	subscript.classList.toggle('down', richText.checkSubscript());
	superscript.classList.toggle('down', richText.checkSuperscript());
	
	let selectedNode = getOnlySelectedNode();
	if (selectedNode)
		updateNodeLinks(selectedNode);
}