// components/realm/index.js
import { FenceGroup } from "../../components/models/fence-group.js";
import { Judger } from "../models/judger.js";
import { Spu } from "../../models/spu.js";
import { Cell } from "../models/cell.js";

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
    judger: null,
    image: "",
    title: "",
    price: "",
    discoutPrice: "",
    stock: 0,
    noSpec: false,
    isIntact: null,
    missingKeys: "",
    currentValue: ""
  },

  observers: {
    "spu": function (spu) {
      if (!spu) {
        return;
      }
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu);
      } else {
        this.processHasSpec(spu);
      }
    }
  },
  /**
   * Component methods
   */
  methods: {
    onCellTap: function (event) {
      const { x, y } = event.detail;
      const data = event.detail.cell;
      const judger = this.data.judger;
      const cell = new Cell(data.spec);
      cell.status = data.status;

      judger.judge(cell, x, y);
      if (judger.isIntact()){
        const sku = judger.getDeterminateSku();
        this.bindSkuData(sku);
      }
      this.bindTipData();
      this.bindFenceGroupData(judger.fenceGroup);
    },

    processNoSpec(spu) {
      this.bindSkuData(spu.sku_list[0]);
      this.setData({
        noSpec: true
      });
    },

    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
      } else {
        this.bindSpuData();
      }
      this.bindTipData();
      this.bindFenceGroupData(fenceGroup);
    },

    bindSpuData() {
      const spu = this.properties.spu;
      this.setData({
        image: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },

    bindSkuData(sku) {
      this.setData({
        image: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fenceGroup: fenceGroup
      })
    },

    bindTipData() {
      this.setData({
        isIntact: this.data.judger.isIntact(),
        currentValue: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    }
  }
})
