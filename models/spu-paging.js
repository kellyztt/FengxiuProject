import { Paging } from "../utils/paging.js";
class SpuPaging {
    static getLatestPaging(){
        return new Paging({url: "spu/latest"});
    }
}

export { SpuPaging }