const Discord = require('discord.js');
const bot = new Discord.Client();

const Matrix = require('./utils/DataTypes/Matrix')

//const SQLController = require('./utils/SQLController')
//const mysql = new SQLController()

const config = require('./config.json')
const CommandClass = require('./utils/CommandHandler')
const CommandHandler = new CommandClass(bot)

let a = new Matrix([
  [2, -1, 5 , 1 , 5 , 6 ],
  [3, 2 , 2 , -6, 4 , 5 ],
  [1, 3 , 3 , -1, 56, 57],
  [5, -2, -3, 3 , 6 , 7 ],
  [1, 6 , 2 , 78, 1 , 2 ],
  [4, 12, 56, 12, 6 , 1 ]
])
console.log(a.determinant)

let b = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

console.log(b.subtract(b))

bot.on('ready', () => {
  
  console.log("Yo this stuff up")
})

bot.on('message', (message) => {
  if(message.author.bot) return
  CommandHandler.handle(message)
})

bot.login(config.token)
