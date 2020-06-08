// components/realm/index.js
import {FenceGroup} from "../../models/fence-group";

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

  },
  observers: {
    "spu": function(spu){
      if (!spu){
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      //const fences = fenceGroup.initFence();
      fenceGroup.initFences();
      this.bindInitData(fenceGroup.fences);
      console.log(fenceGroup.fences);
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindInitData: function (fenceGroup) {
      this.setData({
        fenceGroup
      })
    }
  }
})
