const Message = require('../models/Message');

exports.getAllMessages = async () => {
    return await Message.find().sort({ timestamp: 1 });
};

exports.addMessage = async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
};

exports.clearMessages = async () => {
    await Message.deleteMany({});
};
