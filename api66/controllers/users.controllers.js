import User from "../models/user.models.js";
import { getSalt, hashPassword } from "../utils/security.js"; 

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ msg: "Usuario no encontrado" });
    }
}

export const postUser = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const salt = getSalt(); 
        const { hashedPassword } = hashPassword(password, salt);
        const newUser = new User({
            name,
            username,
            password: hashedPassword, 
            salt: salt              
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ msg: "Error al crear usuario", error: error.message });
    }
};

export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar" });
    }
}

export const delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        res.json({ msg: "Usuario eliminado", userDeleted });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar" });
    }
}