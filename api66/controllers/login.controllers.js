
import User from "../models/user.models.js";
export const login = async (req, res)=>{
    const{ username, password } = req.body
    const user = await User.findOne
    ({username: username})
    if (user && user.password === password){
        res.json({login:true,msg: "ok", user : user })
    } else {

        res.status(404).json({login:false, msg: "Incorrect username or password", 
        user:{}})

    }





}
