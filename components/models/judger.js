import { SkuCode } from "./sku-code.js";
import { CellStatus } from "../../core/enum.js";
import { SkuPending } from "../models/sku-pending.js";
import { Joiner } from "../../utils/joiner.js";
import { Cell } from "./cell.js";

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
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    _initSkuPending(){
        this.skuPending = new SkuPending();
    }

    judge(cell, x, y){
        this._changeCurrentCellStatus(cell, x, y);
        this.fenceGroup.eachCell((cell, i, j) => {
            const path = this._findPotentialPath(cell, i, j);
            if (!path){
                return;
            }
            if (this._isInDict(path)){
                this.fenceGroup.fences[i].cells[j].status = CellStatus.WAITING;
            } else {
                this.fenceGroup.fences[i].cells[j].status = CellStatus.FORBIDDEN;
            }
            
        })
    }

    _changeCurrentCellStatus(cell, x, y){
        if (cell.status === CellStatus.WAITING){
            //不能直接修改cell，要修改fence里的cell
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
            this.skuPending.insertCell(cell, x);
        } else if (cell.status === CellStatus.SELECTED){
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
            this.skuPending.removeCell(x);
        }
    }


    _findPotentialPath(cell, x, y){
        const joiner = new Joiner("#");
        for (let i = 0; i < this.fenceGroup.fences.length; i++){
            if (i === x){
                //当前行
                //是否是这个行中选中的元素，之前选的会被重置
                if (this.skuPending.isSelected(cell, i)){
                    return;
                }
                joiner.join(this._getCellCode(cell.spec));
            } else{
                const selected = this.skuPending.findCellByX(i);
                if (selected){
                    const code = this._getCellCode(selected.spec);
                    joiner.join(code);
                }
            }
        }
        return joiner.getStr();
    }

    _getCellCode(spec){
        return spec.key_id + "-" + spec.value_id;
    }

    _isInDict(path){
        return this.pathDict.includes(path);
    }
}

export {
    Judger
}