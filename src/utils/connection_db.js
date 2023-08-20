import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DB_URL = process.env.DB_URL;

try {
    await mongoose.connect(DB_URL)
    console.log(`Successfuly connected to DB!`);
} catch (error) {
    console.log(error.message);
}