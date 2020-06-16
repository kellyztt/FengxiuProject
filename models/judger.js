import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";
import {SkuPending} from "./sku-pending";

class Judger{
    fenceGroup;
    pathDict = [];
    skuPending;

    constructor(fenceGroup){
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkuPending();
    }

    _initPathDict(){
        this.fenceGroup.skuList.forEach(item => {
            const sku = new SkuCode(item.code);
            this.pathDict = this.pathDict.concat(sku.totalSegments);
        });
    }

    _initSkuPending(){
        this.skuPending = new SkuPending();
    }

    judge(cell, x, y){
        this._changeCurrentCellStatus(cell, x, y);
        this.fenceGroup.eachCell(this._changeOtherCellStatus);
    }

    _changeOtherCellStatus(cell, x, y) {

    }

    _findPotentialPath(cell, x, y){

    }

    _changeCurrentCellStatus(cell, x, y){
        if (cell.status === CellStatus.WAITING){
            this.skuPending.insertCell(cell, x);
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
        } else if (cell.status === CellStatus.SELECTED){
            this.skuPending.removeCell(x);
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
        }
    }
}

export {
    Judger
}