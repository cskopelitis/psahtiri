function onKeyDown(event) {
	event = event || window.event;
	var keyCode = event.keyCode;

	if (keyCode == 13) { // enter
		search(document.getElementById('q').value, 1);
	}
}