const Matrix = require('../utils/DataTypes/Matrix')

class rref {
  constructor(bot, mysql){
    this.bot = bot
    this.mysql = mysql
    this.desc = "Converts a matrix to row-reduced echelon form"
  }

  async execute(message, args) {
    let matrix = new Matrix(JSON.parse(args))
    console.log(matrix.rref)
    message.channel.send(`\`\`\`${matrix.rref.join('\n')}\`\`\``)
  }
}

module.exports = rref
