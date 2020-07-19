// pages/cart/cart.js
import {Cart} from "../../models/cart";
import {Calculator} from "../../models/calculator";

const cart = new Cart();
Page({

    /**
     * Page initial data
     */
    data: {
        cartItems: [],
        isEmpty: false,
        allChecked: false,
        totalPrice: 0,
        totalSkuCount: 0
    },

    /**
     * Lifecycle function--Called when page load
     */
    //页面加载的时候,第一次打开的时候，切换tab不会执行
    onLoad: function (options) {

    },

    //切换tab会执行，优点是刷新频率，数据新鲜程度更高
    onShow: function (options) {
        const cartItems = cart.getAllCartItemFromLocal().items;
        if (cart.isEmpty()) {
            this.empty();
            return;
        }
        this.setData({
            cartItems: cartItems
        });
        this.notEmpty();
        this.isAllChecked();
        this.refreshCartData();
    },

    empty() {
        this.setData({
            isEmpty: true
        });
        wx.hideTabBarRedDot({
            index: 2
        })
    },

    notEmpty() {
        this.setData({
            isEmpty: false
        });
        wx.showTabBarRedDot({
            index: 2
        })
    },

    isAllChecked() {
        const allChecked = cart.isAllChecked();
        this.setData({
            allChecked
        })
    },

    onDeleteItem(event){
        this.isAllChecked();
        this.refreshCartData();
    },

    onSingleCheck(event){
        this.isAllChecked();
        this.refreshCartData();
    },

    onCheckAll(event){
        const checked = event.detail.checked;
        cart.checkAll(checked);
        this.setData({
            cartItems: this.data.cartItems
        });
        this.refreshCartData();
    },

    onCountFloat(event){
        this.refreshCartData();
    },

    refreshCartData(){
        const checkedItems = cart.getCheckedItems();
        const calculator = new Calculator(checkedItems);
        calculator.calc();
        this.setCalcData(calculator);
    },

    setCalcData(calculator){
        const totalPrice = calculator.getTotalPrice();
        const totalSkuCount = calculator.getTotalSkuCount();
        this.setData({
            totalPrice,
            totalSkuCount
        })
    }
})