import {Http} from "../utils/httpUtils";

class Tags{
    static async getSearchTags(){
        return await Http.request({
            url: '/tag/type/1'
        });
    }
}

export {
    Tags
}