var SearchBox = {};

SearchBox.search = function(queryString, startIndex) {
	$('#loading').css('display', 'inline');
	$('#results tr').remove();
	JsonClient.get(buildQuery(queryString, startIndex), ResultsBox.onResponse);
};

SearchBox.onKeyDown = function(event) {
	event = event || window.event;
	var keyCode = event.keyCode;

	if (keyCode == 13) { // enter
		SearchBox.search(document.getElementById('q').value, 1);
	}
};

var ResultsBox = {};

ResultsBox.onResponse= function(results, textStatus, jqXHR) {
	$('#loading').css('display', 'none');
	ResultsBox.drawHeader(results);
	$.each(results.items, function(index, val) {
		if (isVideo(val)) {
			ResultsBox.drawItem(val);
		}
	});
	ResultsBox.drawFooter(results);
};

ResultsBox.drawHeader = function(results) {
	$('#result-statistics i').remove();
	var numResults = results.searchInformation.formattedTotalResults;
	var resultsTime = results.searchInformation.formattedSearchTime;
	$('#result-statistics').append(
			'<i>' + numResults + ' results in ' + resultsTime + ' sec</i>');
};

ResultsBox.drawItem = function(item) {
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
};

ResultsBox.drawFooter = function(results) {
	var pagesJqEl = $('#results-pages');
	pagesJqEl.empty();

	var current = results.queries['request'][0];
	var next = results.queries['nextPage'][0];
	var previous = results.queries['previousPage'];

	if (previous) {
		previous = previous[0];
		pagesJqEl.append(pageInfoToAhref(previous, '<') + '&nbsp;', previous);
	}

	var pageNumber = Math.floor(current.startIndex / current.count);
	pagesJqEl
			.append('<b style="font-size:40px">' + ++pageNumber + '&nbsp;</b>');

	// TODO too slow; figure out why
	// for ( var pageIndex = pageNumber; pageIndex < pageNumber + 10;
	// pageNumber++) {
	// var searchTerms = current.searchTerms;
	// var startIdx = (pageIndex * current.count) + 1;
	// pagesJqEl.append(pageInfoToAhref({
	// 'searchTerms' : searchTerms,
	// 'startIndex' : startIdx
	// }, pageIndex) + '&nbsp;');
	// }
	pagesJqEl.append(pageInfoToAhref(next, '>') + '&nbsp;');
};