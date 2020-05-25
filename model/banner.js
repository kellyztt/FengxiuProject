import {Http} from "../utils/httpUtils";

class Banner{
    //get Banner
    static locationB = 'b-1';
    static locationG = 'b-2';
    static async getHomeLocationB(){
        return await Http.request({
            url: `/banner/name/${this.locationB}`
        })
    }

    static async getHomeLocationG(){
        return await Http.request({
            url: `/banner/name/${this.locationG}`
        })
    }
}
export {
    Banner
}