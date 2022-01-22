
// const userData = require('../models/user')

// exports.indexSocket = (io)=>{
//     io.on('connection', async (socket)=>{
//         console.log('socket connected with the server')
//         console.log(socket.id)
    
//         await socket.on("send-message", async (message)=>{
//            await socket.broadcast.emit("receive-message",message)
//         //    await userData.findByIdAndUpdate(`${message.Ids}`, {$push: {
//         //      messages: message.msg
//         // }})
//             console.log(message)
           
//         })
       
//     })
    
// }

// exports.loginSocket = async (io)=>{
//     io.path('/api/10gin')
//     io.path('/login')
//     io.path('/addphone')
//     io.path('/room')
//     io.path('/friends')
//     io.on('connection', async (socket)=>{
//         console.log('socket 2 connected')
//         await socket.on("send-message", async (message)=>{
//             await socket.broadcast.emit("receive-message",message)
//          //    await userData.findByIdAndUpdate(`${message.Ids}`, {$push: {
//          //      messages: message.msg
//          // }})
//              console.log(message)
            
//          })
   
//     })
   
// }