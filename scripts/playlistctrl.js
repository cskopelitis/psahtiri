var Playlist = {};

Playlist.items = Array();

Playlist.add = function(title, embedUrl) {
	var playlistItem = {
		title : title,
		embedUrl : embedUrl
	};
	Playlist.items.push(playlistItem);
	Playlist.drawItem(playlistItem);
};

Playlist.drawItem = function(playlistItem) {
	// var itemIndex = Playlist.items.indexOf(playlistItem);
	html = '<tr>';
	html += '<td rowspan="2"><iframe width="120px" height="90px" src="'
			+ playlistItem.embedUrl
			+ '" frameborder="0" mozallowfullscreen allowFullScreen"></iframe></td>';
	html += '<td style="text-align:right;">';
	html += '<img style="cursor:pointer" src="images/trash.gif" onclick="alert(\'delete this\')";/>';
	html += '</td>';
	html += '</tr><tr>';
	html += '<td style="border-bottom: 1px solid #9AC336">'
			+ playlistItem.title;
	html += '</td>';
	html += '</tr>';

	$('#playlist').append(html);
};