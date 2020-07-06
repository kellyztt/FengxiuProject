// components/sale-explain/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    texts: Array
  },

  /**
   * Component initial data
   */
  data: {
    _texts: Array
  },

  observers: {
    'texts': function(texts){
      this.setData({
        _texts: texts
      })
    }
  },
  /**
   * Component methods
   */
  methods: {

  }
})
