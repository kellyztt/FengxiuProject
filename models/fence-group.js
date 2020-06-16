import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup{
    spu;
    skuList = [];
    fences = [];

    constructor(spu){
        this.spu = spu;
        this.skuList = spu.sku_list;
    }
    //
    // initFence(){
    //     const matrix = this._createMatrix(this.skuList);
    //     const fences = [];
    //     //create a new fence when column index change
    //     let currentColumn = -1;
    //     matrix.each((element, i, j) =>  {
    //         if (j !== currentColumn){
    //             currentColumn = j;
    //             fences[currentColumn] = this._createFence();
    //         }
    //         fences[currentColumn].pushValueTitle(element.value);
    //     });
    //     return fences;
    // }

    initFences(){
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        const AT = matrix.transpose();
        AT.forEach(row => {
            const fence = new Fence(row);
            fence.init();
            fences.push(fence);
        });
        this.fences = fences;
    }

    // _createFence(){
    //     const fence = new Fence();
    //     return fence;
    // }

    eachCell(cb){
        for (let i = 0; i < this.fences.length; i++){
            for (let j = 0; j < this.fences[i].length; j++){
                cb(fences[i][j], i, j);
            }
        }
    }

    _createMatrix(skuList){
        const matrix = [];
        skuList.forEach(item => {
            matrix.push(item.specs);
        });
        return new Matrix(matrix);
    }
}

export {
    FenceGroup
}