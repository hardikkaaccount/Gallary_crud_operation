import express from "express";
import galleryModel from "../models/db.js";

const gallery = express.Router();

// Create a new gallery
gallery.post('/post', async (req, res) => {
    const { gallery_name, location, art_type, exhibition_schedule, admission_fee } = req.body;
    try {
        await galleryModel.create({
            gallery_name,
            location,
            art_type,
            exhibition_schedule,
            admission_fee
        });
        res.json({ message: "Gallery added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding gallery" });
    }
});

// Get gallery by ID
gallery.get('/getbyid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const gallery = await galleryModel.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery not found" });
        }
        res.json({ gallery });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving gallery" });
    }
});

// Update gallery details
gallery.put('/update/:id', async (req, res) => {
    const { gallery_name, location, art_type, exhibition_schedule, admission_fee } = req.body;
    try {
        const id = req.params.id;
        const gallery = await galleryModel.findByIdAndUpdate(
            { _id: id },
            { gallery_name, location, art_type, exhibition_schedule, admission_fee },
            { new: true }
        );
        if (!gallery) {
            return res.status(404).json({ message: "Gallery not found" });
        }
        res.json({ message: "Gallery details updated", gallery });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating gallery" });
    }
});

// Delete gallery
gallery.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const gallery = await galleryModel.findByIdAndDelete(id);
        if (!gallery) {
            return res.status(404).json({ message: "Gallery ID not found" });
        }
        res.json({ message: "Gallery deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting gallery" });
    }
});

// Get all galleries
gallery.get('/getall', async (req, res) => {
    try {
        const galleries = await galleryModel.find();
        res.json({ galleries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving galleries" });
    }
});

export default gallery;
