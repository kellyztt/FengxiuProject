// components/spu-description/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object
  },

  /**
   * Component initial data
   */
  data: {
    tags: Array
  },

  observers: {
    'spu': function(spu){
      if (!spu || !spu.tags){
        return;
      }
      const tags = spu.tags.split('$');
      this.setData({
        tags
      })
    }
  },
  /**
   * Component methods
   */
  methods: {

  }
})
