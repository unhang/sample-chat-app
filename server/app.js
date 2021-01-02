var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());


var server = app.listen(3000, () =>
  console.log("server is running on port 3000")
);

app.use(express.static("public"));

var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("chat", (data) => {
    console.log(data);
  });

  socket.on('chat', (data) => {
    console.log(data)
    io.sockets.emit('chat', data);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
