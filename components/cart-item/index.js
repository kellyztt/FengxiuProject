// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku";
import {Cart} from "../../models/cart";

const cart = new Cart();
Component({
  /**
   * Component properties
   */
  properties: {
    cartItem: Object,
  },

  /**
   * Component initial data
   */
  data: {
    soldOut: Boolean,
    online: Boolean,
    discount: Boolean,
    specStr: String,
    stock: Cart.SKU_MAX_COUNT,
    skuCount: Number
  },

  /**
   * Component methods
   */
  methods: {
    onDelete(event){
      const skuId = this.properties.cartItem.skuId;
      cart.removeItem(skuId);
      this.setData({
        cartItem: null
      });
      //calculate total
      this.triggerEvent('itemdelete', {
        skuId
      })
    },

    checkedItem(event){
      const checked = event.detail.checked;
      cart.checkItem(this.properties.cartItem.skuId);
      //手动更新item的状态
      this.properties.cartItem.checked = checked;
      this.triggerEvent('itemcheck', {

      })
    },

    onSelectCount(event){
      let newCount = event.detail.count;
      cart.replaceItemCount(this.properties.cartItem.skuId, newCount)
      this.triggerEvent('countfloat');
    }
  },

  observers:{

    'cartItem': function (cartItem) {
      if(!cartItem){
        return;
      }
      const specStr = parseSpecValue(cartItem.sku.specs);
      const discount = cartItem.sku.discount_price ? true : false;
      const soldOut = Cart.isSoldOut(cartItem);
      const online = Cart.isOnline(cartItem);
      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock:cartItem.sku.stock,
        skuCount: cartItem.count
      });
    }

  }
})
