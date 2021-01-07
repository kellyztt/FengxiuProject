import { Joiner } from "../../utils/joiner";
import { Cell } from "./cell";

class SkuPending{
    pending = [];
    size;
    constructor(size){
        this.size = size;
    }

    init(sku){
        for (let i = 0; i < sku.specs.length; i++){
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }  
    }

    insertCell(cell, x){
        this.pending[x] = cell;
    }

    removeCell(x){
        this.pending[x] = null;
    }

    findCellByX(x){
        return this.pending[x]; 
    }

    isSelected(cell, x){
        const pendingCell = this.pending[x];
        if (!pendingCell){
            return false;
        }
        return cell.id === pendingCell.id;
    }

    isIntact(){
        if (this.pending.length !== this.size){
            return false;
        }
        for (let i = 0; i < this.size; i++){
            if (this._isEmptyPart(i)){
                return false;
            }
        }
        return true;
    }

    getSkuCode(){
        const joiner = new Joiner("#");
        this.pending.forEach(c => {
            joiner.join(c.getCellCode());
        });
        return joiner.getStr();
    }

    getMissingSpecKeysIndex(){
        const keys = [];
        for (let i = 0; i < this.size; i++){
            if (this._isEmptyPart(i)){
                keys.push(i);
            }
        }
        return keys;
    }

    getCurrentSpecValues(){
        return this.pending.map(c => {
            if (c){
                return c.title;
            }
        })
    }

    _isEmptyPart(index){
        return !this.pending[index];
    }
}

export {
    SkuPending
}