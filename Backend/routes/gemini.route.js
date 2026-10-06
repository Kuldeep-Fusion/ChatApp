import express from 'express'
import { askAI } from '../Controller/gemini/Genrate.Controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { getAIHistory } from '../Controller/gemini/History.Controller.js';
import { deleteAIHistory } from '../Controller/gemini/Delete.Controller.js';


const router = express.Router();


router.post('/ask', AuthMiddleware,  askAI);
router.get('/history', AuthMiddleware, getAIHistory);
router.delete('/history', AuthMiddleware, deleteAIHistory);

export default router;