// pages/detail/detail.js
import {Http} from "../../utils/httpUtils";
import {SPU} from "../../models/spu";
import {OrderWay} from "../../core/enum";

Page({

  /**
   * Page initial data
   */
  data: {
    showRealm: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await SPU.getSpuDetail(pid);
    this.setData({
      spu
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

  },

  onGoToHome(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  onGoToCart(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  onBuy(){
    this.setData({
      showRealm: true,
      orderWay: OrderWay.BUY
    });
  },

  onAddToCart(){
    this.setData({
      showRealm: true,
      orderWay: OrderWay.CART
    });
  }
})