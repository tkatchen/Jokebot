class Matrix {
  /**
   * Constructs a matrix
   * @param {Array.<Array>} matrix [description]
   */
  constructor(matrix){
    for(let i = 0; i < matrix.length; i++){
      if(matrix[i+1] && matrix[i].length != matrix[i+1].length) throw new Error("Matrix must have equal amount of columns in each row")
      this.columnCount = matrix[i].length
      for(let j = 0; j < matrix[i].length; j++){
        matrix[i][j] = parseFloat(matrix[i][j])
        if(!matrix[i][j] && matrix[i][j] != 0) throw new Error("Matrix only supports Integer or Float inputs")
      }
    }
    this.rowCount = matrix.length
    this.matrix = matrix
  }
  
  /**
   * Returns the Row Reduced Echelon form of the matrix
   */
  get rref(){
    let tmp = [...this.matrix]
    // This code is adapted from wikipedia's pseudo code
    let lead = 0
    for(let r = 0; r < this.rowCount; r++){
      if(this.columnCount <= lead) return new Matrix(tmp)
      let i = r

      while(tmp[i][lead] == 0){
        i++
        if(this.rowCount == i){
          i = r
          lead++
          if(this.columnCount == lead){
            return new Matrix(tmp)
          }
        }
      }

      let tempRow = tmp[i]
      tmp[i] = tmp[r]
      tmp[r] = tempRow

      let toDivideBy = tmp[r][lead]
      for(let j = 0; j < this.columnCount; j++){
        tmp[r][j] /= toDivideBy
      }

      for(let i = 0; i < this.rowCount; i++){
        if(i == r) continue
        toDivideBy = tmp[i][lead]
        for(let j = 0; j < this.columnCount; j++){
          tmp[i][j] -= toDivideBy * tmp[r][j]
        }
      }
      lead++
    }
    return new Matrix(tmp)
  }

  _getDet(matrix) {
    if(matrix.length == 2) {
      return matrix[0][0] * matrix[1][1] -  matrix[0][1] * matrix[1][0]
    }

    let total = 0

    for(let i = 0; i < matrix.length; i++) {
      let tmp = matrix.map(row => row.map(element => element))
      tmp.shift()
      
      for(let j = 0; j < tmp.length; j++) {
        tmp[j].splice(i, 1)
      }
      total += matrix[0][i] * this._getDet(tmp) * (Math.pow(-1, i))
    }

    return total
  }

  /**
   * Gets the determinant of a matrix
   * @return {Number} The determinant
   */
  get determinant() {
    if(this.matrix[0] && this.matrix.length != this.matrix[0].length) throw new Error("Can not find the determinant of a non-square matrix")

    return this._getDet(this.matrix)
  }

  get inverse() {
    if(this.matrix[0] && this.matrix.length != this.matrix[0].length) throw new Error("Can not find the inverse of a non-square matrix")

    let res = []

    for(let i = 0; i < this.matrix.length; i++) {
      let row = []
      for(let j = 0; j < this.matrix.length; j++) {
        let tmp = this.matrix.map(row => row.map(element => element))
        tmp.splice(i, 1)

        for(let k = 0; k < tmp.length; k++) {
          tmp[k].splice(j, 1)
        }

        row.push(this._getDet(tmp) * Math.pow(-1, i + j))
      }

      res.push(row)
    }

    let matrixRes = new Matrix(res)

    let transposed = matrixRes.transpose

    let final = transposed.multiply(1/this._getDet(this.matrix))

    return final
  }

  /**
   * Multiplies two matrices or by a scalar.
   * A*B where:
   * A is the matrix who's method was called
   * B is the matrix passed to the method
   * @param {Matrix|Number} pass matrix to multiply this matrix by
   * @returns {Matrix} Returns a new Matrix object
   */
  multiply(pass) {
    // This will run if it is a scalar
    if(typeof pass == "number") {
      let res = []

      for(let row of this.matrix) {
        let newRow = []

        for(let element of row) {
          newRow.push(element * pass)
        }

        res.push(newRow)
      }

      return new Matrix(res)
    }

    // We know it's not a scalar. Let's multiply these matrices
    if(pass.rowCount != this.columnCount) throw new Error("Can not multiply two matrices where the column count of one does not equal the row count of the other")
    if(this.rowCount != pass.columnCount) throw new Error("Can not multiply two matrices where the column count of one does not equal the row count of the other")

    let returnMatrix = []

    for(let row of this.matrix) {
      let newRow = []
      let total = 0
      for(let i = 0; i < this.matrix.length; i++) {
        for(let j = 0; j < row.length; j++){
          total += row[j] * pass.matrix[j][i]
        }
        newRow.push(total)
        total = 0
      }
      returnMatrix.push(newRow)
      newRow = []
    }

    return new Matrix(returnMatrix)
  }

  /**
   * Adds two matrices
   * @param {Matrix} pass The matrix to add
   */
  add(pass) {
    if(pass.rowCount != this.rowCount || pass.columnCount != this.columnCount) throw new Error("Can not add two matrices with different dimensions")

    let returnMatrix = []

    for(let i = 0; i < this.matrix.length; i++) {
      let newRow = []

      for(let j = 0; j < this.matrix[i].length; j++) {
        newRow.push(this.matrix[i][j] + pass.matrix[i][j])
      }
      returnMatrix.push(newRow)
    }

    return returnMatrix
  }

  /**
   * Subtracts two matrices in the form A-B where:
   * A is the matrix the method is being called on
   * B is the matrix being passed to the method
   * @param {Matrix} pass The matrix to subtract by
   */
  subtract(pass) {
    if(pass.rowCount != this.rowCount || pass.columnCount != this.columnCount) throw new Error("Can not subtract two matrices with different dimensions")

    let returnMatrix = []

    for(let i = 0; i < this.matrix.length; i++) {
      let newRow = []

      for(let j = 0; j < this.matrix[i].length; j++) {
        newRow.push(this.matrix[i][j] - pass.matrix[i][j])
      }
      returnMatrix.push(newRow)
    }

    return returnMatrix
  }

  get transpose() {
    let res = this.matrix.map(row => row.map(element => element))
    for(let row = 0; row < this.matrix.length; row++) {
      for(let element = 0; element < this.matrix[row].length; element++) {
        res[element][row] = this.matrix[row][element]
      }
    }

    return new Matrix(res)
  }

  /**
   * Returns a formatted string
   */
  get formatted() {
    let str = ""
    for(let row of this.matrix) {
      str += `${row}\n`
    }

    return str
  }
}

module.exports = Matrix