class Cart{
    static SKU_MIN_COUNT = 1;
    static SKU_MAX_COUNT = 9;
    static CART_ITEM_MAX_COUNT = 20;
    static STORAGE_KEY = "key";

    _cartData = null;

    constructor(){
        if (typeof Cart.instance === "object"){
            return Cart.instance
        }
        Cart.instance = this;
        return this;
    }

    getAllCartItemFromLocal(){
        return this._getCartData();
    }

    addItem(cartItem){
        const cartData = this._getCartData();
        const existed = this.findEqualItem(cartItem.sku.id);
        if (existed){
            this._combineItems(existed, cartItem);
            return;
        }
        if (this.beyondMaxCartItemCount()){
            throw new Error('超过购物车最大数量');
        }
        cartData.items.unshift(cartItem);
        this._refreshStorage();
    }

    removeItem(cartId){
        const index = this._findEqualItemIndex(cartId);
        if (index){
            const cartData = this._getCartData();
            cartData.items.splice(index, 1);
            this._refreshStorage();
        }
    }

    isEmpty(){
        return this.getCartItemCount() === 0;
    }

    getCartItemCount(){
        return this._getCartData().items.length;
    }

    beyondMaxCartItemCount(){
        return this.getCartItemCount() > Cart.CART_ITEM_MAX_COUNT;
    }

    findEqualItem(cartId){
        const items = this._getCartData().items;
        return items.find(item=>item.sku.id === cartId);
    }

    static isSoldOut(cartItem){
        return cartItem.sku.stock === 0;
    }

    static isOnline(cartItem){
        return cartItem.sku.online;
    }

    checkItem(id){
        const item = this.findEqualItem(id);
        item.checked = !item.checked;
        this._refreshStorage();
    }

    replaceItemCount(id, newCount){
        const item = this.findEqualItem(id);
        item.count = newCount;
        this._refreshStorage();
    }

    _findEqualItemIndex(skuId){
        const cartData = this._getCartData();
        const index = cartData.items.findIndex(item => item.sku.id === skuId);
        return index;
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

    _initCartDataStorage(){
        const cartData = {
            items: []
        };
        wx.setStorageSync(Cart.STORAGE_KEY, cartData);
        return cartData;
    }

    _combineItems(oldItem, newItem){
        this._plusCount(oldItem, newItem.count);
    }

    _plusCount(oldItem, count){
        oldItem.count += count;
        if (oldItem.count > Cart.SKU_MAX_COUNT){
            oldItem.count = Cart.SKU_MAX_COUNT;
        }
    }

    _refreshStorage(){
        wx.setStorageSync(Cart.STORAGE_KEY, this._cartData);
    }
}

export {
    Cart
}