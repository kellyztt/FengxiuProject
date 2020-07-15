// components/check-box/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    checked: Boolean
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
    onCheck(event){
      let checked = this.properties.checked;
      checked = !checked;
      this.setData({
        checked
      });
      this.triggerEvent('check',{
        checked
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})
