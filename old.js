//Generally the module name and the variable name both are same
const http = require("http");

var fs = require("fs");

http
  .createServer(function(req, res) {
    console.log("request: " + req.url);

    if (req.url === "/home" || req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/HTML" });

      var myReadStream = fs.createReadStream(__dirname + "/index.html", "utf8");
      myReadStream.pipe(res);
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });

      res.end("404 not ");
    }

    //res.write("Hello World!"); //write a response to the client
    //res.end(); //end the response
  })
  .listen(8080, "127.0.0.1"); //the server object listens on port 8080
