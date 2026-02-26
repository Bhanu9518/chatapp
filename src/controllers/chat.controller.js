import Chat from "../models/chat.model.js";
import Thread from "../models/thread.model.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import { getIO, onlineUsers } from "../socket/socket.js";
import bcrypt from  "bcrypt";

export const sendMessage = asyncHandler(async (req, res) => {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message) {
        return res.status(400).json({ message: "Missing fields" });
    }
    let thread = await Thread.findOne({
        participants: { $all: [sender, receiver] }
    });

    if (!thread) {
        thread = await Thread.create({ participants: [sender, receiver] });
    }
    const chat = await Chat.create({ sender, receiver, message, thread: thread._id });
    //update thread
    await Thread.updateOne({ _id: thread._id }, {
        $set: {lastMessage: message, updatedAt: new Date()}
    }
    );


    //real time emit
    const receiverSocketId = onlineUsers.get(receiver);
    if (receiverSocketId) {
        getIO().to(receiverSocketId).emit("newMessage", chat);
    }
    res.status(201).json(chat);
});



//Get message by thread........
export const getMessages = asyncHandler(async (req, res) => {
    const { threadId } = req.params;  //thread id
    const { page = 1, limit = 20 } = req.query;  //pagination

    const message = await Chat.find({ thread: threadId }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));

    res.status(200).json(message);
})



