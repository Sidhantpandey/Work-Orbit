import http from "http";
import "dotenv/config";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Project from "./models/project.models.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

// Middleware to authenticate socket connections
io.use(async(socket, next) => {
  try {
    const token =
      socket.handshake.auth.token ||
      socket.handshake.headers.authorization?.split(" ")[1];
      // console.log(token)
    // as soon as socket connects it should also add to the room of the project
    const projectId = socket.handshake.query.projectId;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Project ID is invalid"));
    }

    socket.project=  await Project.findById(projectId);

    if(!socket.project){
      return next(new Error("Project not found"));
    }

    if (!token) {
      console.log("No token provided");
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication error"));
    }

    socket.user = decoded; // Attach user data to socket
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    next(new Error("Authentication error"));
  }
});

io.on("connection", socket => {
  
  console.log("Socket connected", socket.user);
  socket.roomId=socket.project._id.toString();


  socket.join(socket.roomId);
  
  socket.on("project-message",data=>{
    console.log(data);
    io.to(socket.roomId).emit("project-message",data);
  })


  socket.on("event", (data) => {});
  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
