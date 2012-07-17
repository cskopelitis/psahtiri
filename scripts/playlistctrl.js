function addToPlaylist(title, embedUrl) {
	var htmlTable = document.getElementById('playlist');
	var nextIndex = (htmlTable.rows.length - 1) / 2;

	var html = '';
	html += '<tr>';
	html += '<td rowspan="2">' + ++nextIndex + '.</td>';

	html += '<td><iframe width="200px" src="'
			+ embedUrl
			+ '" frameborder="0" mozallowfullscreen allowFullScreen onended="alert(\'TELOS\');"></iframe></td>';

	html += '</tr>';
	html += '<tr>';
	html += '<td style="border-bottom: 1px solid #9AC336">' + title;
	html += '</td>';
	html += '</tr>';

	$('#playlist').append(html);
}