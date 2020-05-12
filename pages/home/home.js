// pages/home/home.js
import {config} from "../../config/config";

Page({

  /**
   * Page initial data
   */
  data: {
      topTheme: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      wx.request({
          url: `${config.apiBaseUrl}/v1/theme/by/names`,
          method: 'GET',
          data: {
              names: 't-1',
          },
          header: {
              appkey: config.appkey
          },
          //this指向改变
          success: res => {
              this.setData({
                  topTheme: res.data[0]
              })
          }
      })
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