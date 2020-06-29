// components/counter/index.js
import {Cart} from "../../models/cart";

Component({
  /**
   * Component properties
   */
  properties: {
    counter:{
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    ceiling: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    ouOverStack(event){
      const minOrMaxOut = event.detail.type;
      if (minOrMaxOut === 'overflow_max'){
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: '超出最大购买数量'
        })
      }
      if(minOrMaxOut === 'overflow_min'){
        wx.showToast({
          icon: 'none',
          duration: 3000,
          title: `最少需要购买${Cart.SKU_MIN_COUNT}件噢 `
        })
      }

    }
  }
})
