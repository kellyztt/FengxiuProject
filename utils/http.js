import { config } from "../config/config.js";
import { promisic} from "../miniprogram_npm/lin-ui/utils/util";
class Http {
    static async request({url, method="GET", data={}}){
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            method,
            data,
            header: {
                appkey: config.appKey
            },
        });
        return res.data;
    }
}

export {
    Http
}