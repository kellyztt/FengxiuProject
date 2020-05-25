import {Http} from "../utils/httpUtils";

class Spu{
    static async getLatest(){
        return await Http.request({
            url: "/spu/latest",
            data: {
                start: 0,
                count: 8
            }
        })
    }
}