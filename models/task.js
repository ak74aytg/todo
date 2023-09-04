import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  isComplete:{
    type:Boolean,
    default:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  }
})

export const Tasks = mongoose.model("tasks", taskSchema);