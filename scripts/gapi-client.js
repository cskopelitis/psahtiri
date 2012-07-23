function buildQuery(queryString, start) {
	return 'https://www.googleapis.com/customsearch/v1?q=' + queryString
			+ '&cx=' + GCSEKEY + '&filter=1&safe=medium&start=' + start
			+ '&key=' + GAPIKEY;
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

function pageInfoToAhref(pageInfo, title, hide) {
	return '<span style="cursor:pointer;color:' + (!hide ? 'inherit' : 'white')
			+ '" onclick="SearchBox.search(\'' + pageInfo.searchTerms + '\','
			+ pageInfo.startIndex + ')">' + title + '</span>';
}

function isVideo(item) {
	return item.pagemap.videoobject != null;
}