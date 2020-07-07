// components/sub-category/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    categories: Array,
    bannerImg: String
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
    onTapGridItem(event){
      const id = event.detail.key;
      this.triggerEvent('itemTap', {
        cid: id
      })
    }

  }
})
