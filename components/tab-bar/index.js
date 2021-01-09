// components/tab-bar/index.js
Component({
  /**
   * Component properties
   */
  properties: {

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
    onGoToHome: function(){
      this.triggerEvent("gotoHome");
    },
    onGoToCart: function(){
      this.triggerEvent("gotoCart");
    },
    onAddToCart: function(){
      this.triggerEvent("addToCart");
    },
    onBuy: function(){
      this.triggerEvent("buy");
    }
  }
})
