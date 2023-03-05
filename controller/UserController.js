// user Schema
import User from "../model/UserSchema.js";

const addUser = async (req, res) => {
    try {
        const userExist = await User.findOne({ sub: req.body.sub });

        if (userExist) {
            return res.status(200).json({ message: "user already exists" });
        } else {
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(200).json(newUser);
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json(users);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};

export { addUser, allUsers }
