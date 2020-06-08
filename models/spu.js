import {Http} from "../utils/httpUtils";

class SPU {

    static getSpuDetail(id) {
        return Http.request({
            url: `/spu/id/${id}/detail`
        })
    }
}
export {
    SPU
}