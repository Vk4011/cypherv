const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', async (req, res) => {
    const messages = await messageController.getAllMessages();
    res.render('index', { messages });
});

module.exports = router;
