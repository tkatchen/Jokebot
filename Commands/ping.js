class Ping {
  constructor(bot, mysql){
    this.bot = bot
    this.mysql = mysql
    this.desc = "Ping pong"
  }

  async execute(message) {
    console.log('hey')
    let results = await this.mysql.query(`SELECT * FROM users WHERE id = "212026264742002688"`)
    console.log(results)
    message.channel.send("Pong")
  }
}

module.exports = Ping
