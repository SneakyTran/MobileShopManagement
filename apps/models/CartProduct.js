import Product from "./Product.js";

export default class CartProduct extends Product {
    constructor(id, quantity, ...propParent) {
        super(...propParent);
        this.id = id;
        this.quantity = quantity;
    }
}
