var Playlist = {};

Playlist.items = Array();

Playlist.add = function(title, embedUrl) {
	var playlistItem = {
		title : title,
		embedUrl : embedUrl
	};
	itemIndex = Playlist.items.push(playlistItem);
	Playlist.drawItem(itemIndex, playlistItem);
};

Playlist.draw = function() {
	$('#playlist tr').remove();
	$('#playlist').append('<tr><td><H2>Playlist</H2></td></tr>');

	$.each(Playlist.items, function(itemIndex, item) {
		Playlist.drawItem(itemIndex, item);
	});
};

Playlist.drawItem = function(itemIndex, playlistItem) {
	html = '<tr id="item' + itemIndex + '">';
	html += '<td rowspan="2"><iframe width="120px" height="90px" src="'
			+ playlistItem.embedUrl
			+ '" frameborder="0" mozallowfullscreen allowFullScreen"></iframe></td>';
	html += '<td style="text-align:right;">';
	html += '<img style="cursor:pointer" src="images/trash.gif" onclick="Playlist.remove('
			+ itemIndex + ');"/>';
	html += '</td>';
	html += '</tr><tr>';
	html += '<td style="border-bottom: 1px solid #9AC336">'
			+ playlistItem.title;
	html += '</td>';
	html += '</tr>';

	$('#playlist').append(html);
};

Playlist.remove = function(itemIndex) {
	Playlist.items.splice(itemIndex, 1);
	Playlist.draw();
};