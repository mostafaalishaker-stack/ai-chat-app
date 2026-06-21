import { Router } from "express";
import { getChats, createChat, deleteChat, sendMessage } from "../controllers/chat";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(authenticate);
router.get("/", getChats);
router.post("/", createChat);
router.delete("/:id", deleteChat);
router.post("/message", sendMessage);
export default router;
