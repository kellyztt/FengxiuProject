class CartItem{
    sku;
    skuId;
    count;
    checked = true;

    constructor(sku, count){
        this.skuId = sku.id;
        this.sku = sku;
        this.count = count;
    }
}

export {
    CartItem
}