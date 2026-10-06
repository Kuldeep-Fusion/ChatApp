import express from 'express'
import { askAI } from '../Controllers/gemini/Genrate.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { getAIHistory } from '../Controllers/gemini/History.controller.js';
import { deleteAIHistory } from '../Controllers/gemini/Delete.controller.js';
import ConnectDB from '../config/MongoDb.js';


const router = express.Router();

await ConnectDB();
router.post('/ask', AuthMiddleware,  askAI);
router.get('/history', AuthMiddleware, getAIHistory);
router.delete('/history', AuthMiddleware, deleteAIHistory);

export default router;