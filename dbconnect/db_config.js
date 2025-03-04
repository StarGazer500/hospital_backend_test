const mongoose = require("mongoose")

async function DbConnect(){
   try{
       await mongoose.connect(process.env.CONNECTION_STRING)
   }
   catch(error){
       console.log(error)
   }
}

mongoose.connection.on('connected',()=>{
   console.log('Mongodb Connected')
})
mongoose.connection.on('disconnected',()=>{
   console.log('Mongodb Disconnected')
})

 module.exports = DbConnect