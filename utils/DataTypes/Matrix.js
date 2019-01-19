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


  get rref(){
    // This code is adapted from wikipedia's pseudo code
    let lead = 0
    for(let r = 0; r < this.rowCount; r++){
      if(this.columnCount <= lead) return this.matrix
      let i = r

      while(this.matrix[i][lead] == 0){
        i++
        if(this.rowCount == i){
          i = r
          lead++
          if(this.columnCount == lead){
            return this.matrix
          }
        }
      }

      let tempRow = this.matrix[i]
      this.matrix[i] = this.matrix[r]
      this.matrix[r] = tempRow

      let toDivideBy = this.matrix[r][lead]
      for(let j = 0; j < this.columnCount; j++){
        this.matrix[r][j] /= toDivideBy
      }

      for(let i = 0; i < this.rowCount; i++){
        if(i == r) continue
        toDivideBy = this.matrix[i][lead]
        for(let j = 0; j < this.columnCount; j++){
          this.matrix[i][j] -= toDivideBy * this.matrix[r][j]
        }
      }
      lead++
    }
    return this.matrix
  }
}

module.exports = Matrix
