import { Cart } from "../../models/cart.js";
import { Calculator } from "../../models/calculator.js";
// pages/cart/cart.js
const cart = new Cart();
Page({

  /**
   * Page initial data
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: true,
    totalPrice: 0,
    skuCount: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
   
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    const cartItems = cart.getAllCartItemFromLocal().items;
    if(cart.isEmpty()){
      this.empty();
      return;
    }
    this.setData({
      cartItems,
    });
    this.notEmpty();
    this.isAllChecked();
    this.refreshCartData();
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
  },

  onSingleCheck(){
    this.isAllChecked();
    this.refreshCartData();
  },

  onDelete(){
    this.isAllChecked();
    this.refreshCartData();
    if (cart.isEmpty()){
      this.empty();
    }
  },

  onCountFloat(event){
    this.refreshCartData();
  },

  isAllChecked(){
    const allChecked = cart.isAllChecked();
    this.setData({
      allChecked
    })
  },

  onCheckAll(event){
    let allChecked = event.detail.checked;
    cart.checkAll(allChecked);
    this.setData({
      cartItems: this.data.cartItems
    });
    this.refreshCartData();
  },

  refreshCartData(){
    const checkedItems = cart.getCheckedItems();
    const calculator = new Calculator(checkedItems);
    calculator.calc();
    this.setCalData(calculator);
  },

  setCalData(calculator){
    const totalPrice = calculator.getTotalPrice();
    const totalSkuCount = calculator.getTotalSkuCount();
    this.setData({
      totalPrice,
      skuCount: totalSkuCount
    })
  }

})