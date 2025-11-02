import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const connectionDB = async () => {
    const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster1.xi0e2oi.mongodb.net/?appName=Cluster1`
    try {
        await mongoose.connect(url)
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error")
        process.exit(1)
    }
}

export default connectionDB