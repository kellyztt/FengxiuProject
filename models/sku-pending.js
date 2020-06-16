class SkuPending{

    pending = [];
    constructor(){

    }

    insertCell(cell, x){
        if (this.pending[x]){
            return;
        }
        this.pending[x] = cell;
    }

    removeCell(x){
        this.pending[x] = null;
    }
}

export {
    SkuPending
}