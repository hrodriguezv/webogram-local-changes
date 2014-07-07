#!/usr/bin/env node

var fs = require('fs');
var newFile = fs.createWriteStream("readme_copy.tar.gz");
var http = require('http');

http.createServer(function(request, response) {
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0;
	
	request.pipe(newFile);
	
	request.on('data', function(chunk) {
		uploadedBytes += chunk.length;
		var progress = (uploadedBytes / fileBytes) * 100;
		response.write("progress: " + parseInt(progress, 10) + "%\n");
	});
	
	request.on('end', function() {
	response.end('uploaded! \n');
	});
}).listen(8181);
