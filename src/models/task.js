const mongoose = require('mongoose')
const { Schema } = mongoose
const timestamps  = require('mongoose-timestamp');

const Task = new Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true}
})
Task.plugin(timestamps);
module.exports = mongoose.model('Task', Task);