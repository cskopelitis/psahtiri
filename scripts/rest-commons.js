/**
 * Generic JSON RESTful client.
 * 
 * @author cskopelitis
 */
var JsonClient = {};

JsonClient.get = function(url, successCallback) {
	JsonClient.restCall(url, 'GET', successCallback);
};

JsonClient.post = function(url, jsonBody, successCallback) {
	JsonClient.restCallWithBody(url, 'POST', jsonBody, successCallback);
};

JsonClient.put = function(url, jsonBody, successCallback) {
	JsonClient.restCallWithBody(url, 'PUT', jsonBody, successCallback);
};

JsonClient.del = function(url, successCallback) {
	JsonClient.restCall(url, 'DELETE', successCallback);
};

/**
 * @param method
 *            GET, POST, PUT, DELETE
 */
JsonClient.restCall = function(url, method, successCallback) {
	$.ajax({
		url : url,
		type : method,
		dataType : 'json',
		success : successCallback,
		error : JsonClient.onError,
		beforeSend : JsonClient.onBeforeSend
	});
};

JsonClient.restCallWithBody = function(url, method, jsonBody, successCallback) {
	$.ajax({
		url : url,
		type : method,
		dataType : 'json',
		data : JSON.stringify(jsonBody),
		success : successCallback,
		error : JsonClient.onError,
		beforeSend : JsonClient.onBeforeSend
	});
};

JsonClient.onError = function(jqXHR, textStatus, errorThrown) {
	alert(errorThrown);
};

JsonClient.onBeforeSend = function(jqXHR) {
	jqXHR.setRequestHeader('Accept', 'application/json');
	jqXHR.setRequestHeader('Content-Type', 'application/json');
};
