// components/realm/index.js
import {FenceGroup} from "../../models/fence-group";
import {Judger} from "../../models/judger";
import {SPU} from "../../models/spu";
import {Joiner} from "../../utils/joiner";
import {Cell} from "../../models/cell";
import {Cart} from "../../models/cart"
;
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
        stock: Number,
        noSpec: Boolean,
        skuIntact: Boolean,
        curSkuCount: Cart.SKU_MIN_COUNT
    },

    observers: {
        "spu": function(spu){
            if (!spu){
                return;
            }
            if (SPU.isNoSpec(spu)){
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
        processNoSpec(spu){
            this.setData({
                noSpec: true,
            });
            this.bindSkuData(spu.sku_list[0]);
            this.setStockStatus(spu.sku_list[0].stock);
            return;
        },

        processHasSpec(spu){
            const fenceGroup = new FenceGroup(spu);
            //const fences = fenceGroup.initFence();
            fenceGroup.initFences();
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
            const defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku){
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock);
            } else {
                this.bindSpuData()
            }
            this.bindTipData();
            this.bindFenceGroupData(fenceGroup);
        },

        bindSpuData: function(){
            const spu = this.properties.spu;
            this.setData({
                previewImage: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },

        bindSkuData(sku){
            this.setData({
                previewImage: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                //only sku has stock
                stock: sku.stock,
            })
        },

        bindFenceGroupData: function (fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        bindTipData(){
            this.setData({
                skuIntact: this.data.judger.isSKUIntact(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.findMissingKeys()
            })
        },

        onCellTap(event){
            let data = event.detail.cell;
            const { x, y } = event.detail;
            const judger = this.data.judger;
            const cell = new Cell(data.spec);
            cell.status = data.status;
            judger.judge(false, cell, x, y);
            const skuIntact = judger.isSKUIntact();
            if (skuIntact){
                const curSku = judger.getDeterminateSku();
                this.bindSkuData(curSku);
                console.log(this.data.curSkuCount)
                this.setStockStatus(curSku.stock)
            }
            this.bindTipData();
            this.bindFenceGroupData(judger.fenceGroup);

        },

        isOutOfStock(stock, currentCount){
            return stock < currentCount;
        },

        setStockStatus(stock){
            const curSkuStock = this.data.curSkuCount;
            this.setData({
                outStock: this.isOutOfStock(stock, curSkuStock)
            });
        },

        onSelectCount(event){
            const curCount = event.detail.count;
            this.data.curSkuCount = curCount;
            if (this.data.judger.isSKUIntact()){
                const sku = this.data.judger.getDeterminateSku();
                this.setStockStatus(sku.stock);
            }
        }
    }
})
