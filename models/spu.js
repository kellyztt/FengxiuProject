import {Http} from "../utils/httpUtils";

class SPU {

    static getSpuDetail(id) {
        return Http.request({
            url: `/spu/id/${id}/detail`
        })
    }

    //无规格：有一个SKU，但是没有规格值
    static isNoSpec(spu){
        if(spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0){
            return true;
        }
        return false;
    }
}
export {
    SPU
}