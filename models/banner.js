import { Http } from "../utils/http.js";
class Banner {
    static locationBName = "b-1";
    static locationGName = "b-2";
    static async getHomeLocationB(){
        return Banner.getHomeBanner(Banner.locationBName);
    }
    static async getHomeLocationG(){
        return Banner.getHomeBanner(Banner.locationGName);
    }

    static getHomeBanner(name){
        return Http.request({
            url: `banner/name/${name}`
        });
    }
} 
export { Banner }