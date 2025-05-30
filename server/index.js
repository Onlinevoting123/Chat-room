const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const {Server} = require('socket.io');

const server=http.createServer(app);
app.use(cors())

app.use("/",(req,res)=>{
    res.send("server is running");
});

const io=new Server(server,{
    cors:{
        origin:"https://chat-room-join.vercel.app",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user id:${socket.id} room joined:${data}`)
        socket.to(data.room).emit("receive_roommessage",data);
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
})
const PORT = process.env.PORT || 3001;
server.listen(PORT,()=>{
    console.log("server running");
})
