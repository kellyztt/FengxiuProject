// components/spu-preview/index.js
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

  }
})
