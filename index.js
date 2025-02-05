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
    console.log("BOT IS READY")
})

client.on('messageCreate' , message=>{
    if(message.content == "푸하"){
        message.reply("푸하 PUUB! PUUB!")
    }
    if(message.content == "푸나잇"){
        message.reply("푸나잇 PUUB! PUUB!")
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

client.login("MTA0ODA4MTk3NDkyMjg0NjM1OQ.GhDYfA.X1VqS2USZyhKqdvgOrioUCScsKhz8-_sM2UV0U")