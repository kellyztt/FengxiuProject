import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../utils/joiner";
import {Cell} from "./cell";

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
        const defaultSku = this.fenceGroup.getDefaultSku();
        if (!defaultSku){
            return;
        }
        this.skuPending.init(defaultSku);
        this._initSelectedCell();
        this.judge(true);
    }

    _initSelectedCell(){
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
        })
    }

    judge(init=false, cell, x, y){
        if (!init){
            this._changeCurrentCellStatus(cell, x, y);
        }
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            if (!path){
                return;
            }
            const inDict = this._isInDict(path);
            if (!inDict){
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            }
        });
    }


    //选了一个cell之后，判断其他cell的状态
    _findPotentialPath(cell, x, y){
        const joiner = new Joiner('#');
        for (let i = 0; i < this.fenceGroup.fences.length; i++){
            const selected = this.skuPending.findSelectedCellByX(i);
            //当前行，遍历到的行
            if (x === i){
                if (this.skuPending.isSelected(cell, x)){
                    return;
                }
                const cellCode = this._getCellCode(cell.spec);
                joiner.join(cellCode);
            } else {
                //判断其他行选中的元素
                if(selected){
                    const selectedCellCode = this._getCellCode(selected.spec);
                    joiner.join(selectedCellCode);
                }
            }
        }
        return joiner.getStr();

    }

    _getCellCode(spec){
        return spec.key_id + '-' + spec.value_id;
    }

    _isInDict(path){
        return this.pathDict.includes(path);
    }

    _changeCurrentCellStatus(cell, x, y){
        if (cell.status === CellStatus.WAITING){
            this.skuPending.insertCell(cell, x);
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
        } else if (cell.status === CellStatus.SELECTED){
            this.skuPending.removeCell(x);
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
        }
    }
}

export {
    Judger
}