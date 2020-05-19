import {Http} from "../utils/httpUtils";

class Category{
    static async getCatagoryGrid(){
        return await Http.request({
            url: "/category/grid/all"
        })
    }
}
export {
    Category
}