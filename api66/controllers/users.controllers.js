
import User from "../models/user.models.js";
export const getUsers = async (req, res) => {
    const users= await User.find() //user find deberia de ser un try catch para mas seguridad
    res.json(users)
}
export const getUser =async(req, res) => {
    const  id  = req.params.id
    const user = await User.findById(id)
    res.json(user)
}
export const postUser = async(req, res) => {
    const {name, username, password } = req.body
    const newUser = new User({name, username, password})
    await newUser.save()
    res.json(newUser)
}
export const putUser = async(req, res) => {
}
export const delUser = async(req, res) => {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    res.json(userDeleted)
}
 
