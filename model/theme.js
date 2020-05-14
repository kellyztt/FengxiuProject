//业务对象
import {Http} from "../utils/httpUtils";

class Theme{
    //TODO: Why static?
    static async getHomeLocationA(callback){
        const data = await Http.request({
            url: '/theme/by/names',
            data: {
                names: 't-1'
            },
            callback: data => {
                callback(data)
            }})
    }
}
export {
    Theme
}
