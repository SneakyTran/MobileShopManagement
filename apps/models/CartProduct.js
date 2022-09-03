import Product from "./Product.js";

export default class CartProduct extends Product {
    constructor(quantity, ...propParent) {
        super(...propParent);
        this.quantity = quantity;
    }
}
