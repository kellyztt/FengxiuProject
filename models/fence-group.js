import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../core/enum";

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
            for (let j = 0; j < this.fences[i].cells.length; j++){
                 cb(this.fences[i].cells[j], i, j);
            }
        }
    }

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id;
        if (!defaultSkuId){
            return;
        }
        return this.skuList.find(item => item.id === defaultSkuId);
    }

    setCellStatusById(cellId, status){
        this.eachCell((cell) => {
            if (cellId === cell.id){
                cell.status = status;
            }
        })
    }

    setCellStatusByXY(x,y, status){
        this.fences[x].cells[y].status = status;
    }

    getSku(code){
        return this.skuList.find(item => item.code === code);
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