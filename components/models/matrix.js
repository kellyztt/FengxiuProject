class Matrix{
    m;

    constructor(m){
        this.m = m;
    }

    rowNum(){
        return this.m.length;
    }

    colNums(){
        return this.m[0].length;
    }

    // forEach(cb){
    //     for (let j = 0; j < this.colNums(); j++){
    //         for (let i = 0; i < this.rowNum(); i++){
    //             cb(this.m[i][j], i , j);
    //         }
    //     }
    // }

    transpose(){
        const destArr = [];
        for (let j = 0; j < this.colNums(); j++){
            destArr[j] = [];
            for (let i = 0; i < this.rowNum(); i++){
                destArr[j][i] = this.m[i][j]
            }
        }
        return destArr;
    }
}

export { Matrix }