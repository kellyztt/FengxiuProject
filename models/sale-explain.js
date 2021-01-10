import { Http } from "../utils/http.js";

class SaleExplain{
    static async getFixed(){
        const arr = await Http.request({
            url: "sale_explain/fixed"
        });
        return arr.map(f => f.text);
    }
}

export { SaleExplain }