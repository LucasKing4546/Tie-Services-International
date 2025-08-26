// backend.js
const express = require('express');
const router = express.Router();

const MODAL_API_URL = 'https://lucasking4546--ai-chatbot-serve-api.modal.run/chat';

router.post('/', async (req, res) => {
    try {
        const { contents } = req.body;

        if (!Array.isArray(contents)) {
            return res.status(400).json({ error: 'Invalid "contents" format' });
        }

        const response = await fetch(MODAL_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
        });

        const result = await response.json();
        res.status(200).json(result);
    } catch (err) {
        console.error('Backend error:', err);
        res.status(500).json({ error: 'Internal server error', detail: err.message });
    }
});

module.exports = router;