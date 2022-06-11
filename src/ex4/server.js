// Express boilerplate, hosting the `dist` file, connecting to the routes

import { app } from "./app";
import { http } from "htpp";

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server started on port", port);
});
