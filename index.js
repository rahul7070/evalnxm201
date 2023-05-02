const express = require("express");
const connection  = require("./db");
const userRouter = require("./routes/user.route");
const apiRouter = require("./routes/api.route");
const winston = require("winston");
const expressWinston = require("express-winston")
var ipapi = require("ipapi.co")
require("winston-mongodb")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



const app = express();

app.get("/", (req,res)=>{
    res.send("hello")
})
app.use(express.json())

app.use(expressWinston.logger({
    transports:[
        new winston.transports.Console({
            level: "error",
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: "access.log",
            level : "error",
            json: true
        })
    ],
    format:winston.format.prettyPrint()
}))

app.use("/user",userRouter)
app.use("/api", apiRouter)



app.listen(8800, ()=>{
    try {
        connection
        console.log("connection established at 8800")
    } catch (error) {
        console.log(error)
    }
})