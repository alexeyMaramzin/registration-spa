import mongoose from 'mongoose';
import config from 'config';
import express from 'express';
import authRouter from './routes/auth.routes.js';
import corsMiddleware from './middleware/cors.middleware.js';
const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        })
    } catch (e) {

    }
}

start()