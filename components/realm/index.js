// components/realm/index.js
import {FenceGroup} from "../../models/fence-group";
import {Judger} from "../../models/judger";

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
    fences: Object,
    judger: Object
  },
  observers: {
    "spu": function(spu){
      if (!spu){
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      //const fences = fenceGroup.initFence();
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindInitData: function (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    onCellTap(event){
      const { cell, x, y } = event.detail;
      const judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fences: judger.fenceGroup.fences
      });
    }
  }
})
