import {Http} from "../utils/httpUtils";

class SaleExplain{
    static async getFixed(){
        const explains = await Http.request({
            url: '/sale_explain/fixed'
        });
        return explains.map(item=>item.text);
    }
}

export {
    SaleExplain
}