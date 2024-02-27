import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "pending"
    },
    userId:{
        type : String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("todo", todoSchema)