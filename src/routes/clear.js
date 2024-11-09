const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/clear', async (req, res) => {
    try {
        await messageController.clearMessages();
        res.send('Database cleared');
    } catch (err) {
        res.status(500).send('Failed to clear database');
    }
});

module.exports = router;
