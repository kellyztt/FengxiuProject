import {promisic, px2rpx} from "../miniprogram_npm/lin-ui/utils/util";

const getSystemSize = async function(){
    const res = await promisic(wx.getSystemInfo)();
    return {
        windowHeight: res.windowHeight,
        widowWidth: res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight
    }
}

const getWindowHeightRpx = async function(){
    const res = await getSystemSize();
    const h = px2rpx(res.windowHeight);
    return h;
}

export {
    getSystemSize,
    getWindowHeightRpx
}