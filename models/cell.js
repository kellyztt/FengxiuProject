import {CellStatus} from "../core/enum";

class Cell{
    title;
    id;
    status = CellStatus.WAITING;

    //single spec
    constructor(spec){
        this.title = spec.value;
        this.id = spec.value_id;
    }
}
export {
    Cell
}