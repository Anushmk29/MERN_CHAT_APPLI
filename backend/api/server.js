const http = require('http')
const {Server} = require('socket.io')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require("../config/db")
const userRoutes = require('../routes/userRoutes')
const chatRoutes = require('../routes/chatRoutes')
const messageRoutes = require('../routes/messageRoutes')
const {notFound,errorHandler} = require('../middleware/errorMiddleware')
const CORS = require("cors")
const path = require("path")

dotenv.config();
connectDB()

const {chats} = require('../data/data')
const { log } = require('console')


const app = express()
const server = http.createServer(app)

app.use(CORS({
    origin:"http://localhost:5173",
    methods: ["GET", "POST","PUT"],
}))

app.use(express.json())//to accept json data

app.get('/', (req, res) => {
    res.send('app running')
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

//---------------------deploymet--------------
const __dirname1 =  path.resolve()
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"))
    })
}else{
    app.get('/',(req,res)=>{
        res.send("API is running successfully")
    })
}
//---------------------------------------
//error handling middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(5000, console.log(`Server started on port ${PORT}`))

const io = new Server(server,{
    cors: {
    origin: "http://localhost:5173",
    credentials:true
  }
})

io.on('connection',(socket)=>{
 console.log(`connected to socket.io`);
//  console.log(`socket id:${socket.id}`);
//   socket.emit("welcome",`welcome to the server,${socket.id}`)

 socket.on('setup',(userData)=>{
     socket.join(userData._id)
    //  console.log('userData._id',userData._id);
     socket.emit("connected")
 });

 socket.on('join chat',(room)=>{
    socket.join(room);
    console.log('user joined the room:'+room);

 });
 socket.on("typing",(room)=>socket.in(room).emit("typing"))
 socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

 socket.on("new message",(newMessageRecieved)=>{
    var chat = newMessageRecieved.chat
    // console.log('newMessageRecieved',newMessageRecieved.content);
    // socket.emit("receive-message",newMessageRecieved)
    socket.broadcast.emit("receive-message",newMessageRecieved)

    if (!chat.users) return console.log('chat.users not defined');
    
    chat.users.forEach(user => {
        if (user._id == newMessageRecieved.sender._id) return ;
        
        socket.in(user._id).emit("receive-message",newMessageRecieved.content)
    });
 })

 socket.off("setup",(userData)=>{
    console.log('user disconnected');
    socket.leave(userData._id)
    
 })
})