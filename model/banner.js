import {Http} from "../utils/httpUtils";

class Banner{
    //get Banner
    static locationB = 'b-1';
    static async getHomeLocationB(){
        return await Http.request({
            url: `/banner/name/${this.locationB}`
        })
    }
}
export {
    Banner
}