class Matrix {
    m;
    constructor(matrix){
        this.m = matrix;
    }

    rowNum(){
        return this.m.length;
    }

    colNum(){
        return this.m[0].length;
    }

    /**
     *
     * @param cb
     * [[金属灰，七龙珠，小号S]，
     *  [青芒色，灌篮高手，中号M]，
     *  [青芒色，七龙珠，大号L]，
     *  [橘黄色，圣斗士，小号S]]
     */
    // each(cb){
    //     for (let j = 0; j < this.colNum(); j++){
    //         for (let i = 0; i < this.rowNum(); i++){
    //             cb(this.m[i][j], i, j);
    //         }
    //     }
    //
    // }

    transpose(){
        const destArray = [];
        for (let i = 0; i < this.colNum(); i++){
            destArray[i] = [];
            for (let j = 0; j < this.rowNum(); j++){
                destArray[i][j] = this.m[j][i];
            }
        }
        return destArray;
    }
}

export {
    Matrix
}