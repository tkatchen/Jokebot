class Pong {
  constructor(bot, mysql){
    this.bot = bot
    this.mysql = mysql
  }

  async execute(message){
    let results = await this.mysql.query(`SELECT * FROM users WHERE id = ?`, [message.author.id])
    if(results) return message.channel.send("You're already in the database")

    this.mysql.query(`INSERT INTO users (name, id) VALUES (?, ?)`, [message.author.username, message.author.id])
    message.channel.send("Added you to the database")
  }
}

module.exports = Pong
