import { Spu } from "../../models/spu.js";
import { OrderWay } from "../../core/enum.js";
import { SaleExplain } from "../../models/sale-explain.js";
import { getWindowHeightRpx } from "../../utils/system.js";

// pages/detail/detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    spu: null,
    showRealm: false,
    orderWay: OrderWay.CART,
    spec: null,
    explain: null,
    h: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    const explain = await SaleExplain.getFixed();
    this.setData({
      spu,
      explain
    });  
    this.calculateHeight();
  },

  onSpecChange: function(event){
    this.setData({
      spec: event.detail
    })
  },

  onGotoHome: function(){
    wx.switchTab({
      url: "/pages/home/home"
    });
  },

  onGotoCart: function(){
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  },

  onAddToCart: function(){
    this.setData({
      showRealm: true,
      orderWay: OrderWay.CART
    });
  },

  onBuy: function(){
    this.setData({
      showRealm: true,
      orderWay: OrderWay.BUY
    });
  },

  async calculateHeight(){
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100;
    this.setData({
      h
    })
  },


  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})