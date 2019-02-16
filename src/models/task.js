//SCHEMA TASK
const mongoose = require('mongoose')
const {Schema} = mongoose

//como luciran los datos
const TaskSchema=new Schema({
    title:{type:String, required:true},
    description:{type:String,required:true}
})
//Task: como utilizare el eschema en mi app
module.exports=mongoose.model('Task',TaskSchema)