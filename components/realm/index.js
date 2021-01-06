// components/realm/index.js
import { FenceGroup } from "../../components/models/fence-group.js";
import { Judger } from "../models/judger.js";

Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object,
  },

  /**
   * Component initial data
   */
  data: {
    fenceGroup: null,
    judger: null
  },

  observers: {
    "spu": function(spu){
      if (!spu){
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      this.setData({
        fenceGroup: fenceGroup
      })
    }
  },

  /**
   * Component methods
   */
  methods: {
    onCellTap: function(event){
      const { cell, x, y } = event.detail;
      const judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fenceGroup: judger.fenceGroup
      })
    }
  }
})
