const Redis = require("ioredis")

let configuration = {
    host: "redis-17150.c240.us-east-1-3.ec2.cloud.redislabs.com",
    port: 17150,
    username: "default",
    password: "kjR7R8VsoGp9SSAfYuO5DnDQf4ehQ63A"
}

const client = new Redis(configuration);

module.exports = {client}