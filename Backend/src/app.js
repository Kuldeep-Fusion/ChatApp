import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import config from '../config/config.js';
import '../config/google.js';                      
import AuthRouter from '../routes/auth.route.js';
import GoogleAuthRouter from '../routes/googleauth.route.js'
import UserRouter from '../routes/user.route.js';
import MessageRoute from '../routes/messages.route.js';
import ConversationRouter from '../routes/conversation.route.js';
import ManageRoute from '../routes/blocked.route.js';
import RelationshipRoute from '../routes/relationship.routes.js'

const app = express();

app.use(cors({
    origin: config.CLIENT_URL,   
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); 

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/auth', GoogleAuthRouter);  
app.use('/api/users', UserRouter);
app.use('/api/message/', MessageRoute);
app.use('/api/chats', ConversationRouter);
app.use('/api/user/manage', ManageRoute);
app.use('/api/relationship', RelationshipRoute);

app.get('/', (req, res) => {
    return res.json({ message: 'server is running' });
});

export default app;