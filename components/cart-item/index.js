// components/cart-item/index.js
import { Cart } from "../../models/cart.js";
import { parseSpecValue } from "../../utils/sku.js";
const cart = new Cart();
Component({
  /**
   * Component properties
   */
  properties: {
    cartItem: Object
  },

  /**
   * Component initial data
   */
  data: {
    online: true,
    soldOut: false,
    discount: false,
    specStr: "",
    stock: Cart.SKU_MAX_COUNT,
    count: 1
  },

  observers: {
    "cartItem": function(cartItem){
      if (!cartItem){
        return;
      }
      const specStr = parseSpecValue(cartItem.sku.specs);
      const count = cartItem.count;
      const { discount_price, stock } = cartItem.sku;
      const soldOut = Cart.isSoldOut(cartItem);
      const online = Cart.isOnline(cartItem);
      this.setData({
        specStr,
        online,
        soldOut,
        discount: discount_price !== null,
        stock,
        count
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    checkedItem: function(event){
      this.properties.cartItem.checked = event.detail.checked
      cart.checkItem(this.properties.cartItem.sku.id);
      this.triggerEvent("itemcheck", {

      });
    },

    onOutNumber: function(){

    },

    onSelectCount: function(event){
      const count = event.detail.count;
      cart.replaceItemCount(this.properties.cartItem.sku.id, count);
      this.triggerEvent("countfloat")
    },

    onDelete: function(event){
      const skuId = this.properties.cartItem.sku.id
      cart.removeItem(skuId);
      this.setData({
        cartItem: null
      })
      this.triggerEvent("itemdelete", {
        skuId
      });
    }
  }
})
