const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
// const { Server } = require('socket.io')
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:4200",
//     }
// })
const fileupload = require('express-fileupload')
const { connection } = require('./models/database')
const bodyParser = require('body-parser')
const { saveFile, login, signup, streamFriends, Findfriends, Room, sendMessages, showMessage } = require('./controllers/functions')
// const { indexSocket, loginSocket } = require('./controllers/sockets')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())
conn = connection()


// indexSocket(io)

// loginSocket(io)

app.post('/',saveFile)

app.get('/friends:token', streamFriends)

app.get('/find:phone', Findfriends)

app.post('/api/10gin', signup)

app.post('/login',login)

app.post('/room', Room)

app.post('/sendmsg', sendMessages)

app.get('/showmsg:id', showMessage)


app.get('/files', (req, res)=>{
    res.send('<h1>server running on port 8080</h1>')
})

 


server.listen(8080, ()=>{
    console.log('Server Listening on port 8080')
})