class Cart{
    static SKU_MIN_COUNT = 1;
    static SKU_MAX_COUNT = 99;
    static CART_ITEM_MAX_COUNT = 99;
    static STORAGE_KEY = 'cart';

    //代理模式，真实数据存在缓存中，新创建一个属性代表缓存数据
    _cartData = null;
    //单例模式
    constructor(){
        if (typeof Cart.instance === 'object'){
            return Cart.instance;
        }
        Cart.instance = this;
        return this;
    }

    addItem(newItem){
        if (this.beyondMaxCartItemCount()){
            throw new Error('超过购物车最大数量');
        }
        this._pushItem(newItem);
        this._refreshStorage();
    }

    removeItem(skuId){
        const oldItemIndex = this._findEqualItemIndex(skuId);
        if (!cartData){
            return;
        }
        const cartData = this._getCartData();
        cartData.items.splice(oldItemIndex, 1);
        this._refreshStorage();
    }

    beyondMaxCartItemCount(){
        const cartData = this._getCartData();
        return cartData.items.length > Cart.CART_ITEM_MAX_COUNT;
    }

    isEmpty(){
        return this._getCartData().items.length === 0;
    }

    getAllCartItemFromLocal(){
        return this._getCartData();
    }

    getCartItemCount(){
        return this._getCartData().items.length;
    }

    _getCartData(){
        if (this._cartData !== null){
            return this._cartData;
        }
        let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
        if (!cartData){
            cartData = this._initCartDataStorage();
        }
        this._cartData = cartData;
        return cartData;
    }

    _pushItem(newItem){
        const cartData = this._getCartData();
        const oldItem = this._findEqualItem(newItem.skuId);
        if (!oldItem){
            //新添加的放在前面
            cartData.items.unshift(newItem);
        } else {
            this._combineItems(oldItem, newItem);
        }

    }

    _initCartDataStorage(){
        const cartData = {
            items: []
        }
        wx.setStorageSync(Cart.STORAGE_KEY, cartData);
        return cartData;
    }

    _findEqualItem(skuId){
        let oldItem = null;
        const items = this._cartData.items;
        for (let i = 0; i < items.length; i++){
            if (this._isEqualItem(items[i], skuId)){
                oldItem = items[i];
                break;
            }
        }
        return oldItem;
    }

    _combineItems(oldItem, newItem){
        this._plusCount(oldItem, newItem.count);
    }

    _plusCount(item, count){
        item.count += count;
        if (item.count >= Cart.SKU_MAX_COUNT){
            item.count = Cart.SKU_MAX_COUNT;
        }
    }

    _isEqualItem(item, skuId){
        return item.skuId === skuId;
    }

    _refreshStorage(){
        wx.setStorageSync(Cart.STORAGE_KEY, this._cartData);
    }

    _findEqualItemIndex(skuId){
        const items = this._getCartData().items;
        return items.findIndex(item=>item.skuId === skuId);
    }
}

export {
    Cart
}