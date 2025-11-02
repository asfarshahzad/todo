import express from 'express';
import dotenv from 'dotenv'
import connectionDB from './config/db.js';
import router from './routes/taskRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

connectionDB();

app.use("/api", router)

const PORT = process.env.DB_PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on this PORT", PORT)
})

