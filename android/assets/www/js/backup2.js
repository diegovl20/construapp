/**
 *
 * Phonegap sqlite backup plugin for Android
 * patadejaguar@gmail.com 2012
 *
 */
var ROOTH_PATH  = "/mnt/sdcard/";
var LocalBackup = function() {};
 
if( window.resolveLocalFileSystemURI ){
    window.resolveLocalFileSystemURI(ROOTH_PATH, function(dirEntry) {}, function(evt){ ROOTH_PATH  = "/mnt/extsd/"; });
}
LocalBackup.prototype.run = function(content, success, fail) {
    //fail    = (typeof fail != "function") ? function(){} : fail;
    //success = (typeof sucess != "function") ? function(){} : success;
    return cordova.exec( function(args) { successs(args);}, function(args) { fails(args);},
                        'LocalBackup', 'backup', [content]);

};
 
LocalBackup.prototype.restore = function(content, success, fail) {
    fail    = (typeof fail != "function") ? function(){} : fail;
    success = (typeof sucess != "function") ? function(){} : success;
    return cordova.exec( function(args) { success(args); }, function(args) { fail(args);},
                        'LocalBackup', 'restore', [content]);
};
 
if(!window.plugins) {
    window.plugins = {};
}

function successs(args){
 alert("DX");
}

function fails(args){
 alert("XD");
}