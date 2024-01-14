const express = require("express");
const cors = require("cors");
const {connectDB} = require("./config/dbconfig");
require("dotenv").config();

const organizer = require("./routes/OrganizerRoutes");
const member = require("./routes/MemberRoutes");
const category = require("./routes/EventCategoryRoutes");
const event = require("./routes/EventRoutes");
const relation = require("./routes/EventMemberRelRoutes");

const app = express();
const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(cors());

app.get("/hi", async (req, res) => {});

io.on("connection", (socket) => {
  socket.on("sendMessage", (message, callback) => {
    console.log("Received");
  });
  console.log("a user connected");
});

app.use("/organizer", organizer);
app.use("/member", member);
app.use("/category", category);
app.use("/event", event);
app.use("/relation", relation);

//scripts to start the server
const startServer = async function () {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      // console.log(process.env.URI, process.env.PORT)
      console.log("Server is running on port :", port);
    });
  } catch (error) {
    console.log("Error in starting the server .");
  }
};

startServer();
