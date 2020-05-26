import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static async request({url, data, method='GET'}){
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        });
        return res.data;
    }
    //TODO:统一异常处理的方案
}

export {
    Http
}