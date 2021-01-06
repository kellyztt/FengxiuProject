import { Http } from "../utils/http.js";
class Activity {
    static couponName = "a-2";
    static async getCouponActivity(){
        return await Http.request({
            url: `activity/name/${Activity.couponName}`
        })
    }
}

export { Activity }