// components/spu-scroll/index.js

Component({
  /**
   * Component properties
   */
  externalClasses: ['l-class'],
  properties: {
    theme: Object,
    spuList: Array

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
    onTap(event){
      const pid = event.currentTarget.dataset.spuId;
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    }
  }
})
