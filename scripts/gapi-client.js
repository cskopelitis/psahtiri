var GAPIKEY = 'AIzaSyD0JKAnX-V_gHFVCmFAT280nNabDjFEaQU';
var GCSEKEY = '015915445257339081583:eem8ou0pmbq';

function find(queryString) {
	// TODO URL encode request params?
	var requestUrl = 'https://www.googleapis.com/customsearch/v1?q='
			+ queryString + '&cx=' + GCSEKEY + '&filter=1&safe=medium&key='
			+ GAPIKEY;

	restGet(requestUrl, onResponse);
}

function onResponse(results, textStatus, jqXHR) {
	drawHeader(results);
	$('#results tr').remove();
	$.each(results.items, function(index, val) {
		if (isVideo(val)) {
			drawItem(val);
		}
	});
	drawFooter(results);
}

function drawHeader(results) {
	$('#result-statistics i').remove();
	var numResults = results.searchInformation.formattedTotalResults;
	var resultsTime = results.searchInformation.formattedSearchTime;
	$('#result-statistics').append(
			'<i>' + numResults + ' results in ' + resultsTime + ' sec</i>');
}

function drawItem(item) {
	var embedUrl = item.pagemap.videoobject[0].embedurl;
	if (embedUrl != null) {
		var thumbnail = item.pagemap.cse_thumbnail;
		var thumbnailImg = '';
		if (thumbnail) {
			thumbnailImg = thumbnail[0].src;
		}
		var innerHtml = '<tr>';
		innerHtml += '<td rowspan="2"><img style="height:64px" src="'
				+ thumbnailImg + '"/></td>';
		innerHtml += '<td><a href="">' + item.htmlTitle + '</a></td>';
		innerHtml += '<td><img src="images/add.png" style="cursor: pointer;height:32px" onclick="addToPlaylist(\''
				+ item.htmlTitle
				+ '\',\''
				+ buildEmbedUrl(item.displayLink, embedUrl) + '\')"/></td>';
		innerHtml += '</tr>';
		innerHtml += '<tr>';
		innerHtml += '<td>' + item.htmlSnippet + '</td>';
		innerHtml += '</tr>';
		$('#results').append(innerHtml);
	}
}

function buildEmbedUrl(source, embedUrl) {
	if (source == 'www.youtube.com') {
		embedUrl = embedUrl.replace('http://www.youtube.com/v/',
				'http://www.youtube.com/embed/');
	} else if (source == 'vimeo.com') {
		embedUrl = embedUrl.replace('http://vimeo.com/moogaloop.swf?clip_id=',
				'http://player.vimeo.com/video/');
	}
	return embedUrl;
}
function drawFooter(results) {
}

function isVideo(item) {
	return item.pagemap.videoobject != null;
}