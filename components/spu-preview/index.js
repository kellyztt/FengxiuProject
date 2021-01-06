// components/demo/index.js
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
    tags: []
  },

  observers: {
    "data": function(data){
      if (!data){
        return;
      }
      if (!data.tags){
        return;
      }
      const tags = data.tags.split("$");
      this.setData({
        tags
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    onItemTap: function(){
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${this.properties.data.id}`
      })
    }
  }
})
