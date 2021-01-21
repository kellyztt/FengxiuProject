import { accAdd, accMultiply } from "../utils/number.js";
class Calculator {
    totalPrice = 0
    totalSkuCount = 0
    cartItems = []

    constructor(cartItems){
        this.cartItems = cartItems;
    }
    
    calc(){
        this.cartItems.forEach(item => {
            const count = item.count;
            let price = item.sku.price;
            if (item.sku.discount_price){
                price = item.sku.discount_price;
            }
            const partPrice = accMultiply(count, price);
            this.totalPrice = accAdd(this.totalPrice, partPrice);
            this.totalSkuCount += count;
        });
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