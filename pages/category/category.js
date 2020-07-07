// pages/category/category.js
import {getSystemSize, getWindowHeightRpx} from "../../utils/system";
import {Categories} from "../../models/categories";
import { SpuListType } from "../../core/enum";

Page({

    /**
     * Page initial data
     */
    data: {
        categories: Object,
        defaultRootId: 2,
        roots: Array,
        currentSubs: Array,
        currentBannerImg: String
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        this.setDynamicSegmentHeight();
        this.initCategoryData();
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
        const defaultRoot = this.getDefaultRoot(roots);
        const currentSubs = categories.getSubs(defaultRoot.id);
        this.setData({
            roots,
            currentSubs,
            currentBannerImg: defaultRoot.img
        })
    },

    getDefaultRoot(roots){
        let defaultRoot = roots.find(item => item.id === this.data.defaultRootId);
        if (!defaultRoot){
            defaultRoot = roots[0];
        }
        return defaultRoot;
    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

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
    },

    onSegChange(event){
        const rootId = event.detail.activeKey;
        const currentSubs = this.data.categories.getSubs(rootId);
        console.log(this.data.categories);
        console.log(currentSubs);
        const root = this.data.categories.getRoot(rootId);
        this.setData({
            currentSubs,
            currentBannerImg: root.img
        })
    },

    onJumpToSpuList(event){
        const cid = event.detail.cid;
        wx.navigateTo({
            url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
        })
    }
})