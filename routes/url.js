import express from 'express';
import Url from '../models/Url.js';
import { nanoid } from 'nanoid'; // Ensure this is correctly imported

const router = express.Router();

// Shorten URL route
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        // Create a new short URL
        const shortId = nanoid(); // or use another method to generate a short ID
        const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

        // Save the URL in the database
        const url = new Url({ longUrl, shortUrl });
        await url.save();

        res.json({ shortUrl });
    } catch (error) {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Error shortening URL' });
    }
});

export default router;
