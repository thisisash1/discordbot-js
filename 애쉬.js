const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const {prefix , token} = require('./config.json')
const mongoose = require("mongoose")
module.exports = client

mongoose.connect("mongodb+srv://ASH:1101@cluster0.ruqla3g.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(console.log("DB CONNECT"))

client.once('ready',()=>{
    console.log("봇이 준비되었습니다")
})

client.on('messageCreate' , message=>{
    if(message.content == "푸하"){
        message.reply("푸나잇")
    }

    if(message.content == "/강남점 컨시어지"){
        message.reply("신관 3층 어딘가에 있습니다.")
    }

    if(message.content == "/홀더인증"){
        message.reply("#✅｜holder-verify 채널에서 진행하시면 됩니다.")
    }
})
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login("MTA0Nzg1MzQ5NDU3NDUxODMzMg.GBl2-1.gUhGUJH3KHab1osjaIOYFyWK_4BnKRu6fuhIyo")