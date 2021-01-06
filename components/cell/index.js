// components/cell/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number
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
    onTap: function(){
      const { cell, x, y } = this.properties;
      this.triggerEvent("celltap", {
        cell: cell,
        x: x,
        y: y
      }, {
        bubbles: true,
        composed: true
      });
    }
  }
})
