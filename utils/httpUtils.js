import {config} from "../config/config";
import {promisic} from "./util";

class Http {
    static request({url, data, callback, method='GET'}){
        wx.request({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            },
            success: res => {
                callback(res.data)
            }
        })
    }
}
promisic(wx.request)()
export {
    Http
}