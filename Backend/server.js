import ConnectDB from "./config/MongoDb.js";
import app from "./src/app.js"

ConnectDB();

app.listen(3000, () => console.log('server is listening  Port: 3000'));