const {UserModel}= require("../model/user.model")
const {client} = require("../redis")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res)=>{
    try {
        let {name,email,pass} = req.body;
        let hashed = bcrypt.hashSync(pass,6);
        const payload = new UserModel({name, email, pass:hashed});
        await payload.save();
        res.send("register success")
    } catch (error) {
        console.log("error in registration")
        res.send({"msg": error.message})
    }
}
const login = async (req, res)=>{
    try {
        let {email,pass} = req.body;

        let isEmailPresent = await UserModel.findOne({email})
        if(!isEmailPresent) return res.send("no user with is email present, plzz register")

        let passCheck = bcrypt.compareSync(pass, isEmailPresent.pass);

        if(!passCheck) return res.send("wrong pass");

        let normalToken = jwt.sign({userId: isEmailPresent._id}, "normal", {expiresIn: "3m"})
        let refreshToken = jwt.sign({userId: isEmailPresent._id}, "refresh", {expiresIn: "5m"})

        client.mset("normalToken",normalToken,"EX","3m","refreshToken",refreshToken,"EX","5m")

        res.send({"msg":"login success", "token":normalToken, "refreshToken":refreshToken})
    } catch (error) {
        console.log("error in login")
        res.send({"msg": error.message})
    }
}

const logout = async (req, res)=>{
    try {
        let normalToken = await client.get("normalToken")
        let refreshToken = await client.get("refreshToken")
        // console.log(normalToken, refreshToken)

        if(!normalToken || !refreshToken){
            res.send({"msg": "unauthorized"})
        }

        let blacklist = await client.mget("blacklist") || []
        
        blacklist.push(normalToken, refreshToken)

        client.del("normalToken", "refreshToken")

        // console.log(await client.get("normalToken"))
        // console.log(await client.get("refreshToken"))

        res.send("logout success")
    } catch (error) {
        console.log("error in logout")
        res.send({"msg": error.message})
    }
}



module.exports = {registerUser, login, logout}