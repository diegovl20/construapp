window.shortToast = function(str, callback) {   
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "ToastPlugin", "shortToast", [ str ]);
};

window.longToast = function(str, callback) {
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "ToastPlugin", "longToast", [ str ]);
};