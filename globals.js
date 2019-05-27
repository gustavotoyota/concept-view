let view = {};
view.zoom = 1;
view.mapPos = Vec2(0, 0);



let nodes = new Map();
let nextNodeId = 0;
let selectedNodes = new Set();
let elemNodes = new Map();



let links = new Set();
let nextLinkId = 0;
let selectedLinks = new Set();




// Panning
let panLast = null;
function isPanning() { return panLast != null; }

// Selecting
let selectionStart = null;
function isSelecting() { return selectionStart != null; }

// Dragging
let dragLast = null;
function isDragging() { return dragLast != null; }

// Linking
let linkSrc = null;
function isLinking() { return linkSrc != null; }