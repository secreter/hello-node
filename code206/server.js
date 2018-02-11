/**
 * https://www.oschina.net/translate/http-partial-content-in-node-js?lang=chs&page=1#
 * HTTP 的 206 Partial Content 状态码和其相关的消息头提供了让浏览器以及其他用户代理从服务器接收部分
 * 内容而不是全部内容，这样一种机制. 这一机制被广泛使用在一个被大多数浏览器和诸如Windows Media Player和VLC Player这样的播放器所支持视频文件的传输上.
 */
// 初始化需要的对象
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

// 初始的目录，随时可以改成你希望的目录
var initFolder = __dirname;

// 将我们需要的文件扩展名和MIME名称列出一个字典
var mimeNames = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "application/javascript",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".ogg": "application/ogg", 
    ".ogv": "video/ogg", 
    ".oga": "audio/ogg",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".webm": "video/webm"
};

// 第一步：创建一个简单的HTTP服务器
http.createServer(httpListener).listen(8000);

function httpListener (request, response) {
    console.log(request.method, '  ',request.url)
    // 我们将只接受GET请求，否则返回405 'Method Not Allowed'
    if (request.method != "GET") { 
        sendResponse(response, 405, {"Allow" : "GET"}, null);
        return null;
    }

    var filename = 
        initFolder + url.parse(request.url, true, true).pathname.split('/').join(path.sep);
    console.log(filename)
    var responseHeaders = {};
    
    // 检查文件是否存在，不存在就返回404 Not Found
    if (!fs.existsSync(filename)) {
        sendResponse(response, 404, null, null);
        return null;
    }
    var stat = fs.statSync(filename);
    if(stat.isDirectory()){
        sendResponse(response, 404, null, null);
        return null;
    }
    //存在range header
    var rangeRequest = readRangeHeader(request.headers['range'], stat.size);
    if(rangeRequest){
        var start = rangeRequest.Start;
        var end = rangeRequest.End;
        // If the range can't be fulfilled. 
        if (start >= stat.size || end >= stat.size) {
            // Indicate the acceptable range.
            responseHeaders['Content-Range'] = 'bytes */' + stat.size; // File size.

            // Return the 416 'Requested Range Not Satisfiable'.
            sendResponse(response, 416, responseHeaders, null);
            return null;
        }else{
            // Indicate the current range. 
            responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
            responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
            responseHeaders['Content-Type'] = getMimeNameFromExt(path.extname(filename));
            responseHeaders['Accept-Ranges'] = 'bytes';
            responseHeaders['Cache-Control'] = 'no-cache';

            // Return the 206 'Partial Content'.
            sendResponse(response, 206, responseHeaders, fs.createReadStream(filename, { start: start, end: end }));
            return
        }
    }

    responseHeaders["Content-Type"] = getMimeNameFromExt(path.extname(filename));
    responseHeaders["Content-Length"] = stat.size; // 文件大小
        
    sendResponse(response, 200, responseHeaders, fs.createReadStream(filename));
}

function sendResponse(response, responseStatus, responseHeaders, readable) {
    response.writeHead(responseStatus, responseHeaders);

    if (readable == null)
        response.end();
    else
        readable.on("open", function () {
            readable.pipe(response);
        });

    return null;
}

function getMimeNameFromExt(ext) {
    var result = mimeNames[ext.toLowerCase()];
    
    // 最好给一个默认值
    if (result == null)
        result = "application/octet-stream";
    
    return result;
}


// 步骤 2 - 使用正则表达式捕获Range消息头
function readRangeHeader(range, totalLength) {
        /*
         * Example of the method &apos;split&apos; with regular expression.
         * 
         * Input: bytes=100-200
         * Output: [null, 100, 200, null]
         * 
         * Input: bytes=-200
         * Output: [null, null, 200, null]
         */

    if (range == null || range.length == 0)
        return null;

    var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
    var start = parseInt(array[1]);
    var end = parseInt(array[2]);
    var result = {
        Start: isNaN(start) ? 0 : start,
        End: isNaN(end) ? (totalLength - 1) : end
    };
    
    if (!isNaN(start) && isNaN(end)) {
        result.Start = start;
        result.End = totalLength - 1;
    }

    if (isNaN(start) && !isNaN(end)) {
        result.Start = totalLength - end;
        result.End = totalLength - 1;
    }

    return result;
}

//步骤 3 - 检查数据范围是否合理