// Express boilerplate, hosting the `dist` file, connecting to the routes

import app from "./app.js";
import http from "http";

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server started on port", port);
});
