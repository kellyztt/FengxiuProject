// components/realm/index.js
import { FenceGroup } from "../../components/models/fence-group.js";
import { Judger } from "../models/judger.js";
import { Spu } from "../../models/spu.js";
import { Cell } from "../models/cell.js";
import { Cart } from "../../models/cart.js";

Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object,
    orderWay: String
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
    currentValue: "",
    outOfStock: false,
    currentSkuStock: Cart.SKU_MIN_COUNT
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
      this.triggerSpecEvent();
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
      if (judger.isIntact()) {
        const sku = judger.getDeterminateSku();
        this.bindSkuData(sku);
        this.setStockStatus(sku.stock);
      }
      this.bindTipData();
      this.bindFenceGroupData(judger.fenceGroup);
      this.triggerSpecEvent();
    },

    processNoSpec(spu) {
      this.bindSkuData(spu.sku_list[0]);
      this.setData({
        noSpec: true
      });
      this.setStockStatus(spu.sku_list[0].stock);
    },

    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
        this.setStockStatus(defaultSku.stock);
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
    },

    isOutOfStock(stock) {
      return stock < this.data.currentSkuStock;
    },

    setStockStatus(stock) {
      this.setData({
        outOfStock: this.isOutOfStock(stock)
      });
    },

    onSelectCount(event) {
      this.setData({
        currentSkuStock: event.detail.count
      });
      this.setStockStatus(this.data.judger.getDeterminateSku().stock);
    },

    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.properties.spu);
      if (noSpec) {
        this.triggerEvent("specChange", {
          noSpec
        });
      } else {
        this.triggerEvent("specChange", {
          noSpec,
          isIntact: this.data.judger.isIntact(),
          currentValue: this.data.judger.getCurrentValues(),
          missingKeys: this.data.judger.getMissingKeys()
        });
      }
    }
  } 
})
