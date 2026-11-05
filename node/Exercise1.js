const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    console.log("You used method:", req.method);

    console.log("url:", req.url);
    console.log("httpVersion:",req.httpVersion);
    res.end("Hello from Node Server!");
    res.end(JSON.stringify(req.headers));

}).listen(3000,()=> {
  console.log("Server is running on port 3000");
})



server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
