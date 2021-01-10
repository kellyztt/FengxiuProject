import { Http } from "../utils/http.js";
class Category{
    static async getCategoryGrid(){
        return await Http.request({
            url: "category/grid/all"
        })
    }
}

export { Category }