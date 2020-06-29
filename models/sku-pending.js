import {Cell} from "./cell";
import {Joiner} from "../utils/joiner";

class SkuPending{

    pending = [];
    size;
    constructor(size){
        this.size = size;
    }

    //如果含有默认sku，skupending中存的是模型对象；如果是点击之后，推进数组的是渲染层返回的数据
    init(sku){
        const specs = sku.specs;
        for (let i = 0; i < specs.length; i++){
            const cell = new Cell(specs[i]);
            this.insertCell(cell, i);
        }
    }

    isIntact(){
        if (this.pending.length != this.size){
            return false;
        }
        for (let i = 0; i < this.size; i++){
            if (this._isEmptyPart(i)){
                return false;
            }
        }
        return true;
    }

    insertCell(cell, x){
        this.pending[x] = cell;
    }

    removeCell(x){
        this.pending[x] = null;
    }

    findSelectedCellByX(x){
        return this.pending[x];
    }

    isSelected(cell, x){
        const pendingCell = this.pending[x];
        if (!pendingCell){
            return false;
        }
        return cell.id === pendingCell.id;
    }

    getSkuCode(){
        const joiner = new Joiner('#');
        this.pending.forEach(cell => {
            const code = cell.getSkuCode();
            joiner.join(code);
        })
        return joiner.getStr();
    }

    getCurrentSpecValue(){
        return this.pending.map(item => {
            return item ? item.spec.value : null;
        });
    }

    getMissingSpecKeysIndex(){
        const keysIndex = [];
        for (let i = 0; i < this.size; i++){
            if (!this.pending[i]){
                keysIndex.push(i);
            }
        }
        return keysIndex;
    }

    _isEmptyPart(index){
        return !this.pending[index];
    }
}

export {
    SkuPending
}