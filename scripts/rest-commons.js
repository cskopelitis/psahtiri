function restGet(url, successCallback) {
    restCall(url, 'GET', successCallback);
}

function restPost(url, jsonBody, successCallback) {
    restCallWithBody(url, 'POST', jsonBody, successCallback);
}

function restPut(url, jsonBody, successCallback) {
    restCallWithBody(url, 'PUT', jsonBody, successCallback);
}

function restDelete(url, successCallback) {
    restCall(url, 'DELETE', successCallback);
}

function restCall(url, method, successCallback) {
    $.ajax({
        url:url,
        type:method,
        dataType:'json',
        success:successCallback,
        error:onError,
        beforeSend:onBeforeSend
    });
}

function restCallWithBody(url, method, jsonBody, successCallback) {
    $.ajax({
        url:url,
        type:method,
        dataType:'json',
        data:JSON.stringify(jsonBody),
        success:successCallback,
        error:onError,
        beforeSend:onBeforeSend
    });
}

function onError(jqXHR, textStatus, errorThrown) {
    alert(errorThrown);
}

function onBeforeSend(jqXHR) {
    jqXHR.setRequestHeader('Accept', 'application/json');
    jqXHR.setRequestHeader('Content-Type', 'application/json');
}
