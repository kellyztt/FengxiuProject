// pages/category/category.js
import {getSystemSize, getWindowHeightRpx} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../models/categories";

Page({

    /**
     * Page initial data
     */
    data: {
        categories: Object
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.setDynamicSegmentHeight();
    },

    async setDynamicSegmentHeight() {
        const res = await getSystemSize();
        const windowHeightRpx = await getWindowHeightRpx();
        //searchbox:60 margin-top:20 border:2
        const h = windowHeightRpx - 60 - 20 - 2;
        this.setData({
            h
        })
    },

    async initCategoryData() {
        const categories = new Categories();
        this.data.categories = categories;
        await categories.getAll();
        const roots = categories.getRoots();
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },

    onGoToSearch(event) {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    }
})