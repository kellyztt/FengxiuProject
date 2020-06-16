import {SkuCode} from "./sku-code";
import {CellStatus} from "../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../utils/joiner";

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


        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            console.log(path);
        });
    }


    //选了一个cell之后，判断其他cell的状态
    _findPotentialPath(cell, x, y){
        const joiner = new Joiner('#');
        for (let i = 0; i < this.fenceGroup.fences.length; i++){
            const selected = this.skuPending.findSelectedCellByX(i);
            //当前行，遍历到的行
            if (x === i){
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