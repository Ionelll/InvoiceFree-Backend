const app = require("./app");

const server = app.listen(process.env.PORT || 3000);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
