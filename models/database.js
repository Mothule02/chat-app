const mongoose = require("mongoose")
const MongoUri = 'mongodb+srv://mothule02:M0213@cluster0.ulgvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


exports.connection = ()=>{
    mongoose.connect(MongoUri,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(console.log(`db connected at ${MongoUri}`))
}