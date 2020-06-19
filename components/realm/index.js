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
    title: String,
    price: String,
    discountPrice: String,
    stock: Number
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
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },

    bindSkuData(sku){
      console.log(sku)
      console.log(sku.stock)
      this.setData({
        previewImage: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        //only sku has stock
        stock: sku.stock
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
