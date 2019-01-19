const Discord = require('discord.js');
const bot = new Discord.Client();


const SQLController = require('./utils/SQLController')
const mysql = new SQLController()

const config = require('./config.json')
const CommandClass = require('./utils/CommandHandler')
const CommandHandler = new CommandClass(bot, mysql)

bot.on('ready', () => {
  console.log("Yo this stuff up")
})

bot.on('message', (message) => {
  if(message.author.bot) return
  CommandHandler.handle(message)
})

bot.login(config.token)
