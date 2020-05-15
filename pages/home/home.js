// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";

Page({

  /**
   * Page initial data
   */
  data: {
      themeA: null,
      bannerB: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function () {
      initData();
  },

    async initData(){
        const themeA = await Theme.getHomeLocationA();
        const bannerB = await Banner.getHomeLocationB();
        this.setData({
            themeA: themeA[0],
            BannerB: bannerB
        });
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

  }
})