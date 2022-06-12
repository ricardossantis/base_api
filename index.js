require("dotenv").config();
const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const schema = require("./schema");

require("./config/Database");

const index = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

schema.applyMiddleware({
  app,
});

app.use(bodyParser.json());

app.use("/", index);

const portSettings = process.env.PORT || 9001;
app.listen(portSettings, () => {
  console.log(`Server is Running on port ${portSettings}`);
});

//websocket
// const mongoose = require("./config/Database");
// const cron = require("node-cron");
// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ port: 8000 });

// // data base timeout request to send socket notification
// mongoose.connection.on("open", function (ref) {
//   console.log("connected to the mongo server");

//   cron.schedule("*/30 * * * *", () => {
//     console.log("running a task every 30minutes");
//     requestAndSend();
//   });
// });

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message, message.length);
//       let parsed = JSON.parse(message);
//   });
// });


