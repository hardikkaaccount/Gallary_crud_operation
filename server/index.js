import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gallery from "./routes/gallery.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use("/", gallery);

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
main();
