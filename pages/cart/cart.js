import { Cart } from "../../models/cart.js";
// pages/cart/cart.js
const cart = new Cart();
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
  onLoad: function (options) {
   
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
    const cartItems = cart.getAllCartItemFromLocal().items;
    if(cart.isEmpty()){
      this.empty();
    }
    this.setData({
      cartItems
    })
  },

  empty(){
    this.setData({
      isEmpty: true
    });
    wx.hideTabBarRedDot({
      index: 2
  })
  },

  onDelete(){
    
  }

})