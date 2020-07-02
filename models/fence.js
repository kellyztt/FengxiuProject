import {Cell} from "./cell";

class Fence{
    cells = [];
    specs;
    title;
    id;

    constructor(specs){
        this.specs = specs;
        this.title = specs[0].key;
        this.id = specs[0].key_id;
    }



    // pushValueTitle(title){
    //     this.cells.push(title);
    // }

    init(){
        this._initCells();
    }

    _initCells(){
        this.specs.forEach(item => {
            const existed = this.cells.some(c => {
                return c.id === item.value_id;
            });
            if (existed){
                return;
            }
            const cell = new Cell(item);
            this.cells.push(cell);
        });
    }

    setFenceSketch(skuList){
        this.cells.forEach(c=>{
            this._setCellSkuImage(c, skuList);
        });
    }

    _setCellSkuImage(cell, skuList){
        const specCode = cell.getSkuCode();
        const matchedSku = skuList.find(item=> item.code.includes(specCode));
        if (matchedSku){
            cell.skuImage = matchedSku.img;
        }
    }
}
export {
    Fence
}