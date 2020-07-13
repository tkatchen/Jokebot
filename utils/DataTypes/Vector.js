class Vector {
    constructor(input) {
        this.vector = input
    }

    add(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not add two different length vectors")

        let res = []
        for(let i = 0; i < this.vector.length; i++) {
            res.push(passVector.vector[i] + this.vector[i])
        }

        return new Vector(res)
    }

    subtract(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not add subtract different length vectors")

        let res = []
        for(let i = 0; i < this.vector.length; i++) {
            res.push(this.vector[i] - passVector.vector[i])
        }

        return new Vector(res)
    }

    multiply(scalar) {
        let res = this.vector.map(component => component * scalar)
        return new Vector(res)
    }

    dot(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not find the dot product of different length vectors")
        let total = 0

        for(let i = 0; i < this.vector.length; i++) {
            total += passVector.vector[i] * this.vector[i]
        }

        return total
    }

    isPerpendicular(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not find if two different length vectors are perpendicular")
        if(this.dot(passVector) == 0) return true
        return false
    }

    isParallel(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not find if two different length vectors are parallel")
        if(this.dot(passVector) == this.magnitude + passVector.magnitude) return true
        return false
    }

    crossProduct(passVector) {
        if(passVector.vector.length != this.vector.length) throw new Error("Can not find if the cross product of two different length vectors")
        let copyVector = [...this.vector]
        let copyPassVector = [...passVector.vector]
        if(copyVector.length == 2) {
            copyVector.push(0)
            copyPassVector.push(0)
        }

        let x = copyVector[1] * copyPassVector[2] - copyVector[2] * copyPassVector[1]
        let y = copyVector[2] * copyPassVector[0] - copyVector[0] * copyPassVector[2]
        let z = copyVector[0] * copyPassVector[1] - copyVector[1] * copyPassVector[0]

        return new Vector([x, y, z])
    }

    get magnitude() {
        let total = 0
        for(let component of this.vector) {
            total += Math.pow(component, 2)
        }

        return Math.sqrt(total)
    }

    get directions() {
        return this.unitVector.vector
    }

    get unitVector() {
        let magnitude = this.magnitude
        let res = this.vector.map(component => component / magnitude)

        return new Vector(res)
    }

}

module.exports = Vector