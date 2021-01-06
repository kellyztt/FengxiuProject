import { Paging } from "../utils/paging.js";
class SpuPaging {
    static getLatestPaging(){
        return new Paging("spu/latest");
    }
}

export { SpuPaging }