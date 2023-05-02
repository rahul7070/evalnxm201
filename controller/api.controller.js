const {client} = require("../redis")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {Client} = require("@googlemaps/google-maps-services-js");

const client2 = new Client({"ip":"49.37.65.121/32"});

const checkLocation = async ()=>{
    // let {ip} = req.body
    fetch("https://ipapi.co/json/").then(function(res){
        return res.json()
    }).then((data)=>{
        console.log(data)
    })
    res.send("coming")
}

module.exports = checkLocation