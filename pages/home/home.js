// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({

  /**
   * Page initial data
   */
  data: {
      themeA: null,
      bannerB: null,
      grid:[],
      activityD: null,
      themeE: null,
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function () {
      this.initData();

  },

    async initData () {
        const theme = new Theme();
        //after that, themes[] has data
        await theme.getThemes();
        const themeA = theme.getHomeLocationA();
        const bannerB = await Banner.getHomeLocationB();
        const gridC = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();
        const themeE = theme.getHomeLocationE();
        this.setData({
            themeA,
            bannerB,
            grid: gridC,
            activityD,
            themeE
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