import {accAdd, accMultiply} from "../utils/number";

class Calculator{
    totalPrice = 0;
    totalSkuCount = 0;
    cartItems = [];

    constructor(cartItems){
        this.cartItems = cartItems;

    }

    calc(){
        this.cartItems.forEach(item => {
            this.push(item);
        });
    }

    push(cartItem){
        const price = cartItem.sku.discount_price ? cartItem.sku.discount_price : cartItem.sku.price;
        const partTotalPrice = accMultiply(price, cartItem.count);
        this.totalPrice = accAdd(this.totalPrice, partTotalPrice);
        this.totalSkuCount += cartItem.count;
    }

    getTotalPrice(){
        return this.totalPrice;
    }

    getTotalSkuCount(){
        return this.totalSkuCount;
    }
}

export {
    Calculator
}