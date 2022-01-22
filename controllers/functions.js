const crypto = require('crypto')
const {connection} = require('../models/database')
const path = require('path')
const files = require('../models/files')
const userData  = require('../models/user')
const friendRoom = require('../models/friends')
const jwt = require('jsonwebtoken')
const secreteKey = 'HOvaFrEVzpZC6Y5sdBr+iqaoHFQppFYbVhvJitELvkcbT+HhGj6aqaTZacMi'
 
exports.saveFile = async (req, res)=>{
    const file = req.files.file
   console.log(file)
   const filename = crypto.randomBytes(15).toString('hex') + path.extname(file.name);
   const newFile = new files({
       filename: filename,
       mimeType: file.mimetype,
       data: file.data, 

   })
   const saveFile = await newFile.save()
   await userData.findByIdAndUpdate('61e5b7a5ea681ee3900f3497', {$push: {
       
           filenames: saveFile.filename,
           fileId: saveFile._id
       
   }})
   console.log(saveFile.filename)
}

exports.signup = async (req, res)=>{
   const email = req.body.phone
   const pass = req.body.password
   const name = req.body.username
   console.log(email)
   const newLogin = new userData({
       phone: email,
       password: pass,
       username: name,
   })
   const find = await userData.findOne({phone: email})
    if(!email | !pass | !name){
       res.json({msg: 'All fields are required'})
    }
    else if(email.length !== 10){
        res.json({msg: 'cell No must have 10 digits'})
    }
    else if(find){
        res.json({msg: 'Cell No already exists'})
    }
   else{
    await newLogin.save()
    res.json({msg: 'Account created successfully !'})
   }
   
}

exports.login = async (req, res)=> {
    const phone = req.body.phone
    const password = req.body.password
    const user = await userData.findOne({phone: phone, password: password})
    if(user){
        const token =  jwt.sign({userId: user._id}, secreteKey)
        res.status(200).json({token: token})
        // console.log(user)
    }
    else{
        res.json({error: 'incorrect password or cell No !!!'})
    }
}
exports.Findfriends = async (req, res)=>{

   const search = req.params.phone    
   data = await userData.findOne({phone: search})
   if (data) {
    res.json({data:data})
   } else {
       res.json({msg: 'No user match '+search})
       console.log('no match')
   }    
}
exports.Room = async (req, res)=>{
    const phone = req.body.phone
    const frId = await friendRoom.create({phone: phone})
    const token = jwt.verify(req.body.token, secreteKey,(err, decoded)=>{return decoded.userId })
    const user = await userData.findById(token)
    const friend = await userData.findOne({phone: phone})
     
    await friendRoom.findByIdAndUpdate(frId._id, {$push: {phone: user.phone}})
    await userData.findByIdAndUpdate(token, {$push: {friendId: frId._id}})
    await userData.findOneAndUpdate({phone: phone}, {$push: {friendId: frId._id}})
    
    await userData.findByIdAndUpdate(user._id, {$push: {friends: friend.username}})
    await userData.findByIdAndUpdate(friend._id, {$push: {friends: user.username}})
}
exports.streamFriends = async (req, res)=> {

    const id = jwt.verify(req.params.token, secreteKey, (err, decoded)=> {return decoded.userId}) 
    
//    console.log( id)
        const friend = await userData.findById(id)
        res.json({friends: friend, name: friend.username})
        // console.log(friend)
 
}

exports.sendMessages = async (req, res)=> {

    const room = req.body.id
    const msg = req.body.text
    
    const data = await friendRoom.findByIdAndUpdate(room, {$push: {messages: msg}})

    
}

exports.showMessage = async (req, res)=> {
    const room = req.params.id
    
    
    const msgs = await friendRoom.findById(room)
    res.json({mess: msgs.messages})
}