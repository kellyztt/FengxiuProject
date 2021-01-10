// components/sub-category/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    bannerImg: String,
    categories: Array
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
    onTapGridItem: function(event){
      this.triggerEvent("itemtap", {
        cid: event.detail.key
      })
    }
  }
})
