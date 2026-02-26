import "dotenv/config";
import connectDB from "./src/config/db.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./src/socket/socket.js";

connectDB();
const port = process.env.PORT || 3000;

// create http server
const server = http.createServer(app);
// attach socket to server
initSocket(server);
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
