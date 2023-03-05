// conversation controller
import Conversation from "../model/ConversationSchema.js";

const addConversation = async (req, res) => {
    try {
        console.log("creating a new conversation", req.body);
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const userExist = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });

        if (userExist) {
            return res.status(200).json({ message: "conversation already exists" });
        } else {
            const newConversation = new Conversation({
                members: [senderId, receiverId]
            });
            await newConversation.save();
            return res.status(200).json( {message: "conversation saved properly"} );
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};

const getConversation = async (req, res) => {
    try {
        console.log("getting conversation details between",req.body);
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;

        const conversation = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
        return res.status(200).json( conversation );

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};

export { addConversation, getConversation }