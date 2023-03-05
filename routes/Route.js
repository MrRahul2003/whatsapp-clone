import express from "express";

// controllers
import { addConversation, getConversation } from "../controller/ConversationController.js";
import {newMessage, getMessage} from "../controller/MessageController.js";
import { addUser, allUsers } from "../controller/UserController.js";

const route = express.Router();

route.post('/adduser', addUser);
route.get('/allusers', allUsers);
route.post('/conversation/add', addConversation);
route.post('/conversation/get', getConversation);
route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessage);

export default route;