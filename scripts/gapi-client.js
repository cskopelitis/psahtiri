function buildQuery(queryString, start) {
	return 'https://www.googleapis.com/customsearch/v1?q=' + queryString
			+ '&cx=' + GCSEKEY + '&filter=1&safe=medium&start=' + start
			+ '&key=' + GAPIKEY;
}

function search(queryString, startIndex) {
	restGet(buildQuery(queryString, startIndex), onResponse);
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
		innerHtml += '<td><img src="images/add.png" style="cursor: pointer;height:32px" onclick="Playlist.add(\''
				+ escape(item.htmlTitle)
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
	$('#results-pages').empty();

	var current = results.queries['request'][0];
	var next = results.queries['nextPage'][0];
	var previous = results.queries['previousPage'];

	var html = '';
	if (previous) {
		previous = previous[0];
		html += pageInfoToAhref(previous, '<') + '&nbsp;';
	}

	var pageNumber = Math.floor(current.startIndex / current.count);
	html += '<b style="font-size:40px">' + pageNumber + '&nbsp;</b>';

	for ( var pageIndex = pageNumber + 1; pageIndex < pageNumber + 10; pageNumber++) {
		var searchTerms = current.searchTerms;
		var startIdx = (pageIndex * current.count) + 1;
		html += pageInfoToAhref({
			'searchTerms' : searchTerms,
			'startIndex' : startIdx
		}, pageIndex) + '&nbsp;';
	}
	html += pageInfoToAhref(next, '>') + '&nbsp;';

	$('#results-pages').append(html);
}

function pageInfoToAhref(pageInfo, title) {
	return '<span style="cursor:pointer" onclick="search(\''
			+ pageInfo.searchTerms + '\',' + pageInfo.startIndex + ')">'
			+ title + '</span>';
}

function isVideo(item) {
	return item.pagemap.videoobject != null;
}