const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

// App and server setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Adjusted to look inside 'src/views'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/clear', require('./routes/clear'));

// Socket.io events
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newMessage', async (data) => {
        const messageController = require('./controllers/messageController');
        await messageController.addMessage(data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`\n\t Server running on port ${PORT} 🔧\n`));
