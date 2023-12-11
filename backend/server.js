const app = require("./app");
const http = require("http");

const server = http.createServer(app).listen(process.env.PORT || 3000);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
