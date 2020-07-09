// components/spu-preview-r/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    data: Object
  },

  /**
   * Component initial data
   */
  data: {
    tags: Array
  },

  observers: {
    'data': function(data){
      if (!data){
        return;
      }
      console.log('data', data);
      const tags = data.tags;
      if (!tags){
        return;
      }
      this.setData({
        tags: tags.split('$')
      });
    }
  },
  /**
   * Component methods
   */
  methods: {
    onItemTap(event){
      const pid = event.currentTarget.dataset.pid;
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      })
    }
  }
})
