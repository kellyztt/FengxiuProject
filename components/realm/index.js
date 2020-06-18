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
    judger: Object,
    previewImage: String,
    title: String
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
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku){
        this.bindSkuData(defaultSku)
      } else {
        this.bindSpuData()
      }
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindSpuData: function(){
      const spu = this.properties.spu;
      this.setData({
        previewImage: spu.img,
        title: spu.title
      })
    },

    bindSkuData(sku){
      this.setData({
        previewImage: sku.img,
        title: sku.title
      })
    },

    bindInitData: function (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    onCellTap(event){
      const { cell, x, y } = event.detail;
      const judger = this.data.judger;
      judger.judge(false, cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      });
    }
  }
})
