import {CellStatus} from "../core/enum";

class Cell{
    title;
    id;
    status = CellStatus.WAITING;
    spec;
    skuImage;

    //single spec
    constructor(spec){
        this.title = spec.value;
        this.id = spec.value_id;
        this.spec = spec;
    }

    getSkuCode(){
        return this.spec.key_id + '-' + this.spec.value_id;
    }
}
export {
    Cell
}