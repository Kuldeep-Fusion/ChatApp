import http from "http";
import app from './src/app.js';
import { initSocket } from "./src/socket/index.js";
import ConnectDB from './config/MongoDb.js'

const server = http.createServer(app);       // pehle http server banao
console.log(server.constructor.name);        // "Server" print hona chahiye
const io = initSocket(server);               // app nahi, server pass karo

await ConnectDB();
app.set("io", io);
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
});