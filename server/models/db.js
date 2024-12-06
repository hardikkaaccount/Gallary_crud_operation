import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);
console.log("MongoDB connected in models");

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    gallery_name: String,
    location: String,
    art_type: String,
    exhibition_schedule: String,
    admission_fee: Number,
});

const galleryModel = mongoose.model("gallery", gallerySchema);

export default galleryModel;
