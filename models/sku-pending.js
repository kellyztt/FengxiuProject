import {Cell} from "./cell";

class SkuPending{

    pending = [];
    constructor(){

    }
    init(sku){
        const specs = sku.specs;
        for (let i = 0; i < specs.length; i++){
            const cell = new Cell(specs[i]);
            this.insertCell(cell, i);
        }
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
}

export {
    SkuPending
}