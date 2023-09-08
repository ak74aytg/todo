import express from 'express'
import userRoutes from './routes/user.js'
import taskRoutes from './routes/task.js'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

export const app = express();

config({
    path:"./data/config.env"
})


app.use(express.json());
app.use(cookieParser());
app.use(express.Router());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (req, res)=>{
    res.send('this is the home page');
})

app.use(errorMiddleware)