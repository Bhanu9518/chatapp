import express from "express";
import {sendMessage,getMessages} from "../controllers/chat.controller.js"

const router = express.Router();

router.post("/sendChat", sendMessage);
router.get("/:threadId", getMessages);

export default router;