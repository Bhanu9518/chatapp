import mongoose  from "mongoose";
import bcrypt from "bcrypt";

const ChatScheam= new mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        receiver:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        thread:{type:mongoose.Schema.Types.ObjectId, ref:"Thread", required:true},
        message:{type:String, trim:true, required:true},
        attachment:{type:String, Url:String, default:false},
        isRead:{type:Boolean, default:false},
        isEdited:{type:Boolean, default:false},
        editedAt: {type:Date},

    },{timestamps:true}
);

export default mongoose.model("Chat",ChatScheam);
