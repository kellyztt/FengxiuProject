// components/hot-list/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    banner: Object
  },

  observers: {
    'banner': function(banner){
      if (!banner || banner.items.length <= 0){
        return;
      }
      const leftItem = banner.items.find(item => item.name === 'left');
      const rightTopItem = banner.items.find(item => item.name === 'right-top');
      const rightBottomItem = banner.items.find(item => item.name === 'right-bottom');
      this.setData({
        leftItem,
        rightTopItem,
        rightBottomItem
      })
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

  }
})
