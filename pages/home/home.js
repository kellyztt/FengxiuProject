// pages/home/home.js

import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

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
      themeF: null,
      bannerG: null,
      themeH: null,
      spuPaging: null,
      loadingType: 'loading'
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function () {
      this.initData();
      this.initBottomSpuList();
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
        const themeF = await theme.getHomeLocationF();
        const bannerG = await Banner.getHomeLocationG();
        const themeH = theme.getHomeLocationH();
        let themeESpu = [];
        if (themeE.online){
            const data = await theme.getHomeLocationESpu();
            if (data){
                themeESpu = data.spu_list.splice(0,8);
            }
        }

        this.setData({
            themeA,
            bannerB,
            grid: gridC,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        });
    },

     async initBottomSpuList(){
        const paging = SpuPaging.getLatestPaging();
        this.data.spuPaging = paging;
        const data = await paging.getMoreData();
        if (!data){
            return;
        }
        wx.lin.renderWaterFlow(data.items);
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
  onReachBottom: async function () {
      const data = await this.data.spuPaging.getMoreData();
      if (!data){
          return;
      }
      wx.lin.renderWaterFlow(data.items);
      if (!data.moreData){
          this.setData({
              loadingType: 'end'
          })
      }
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})