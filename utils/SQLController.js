const mysql = require('mysql')
const config = require('../config.json')

class SQLController {
  constructor(){
    this.connection = mysql.createConnection ({
      host : "localhost",
      user : "root",
      password : Buffer.from(config.mysqlPassword, 'base64').toString(),
      database : 'hoon'
    })

    this.connection.connect()
  }

  query(inputQuery, params = []){
    return new Promise((resolve, reject) => {
      this.connection.query(inputQuery, params, (error, results, fields) => {
        if (error) throw error;
        resolve(results)
      })
    })
  }
}

module.exports = SQLController
