/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var path = require("path");
var mimeTypes = {
    "htm": "text/html",
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "js": "text/javascript",
    "css": "text/css"};
module.exports = {
	get: function(req, res){
        var uri = req.param('uri');
        var filename = process.cwd()+"/uploads/"+uri;
        console.log(filename);
        fs.exists(filename, function(exists) {
            if(!exists) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end();
                return;
            }
            if (fs.statSync(filename).isDirectory()) 
                return;
            fs.readFile(filename, "binary", function(err, file) {
                if(err) {        
                res.end();
                return;
                }
                var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
                res.writeHead(200, {"Content-Type": mimeType});
                res.write(file, "binary");
                res.end();
            });
        });
        
        
    }
};

