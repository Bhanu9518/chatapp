import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
    {
        participants:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
        description:{type:String, trim:true},
        unreadCount:{type:Number, default:0},
        createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
        isAchrived:{type:Boolean, default:false},
        lastMessage:{type:String},
        updatedAt:{type:Date},
        
    },
    {timestamps:true}
);

export default mongoose.model("Thread", threadSchema);