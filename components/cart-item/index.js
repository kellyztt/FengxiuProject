// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku";
import {Cart} from "../../models/cart";

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
    specStr: String
  },

  /**
   * Component methods
   */
  methods: {

  },

  observers:{
    'cartItem': function (cartItem) {
      if(!cartItem){
        return;
      }
      const specStr = parseSpecValue(cartItem.sku.specs);
      console.log(specStr);
      const discount = cartItem.sku.discount_price ? true : false;
      const soldOut = Cart.isSoldOut(cartItem);
      const online = Cart.isOnline(cartItem);
      this.setData({
        specStr,
        discount,
        soldOut,
        online
      })
    }
  }
})
