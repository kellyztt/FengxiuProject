import { promisic, px2rpx } from "../miniprogram_npm/lin-ui/utils/util.js";

const getWindowSize = async function () {
    const system = await promisic(wx.getSystemInfo)();
    return {
        screenHeight: system.screenHeight,
        screenWidth: system.screenWidth,
        windowHeight: system.windowHeight,
        windowWidth: system.windowWidth
    }
}

const getWindowHeightRpx = async function(){
    const { windowHeight } = await getWindowSize();
    return px2rpx(windowHeight);
}

export {
    getWindowSize,
    getWindowHeightRpx
}
