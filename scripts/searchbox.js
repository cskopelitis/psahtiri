function onKeyDown(event) {
	event = event || window.event;
	var keyCode = event.keyCode;

	if (keyCode == 13) { // enter
		find(document.getElementById('q').value);
	}
}