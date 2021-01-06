import { Cell } from "./cell.js";

class Fence{
    //valueTitles = [];
    cells = [];
    specs;
    title;
    id;

    constructor(specs){
        this.specs = specs;
        this.title = specs[0].key;
        this.id = specs[0].key_id;
    }

    init(){
        this._initCells();
    }

    _initCells(){
        this.specs.forEach(item => {
            //this.pushValueTitle(item.value);
            const existed = this.cells.some(c => c.id === item.value_id)
            if (existed){
                return;
            }
            const cell = new Cell(item);
            this.cells.push(cell);
        })
    }

    // pushValueTitle(title){
    //     this.valueTitles.push(title);
    // }
}

export { Fence }