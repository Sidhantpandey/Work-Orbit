import socket from "socket.io-client";

let socketInstance = null;

export const socketInitialize = (projectId) => {
  console.log("Initializing socket");
  socketInstance = socket(import.meta.env.VITE_API_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
    query:{
      projectId
    }
  });
  console.log("Socket initialized");
  return socketInstance;
};


export const receiveMessage = (eventname, cb) => {
  socketInstance.on(eventname, cb);
};

export const sendMessage=(eventname,data)=>{
  socketInstance.emit(eventname,data);
}