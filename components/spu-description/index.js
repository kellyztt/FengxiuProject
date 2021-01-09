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
    tags: []
  },

  observers: {
    "spu": function(spu){
      if (!spu){
        return;
      }
      if (!spu.tags){
        return;
      }
      this.setData({
        tags: spu.tags.split("$")
      })
    }
  },

  /**
   * Component methods
   */
  methods: {

  }
})
