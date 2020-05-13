//业务对象
import {Http} from "../utils/httpUtils";

class Theme{
    //TODO: Why static?
    static getHomeLocationA(callback){
        Http.request({
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
