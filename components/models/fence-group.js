import { Matrix } from "./matrix.js";
import { Fence } from "./fence.js";
class FenceGroup{
//skuList（m）:[["金属灰","七龙珠","小号S"], 
    //     ["青芒色","灌篮高手","中号M"], 
    //     ["青芒色", "圣斗士", "大号L"], 
    //     ["橘黄色", "七龙珠", "小号S"]]
    spu;
    skuList = [];
    specs = {};
    fences = [];

    constructor(spu){
        this.spu = spu;
        this.skuList = spu.sku_list
    }

    // initFences(){
    //     const matrix = this._createMatrix(this.skuList);
    //     let currentJ = -1;
    //     let fences = [];
    //     matrix.forEach((element, i, j) => {
    //         if (j !== currentJ){
    //             //开启新列，创建新fence
    //             currentJ = j; 
    //             fences[j] = this._createNewFence();
    //         }
    //         fences[j].pushValueTitle(element.value);  
    //     });
    //     console.log(fences);
    // }
    initFences(){
        const matrix = this._createMatrix(this.skuList);
        let fences = [];
        const arr = matrix.transpose();
        arr.forEach(r => {
            const fence = new Fence(r);
            fence.init();
            fences.push(fence);
        });
        this.fences = fences;
    }

    _createMatrix(skuList){
        let m = [];
        skuList.forEach(sku=>m.push(sku.specs));
        return new Matrix(m);
    }

    eachCell(cb){
        for (let i = 0; i < this.fences.length; i++){
            for (let j = 0; j < this.fences[i].cells.length; j++){
                cb(this.fences[i].cells[j], i, j);
            }
        }
    }

    // _createNewFence(){
    //     return new Fence();
    // }
}

export { FenceGroup }