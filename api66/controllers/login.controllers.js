import User from "../models/user.models.js";
import { hashPassword } from "../utils/security.js"; 

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
        const { hashedPassword } = hashPassword(password, user.salt);
        if (user.password === hashedPassword) {
            return res.json({ 
                login: true, 
                msg: "ok", 
                user: user 
            });
        }
    }
    res.status(401).json({ 
        login: false, 
        msg: "Incorrect username or password", 
        user: {} 
    });
};