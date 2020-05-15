//业务对象
import {Http} from "../utils/httpUtils";

class Theme{
    //TODO: Why static?
    static async getHomeLocationA(){
        return await Http.request({
            url: '/theme/by/names',
            data: {
                names: 't-1'
            }
        });
    }
}
export {
    Theme
}
