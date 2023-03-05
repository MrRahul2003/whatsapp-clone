import Conversation from "../model/ConversationSchema.js";
import Message from "../model/MessageSchema.js";

const newMessage = async (req, res) => {
    try {
        console.log("adding this new message in message", req.body);
        console.log("updating this text in conversation schema", req.body.text);

        const newMessage = new Message(req.body);
        await newMessage.save();

        const updated = await Conversation.findByIdAndUpdate(req.body.conversationId, {
            message: req.body.text
        })
        console.log("new message updated", updated);
        return res.status(200).json({ message: "message has been send successfully" });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id });
        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export { newMessage, getMessage }
