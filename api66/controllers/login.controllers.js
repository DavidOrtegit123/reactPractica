import User from "../models/user.models.js";
import { hashPassword } from "../utils/security.js"; 
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
        const { hashedPassword } = hashPassword(password, user.salt);
        if (user.password === hashedPassword) {
            // Generamos el token
            const token = jwt.sign({ sub: user._id }, process.env.JWT, { expiresIn: "1h" });
            
            // IMPORTANTE: Debes enviar el token aquí para que no sea una variable "muerta"
            return res.json({ 
                login: true, 
                msg: "ok", 
                token: token, // <--- Ahora el cliente ya tiene el token
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name
                }
            });
        }
    }
    res.status(401).json({ 
        login: false, 
        msg: "Incorrect username or password", 
        user: {} 
    });
};