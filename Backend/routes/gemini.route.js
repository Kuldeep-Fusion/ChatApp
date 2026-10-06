import express from 'express'
import { askAI } from '../Controllers/gemini/Genrate.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { getAIHistory } from '../Controllers/gemini/History.controller.js';
import { deleteAIHistory } from '../Controllers/gemini/Delete.Controller.js';


const router = express.Router();


router.post('/ask', AuthMiddleware,  askAI);
router.get('/history', AuthMiddleware, getAIHistory);
router.delete('/history', AuthMiddleware, deleteAIHistory);

export default router;