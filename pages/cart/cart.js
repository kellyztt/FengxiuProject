// pages/cart/cart.js
import {Cart} from "../../models/cart";

Page({

  /**
   * Page initial data
   */
  data: {
    cartItems: [],
    isEmpty: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  //页面加载的时候,第一次打开的时候，切换tab不会执行
  onLoad: function (options) {

  },

  //切换tab会执行，优点是刷新频率，数据新鲜程度更高
  onShow: function(options){
    const cart = new Cart();
    const cartItems = cart.getAllCartItemFromLocal().items;
    if (cart.isEmpty()){
      this.empty();
      return;
    }
    this.setData({
      cartItems:cartItems
    });
    this.notEmpty();
  },

  empty(){
    this.setData({
      isEmpty: true
    });
    wx.hideTabBarRedDot({
      index: 2
    })
  },

  notEmpty(){
    this.setData({
      isEmpty: false
    });
    wx.showTabBarRedDot({
      index: 2
    })
  }

})