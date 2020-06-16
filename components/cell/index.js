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
    onTap(event){
      this.triggerEvent('cellTap', {
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y
      }, {
        bubbles: true,
        composed: true
      });
    }
  }
})
