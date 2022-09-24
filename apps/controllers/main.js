import CartProduct from "../models/CartProduct.js";
import Product from "../models/Product.js";
import ProductService from "../services/ProductServices.js";

const prodServices = new ProductService();
let products = [];

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * display product to UI
 * @param {*} prodList
 */
let loadProduct = (prodList) => {
    let content = "";
    prodList.map((item) => {
        let { id, name, price, img } = item;
        if (products.length < prodList.length) {
            products.push(item);
        }
        content += `
        <div class="item">
            <a id="product__id" href="apps/views/ViewProduct.html?id=${id}">
            <div class="product__item">
                        <div class="product__img">
                            <img class="img-fluid" src="${img}" alt="">
                        </div>
                        <div class="product__content">
                            <a href="#">${name}</a>
                            <div class="product__rating">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <span class="price">${price}</span>
                        </div>
                    </div>
            </a>
                    
                </div>
            `;
    });
    if (!!document.querySelector("#owl--product")) {
        document.querySelector("#owl--product").innerHTML = content;
        refreshOwl();
    }
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * Filter product by type (ex: samsung/iphone)
 * @param {String} type
 */
let getListType = (type) => {
    const filterProd = products.filter((item) => {
        return item.type.toLowerCase() === type;
    });
    loadProduct(filterProd);
    removeActiveNav();
    document.querySelector(`#msProduct .${type}`).classList.add("active");
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * Filter product by type (ex: samsung/iphone)
 * Reset slider of products
 */
let refreshOwl = () => {
    $("#owl--product").owlCarousel("destroy");
    $("#owl--product").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        items: 4,
    });
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * Get product data from API
 * @param {*} item
 */
let getProductList = (item) => {
    if (item === "all") {
        removeActiveNav();
        document
            .querySelector(`#msProduct .nav-link.${item}`)
            .classList.add("active");
    }
    prodServices
        .getProductList()
        .then((res) => {
            loadProduct(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * UI_product => change active nav
 */
let removeActiveNav = () => {
    document
        .querySelector("#msProduct .nav-link.active")
        .classList.remove("active");
};

let showCart = () => {
    document.querySelector("#cart--menu").classList.add("cart--wrap");
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * get product by ID from API
 */
let getProductDetail = () => {
    let url = window.location.href;
    if (url.search("ViewProduct.html") < 0) {
        return;
    }
    const idContext = "id=";
    let prodId = url.charAt(url.search(idContext) + idContext.length);

    prodServices
        .getProductById(prodId)
        .then((res) => {
            loadProductDetail(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
let product = null;
/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * load product detail to UI
 */
let loadProductDetail = (prod) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
        prod;
    product = new Product(
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    );
    let content = `
            <div class="page_bread">
                <i class="fa-solid fa-house"></i>
                <i class="fa-solid fa-chevron-right"></i>
                <span>${name}</span>
             </div>
             <div class="product__detail">
                <div class="row">
                   <div class="col-5">
                      <img class="product__img" src="${img}" alt="">
                   </div>
                   <div class="col-7">
                      <div class="product__content">
                         <h1>Porto Evolution Phone</h1>
                         <div class="product__rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                         </div>
                         <span class="price">${price}</span>
                         <p>${desc}
                         </p>
                         <div class="product__stock">
                            <div class="stock--available">
                               <span class="label">Availability:</span>
                               <span class="desc">IN STOCK</span>
                            </div>
                            <div class="product__attribute">
                               <span class="label">Screen: </span>
                               <span class="desc">${screen}</span>
                            </div>
                            <div class="product__attribute">
                               <span class="label">back Camera: </span>
                               <span class="desc">${backCamera}</span>
                            </div>
                            <div class="product__attribute">
                               <span class="label">front Camera: </span>
                               <span class="desc">${frontCamera}</span>
                            </div>
                         </div>
                         <div class="product__add__cart">
                            <div class="qty__box">
                               <a onclick="changeQuantity('desc', this)">-</a>
                               <input type="number" value="1">
                               <a onclick="changeQuantity('inc', this)">+</a>
                            </div>
                            <button onclick="addToCart(${id})">
                            <i class="lni lni-shopping-basket"></i>
                            <span>add to cart</span>
                            </button>
                            <div class="product--action">
                               <i class="fa-regular fa-heart"></i>
                               <i class="fa-solid fa-chart-simple"></i>
                            </div>
                         </div>
                         <div class="product__social">
                            <i class="fa-brands fa-facebook-f"></i>
                            <i class="fa-brands fa-twitter"></i>
                            <i class="fa-brands fa-linkedin-in"></i>
                            <i class="fa-brands fa-google-plus-g"></i>
                            <i class="fa-solid fa-envelope"></i>
                         </div>
                      </div>
                   </div>
                </div>
                <div class="products_nav">
                   <nav class="navbar navbar-expand-lg">
                      <div class="collapse navbar-collapse" id="navbarNav">
                         <ul class="navbar-nav">
                            <li class="nav-item active">
                               <a class="nav-link" href="#">DETAILS</a>
                            </li>
                            <li class="nav-item">
                               <a class="nav-link" href="#">REVIEWS</a>
                            </li>
                            <li class="nav-item">
                               <a class="nav-link" href="#">CUSTOM TAB</a>
                            </li>
                         </ul>
                      </div>
                   </nav>
                   <div class="product__more">
                      <P>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quae debitis voluptate iste
                         doloremque nostrum inventore error voluptatum dolorum perferendis culpa facere, possimus
                         voluptatibus modi mollitia ad ratione corrupti? Maxime impedit rerum minus? Non molestias,
                         beatae
                         fugiat, quas magnam nam nesciunt ducimus consequatur officiis delectus, ipsam doloremque sed
                         accusamus? Dignissimos!
                      </P>
                      <ul>
                         <li><i class="fa-solid fa-check"></i></i>Any Product types that You want - Simple, Configurable
                         </li>
                         <li><i class="fa-solid fa-check"></i>Downloadable/Digital Products, Virtual Products</li>
                         <li><i class="fa-solid fa-check"></i>Inventory Management with Backordered items</li>
                      </ul>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                         quis
                         nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                   </div>
                </div>
             </div>
    `;
    document.querySelector("#msProdDetail").innerHTML = content;
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * increase/descrease quantity input by 1
 */
let changeQuantity = (type, e) => {
    let inputEle = null;
    let indexChange = -1;
    let totalPrice = 0;
    let typeChangeVal = 1;
    if (!e.parentElement.parentElement.classList.contains("qty")) {
        //product detail
        inputEle = document.querySelector(`#msProdDetail .qty__box input`);
    } else {
        //cart
        inputEle = e.parentElement.querySelector("input");
        indexChange = inputEle.getAttribute("name");
    }
    //change quantity input
    if (type === "desc") {
        if (inputEle.value > 1) {
            inputEle.value -= 1;
        }
        typeChangeVal = -1;
    } else {
        inputEle.value = Number(inputEle.value) + 1;
        typeChangeVal = 1;
    }
    //change total price of cart
    if (indexChange == -1) {
        return;
    } else {
        if (typeChangeVal == -1 && inputEle.value == 1) {
            return;
        }
        let totalEle = document.querySelector(".cart__total .total").innerHTML;
        totalPrice = calcTotalPrice(
            Number(totalEle.replace("$", "")),
            Number(cartProdList[inputEle.getAttribute("name")].price),
            typeChangeVal
        );
        document.querySelector(".cart__total .total").innerHTML =
            "$" + totalPrice;
    }
};

let calcTotalPrice = (total, amount, type) => {
    return total + amount * type;
};

let cartProdList = [];

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * add product to cart
 */
let addToCart = (idClick) => {
    const quantity = document.querySelector(
        "#msProdDetail .qty__box input"
    ).value;
    if (quantity < 1) {
        alert("Số lượng không hợp lệ!!!");
        return;
    } else {
        let { name, price, screen, backCamera, frontCamera, img, desc, type } =
            product;
        if (cartProdList.length == 0) {
            cartProdList.push(
                new CartProduct(
                    idClick,
                    Number(quantity),
                    name,
                    price,
                    screen,
                    backCamera,
                    frontCamera,
                    img,
                    desc,
                    type
                )
            );
        } else {
            let index = cartProdList.findIndex((item) => {
                return item.id == idClick;
            });
            if (index >= 0) {
                cartProdList[index].quantity += Number(quantity);
            } else {
                cartProdList.push(
                    new CartProduct(
                        idClick,
                        Number(quantity),
                        name,
                        price,
                        screen,
                        backCamera,
                        frontCamera,
                        img,
                        desc,
                        type
                    )
                );
            }
        }
        saveDataToStorage();
        loadCartProduct();
    }
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * Save cart to local storage
 */
let saveDataToStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartProdList));
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * load data from locaStorage
 */
let getLocalStorage = () => {
    if (localStorage.getItem("cart") != undefined) {
        let listObj = JSON.parse(localStorage.getItem("cart"));
        if (listObj.length > 0) {
            cartProdList = convertToProductCart(listObj);
            loadCartProduct();
        }
    }
};

/**
 * Author: Sneaky
 * Date Created: 30/8/2022
 * Convert object list to cart list
 */
let convertToProductCart = (listObj) => {
    return listObj.map(function (cart) {
        return Object.assign(new CartProduct(), cart);
    });
};

/**
 * Author: Sneaky
 * Date Created: 3/9/2022
 * load Cart Shop to UI
 */
let loadCartProduct = () => {
    loadAmountItem();
    if (cartProdList.length > 0) {
        let cartBody = "";
        let totalPrice = 0;
        let cartHeader = `
                <div class="total--count">
                    <div class="item--total">
                       <span class="count">${cartProdList.length}
                       <span>${
                           cartProdList.length == 0 ? "ITEM" : "ITEMS"
                       }</span>
                       </span>
                    </div>
                    <a href="#">VIEW CART</a>
                    </div>
        `;

        cartProdList.map((item, index) => {
            let { id, name, price, img, quantity } = item;
            cartBody += `
                        <div class="cart__item">
                            <div class="item__content">
                                <a href="#">${name}</a>
                                <span>$${price}</span>
                                <div class="qty">
                                    <label>Quantity</label>
                                    <div class="qty__box">
                                        <a onclick="changeQuantity('desc', this)">-</a>
                                        <input name=${index} type="number" value="${quantity}">
                                        <a onclick="changeQuantity('inc', this)">+</a>
                                    </div>
                                </div>
                            </div>
                            <div class="item__img">
                                <img class="img-fluid" src="${img}" alt="">
                                <i class="fa-solid fa-xmark" onclick="removeCartItem('${id}')"></i>
                            </div>
                        </div>
                    `;
            totalPrice += Number(price * quantity);
        });

        cartBody += `
            <div class="cart__total">
                                <span>SUBTOTAL:</span>
                                <span class="total">$${totalPrice}</span>
                            </div>
                            <div class="cart--checkout">
                                <button>GO TO CHECKOUT</button>
                            </div>
        `;
        let content = cartHeader + cartBody;
        document.querySelector("#cart--menu").innerHTML = content;
    } else {
        document.querySelector("#cart--menu").innerHTML = `
            <div class="total--count">
            <div class="item--total">
                <span class="count">0
                    <span>ITEM</span>
                </span>
            </div>
            <a href="#">VIEW CART</a>
            </div>
            <div class="cart__total">
                <span>No item in cart</span>
            </div>
            <div class="cart--checkout">
                <button>GO TO CHECKOUT</button>
            </div>
        `;
    }
};

let loadAmountItem = () => {
    document
        .querySelector(".mini--cart .lni.lni-cart")
        .setAttribute("total--item", cartProdList.length);
};

let removeCartItem = (id) => {
    cartProdList.splice(
        cartProdList.findIndex((item) => {
            return item.id == id;
        }),
        1
    );
    saveDataToStorage();
    loadCartProduct();
};

/* ------------------------- WINDOW CONFIG FUNCTION ------------------------- */
window.getProductList = getProductList;
window.getListType = getListType;
window.changeQuantity = changeQuantity;
window.addToCart = addToCart;
window.removeCartItem = removeCartItem;

/* ------------------------------ CALL FUNCTION ----------------------------- */
getProductList();
getProductDetail();
getLocalStorage();
loadAmountItem();

/* ----------------------------- EVENT LISTENER ----------------------------- */
let flagWrapCart = 0;
document.querySelector(".mini--cart").onclick = showCart;
document.addEventListener("click", (e) => {
    const closestEle = e.target.closest(".cart--block");
    const cartWrapEle = document.querySelector(".cart--wrap");
    if (!!cartWrapEle) {
        flagWrapCart++;
        if (flagWrapCart > 1 && !closestEle) {
            document
                .querySelector(".cart--wrap")
                .classList.remove("cart--wrap");
            flagWrapCart = 0;
        }
    }
});
