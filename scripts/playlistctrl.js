var Playlist = {};

Playlist.items = Array();

Playlist.add = function(title, embedUrl) {
	var playlistItem = {
		title : unescape(title),
		embedUrl : embedUrl
	};
	itemIndex = Playlist.items.push(playlistItem);
	Playlist.drawItem(itemIndex, playlistItem);
};

Playlist.draw = function() {
	$('#playlist div').remove();
	$('#playlist')
			.append('<div class="playlist-title"><H2>Playlist</H2></div>');

	$.each(Playlist.items, function(itemIndex, item) {
		Playlist.drawItem(itemIndex, item);
	});
};

Playlist.drawItem = function(itemIndex, playlistItem) {
	html = '<div class="playlist-item" id="pli' + itemIndex
			+ '" onmouseover="Playlist.onMouseOver(' + itemIndex
			+ ');" onmouseout="Playlist.onMouseOut(' + itemIndex + ');">';
	html += '<table cellspacing="2">';
	html += '<tr>';
	html += '<td style="height:95px" rowspan="2"><iframe height="90px" frameborder="0" width="120px" allowfullscreen="" mozallowfullscreen="" src="'
			+ playlistItem.embedUrl + '"></iframe></td>';
	html += '<td style="text-align:right;height:25px;color:white">dummy<img onclick="Playlist.remove('
			+ itemIndex
			+ ');" src="images/trash.png" style="cursor:pointer;display:none;"></td>';
	html += '</tr>';
	html += '<tr>';
	html += '<td style="height:70px">' + playlistItem.title + '</td>';
	html += '</tr>';
	html += '</table>';
	html += '</div>';

	$('#playlist').append(html);
};

Playlist.remove = function(itemIndex) {
	Playlist.items.splice(itemIndex, 1);
	$('#pli' + itemIndex).remove();
};

Playlist.onMouseOver = function(index) {
	$('#pli' + index).find('img').first().css('display', 'inline');
};

Playlist.onMouseOut = function(index) {
	$('#pli' + index).find('img').first().css('display', 'none');
};