import { SkuCode } from "./sku-code.js";
import { CellStatus } from "../../core/enum.js";
import { SkuPending } from "../models/sku-pending.js";
import { Joiner } from "../../utils/joiner.js";

class Judger{
    fenceGroup;
    pathDict = [];
    skuPending;
    constructor(fenceGroup){
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkuPending();
    }

    judge(cell, x, y, isInit=false){
        if (!isInit){
            this._changeCurrentCellStatus(cell, x, y);
        }
        this.fenceGroup.eachCell((cell, i, j) => {
            const path = this._findPotentialPath(cell, i, j);
            if (!path){
                return;
            }
            if (this._isInDict(path)){
                this.fenceGroup.setCellStatusByXY(i, j, CellStatus.WAITING);
            } else {
                this.fenceGroup.setCellStatusByXY(i, j, CellStatus.FORBIDDEN);
            } 
        })
    }

    isIntact(){
        return this.skuPending.isIntact();
    }

    getDeterminateSku(){
        return this.fenceGroup.getSku(this.skuPending.getSkuCode());
    }

    getMissingKeys(){
        const keys = this.skuPending.getMissingSpecKeysIndex();
        return keys.map(key => {
            return this.fenceGroup.fences[key].title
        });
    }

    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues();
    }

    _getCellCode(spec){
        return spec.key_id + "-" + spec.value_id;
    }

    _initPathDict(){
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code);
            this.pathDict = this.pathDict.concat(skuCode.totalSegments);
        });
    }

    _initSkuPending(){
        this.skuPending = new SkuPending(this.fenceGroup.fences.length);
        const defaultSku = this.fenceGroup.getDefaultSku();
        if (!defaultSku){
            return;
        }
        this.skuPending.init(defaultSku);
        this._initSelectedCell();
        this.judge(null, null, null, true);
    }

    _changeCurrentCellStatus(cell, x, y){
        if (cell.status == CellStatus.WAITING){
            //不能直接修改cell，要修改fence里的cell
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
            this.skuPending.insertCell(cell, x);
        } if (cell.status == CellStatus.SELECTED){
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
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
                joiner.join(cell.getCellCode());
            } else{
                const selected = this.skuPending.findCellByX(i);
                if (selected){
                    const code = selected.getCellCode();
                    joiner.join(code);
                }
            }
        }
        return joiner.getStr();
    }

    _isInDict(path){
        return this.pathDict.includes(path);
    }

    _initSelectedCell(){
        this.skuPending.pending.forEach(c => {
            this.fenceGroup.setCellStatusById(c.id, CellStatus.SELECTED);
        })
    }
}

export {
    Judger
}