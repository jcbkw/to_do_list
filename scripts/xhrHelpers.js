
///**
// * Create a new ajax POST request.
// * 
// * Takes parameters. As argumments they are encoded and passed to the server.
// * 
// * Sends our post with one argument (payload).
// * 
// * Appends a callback function to an event listener "load" (complete)that has two parameters
// * - the first parameter is built in error handle
// * - the second parameter is a capture of the server's response 
// * 
// * returns the xhr object
// * 
// * @param {type} url
// * @param {type} params
// * @param {type} callback
// * @returns {XMLHttpRequest|xhrPost.xhr}
// * 

function xhrPost (url, params, callback) {
        
    var xhr = new XMLHttpRequest(),
        payload;

    xhr.open("POST", url, /*async*/true);

    xhr.addEventListener("load", function (event) {

        callback && callback.call(xhr, /*no error*/null, event.target.responseText);

    });

    xhr.addEventListener("error", function (error) {

        callback && callback.call(xhr, error);

    });

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (params) {

        payload = [];

        for (var i in params) {

            if (params.hasOwnProperty(i)) {

                payload.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

            }

        }

        xhr.send(payload.join("&"));        

    }
    else {

        xhr.send();        

    }

    return xhr;

}

function xhrGet (url, params, callback) {
        
    var xhr = new XMLHttpRequest(),
        payload;


    xhr.addEventListener("load", function (event) {

        callback && callback.call(xhr, /*no error*/null, event.target.responseText);

    });

    xhr.addEventListener("error", function (error) {

        callback && callback.call(xhr, error);

    });
    
    if (params) {

        payload = [];

        for (var i in params) {

            if (params.hasOwnProperty(i)) {

                payload.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

            }

        }

        url += '?' + payload.join("&");

    }

    xhr.open("GET", url, /*async*/true);
    xhr.send();        
    
    return xhr;

}

function xhrGetJson (url, params, callback) {
    
    xhrGet(url, params, function (error, text) {
        
        if (error) {
            
            callback && callback.call(this, error);
            
            return;
                        
        }
        
        try {

            var parsedData = JSON.parse(text);
            
            callback && callback.call(this, /*no error*/null, parsedData);

        }
        catch (e) {

            callback && callback.call(this, e);

        }
        
    });
        
}