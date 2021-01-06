// pages/home/home.js
import { Theme } from "../../models/theme.js";
import { Banner } from "../../models/banner.js";
import { Category } from "../../models/category.js";
import { Activity } from "../../models/activity.js";
import { SpuPaging } from "../../models/spu-paging.js";

Page({

  /**
   * Page initial data
   */
  data: {
      themeLocationA: null,
      bannerLocationB: null,
      categoryLocationC: [],
      activityD: null,
      themeLocationE: null,
      themeESpuList: [],
      themeLocationF: null,
      bannerLocationG: null,
      themeLocationH: null,
      spuPaging: null,
      loadingType: "loading"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function () {
      this.initAllData();
      this.initBottomSpuList();
  },

  async initAllData(){
    //const themeLocationA = await Theme.getHomeThemeLocationA();
    const theme = new Theme();
    await theme.getThemes();
    const themeLocationA = theme.getHomeThemeLocationA();
    const bannerLocationB = await Banner.getHomeLocationB();
    const categoryLocationC = await Category.getCategoryGrid();
    const activityD = await Activity.getCouponActivity();
    const themeLocationE = theme.getHomeThemeLocationE();
    const themeLocationF = theme.getHomeThemeLocationF();
    const bannerLocationG = await Banner.getHomeLocationG();
    const themeLocationH = theme.getHomeThemeLocationH();
    let themeESpuList = [];
    if (themeLocationE.online){
      const data = await Theme.getThemeESpuList();
      if (data){
        themeESpuList = data.spu_list.slice(0, 8);
      }
    }
    this.setData({
      themeLocationA,
      bannerLocationB,
      categoryLocationC,
      activityD,
      themeLocationE,
      themeESpuList,
      themeLocationF,
      bannerLocationG,
      themeLocationH
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
     this.setData({
       loadmore: true
     });
     const paging = this.data.spuPaging;
     const data = await paging.getMoreData();
     if (!data){
      return;
    }
    wx.lin.renderWaterFlow(data.items);
    if (!data.moreData){
      this.setData({
        loadingType: "end"
      })
    }
    
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})