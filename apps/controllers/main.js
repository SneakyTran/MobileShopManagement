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
        let { name, price, screen, backCamera, frontCamera, img, desc, type } =
            item;
        if (products.length < prodList.length) {
            products.push(item);
        }
        content += `
        <div class="item">
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
                            <div class="product__add__cart">
                                <div class="qty__box">
                                    <a href="#">-</a>
                                    <input type="number" value="1">
                                    <a href="#">+</a>
                                </div>
                                <button>
                                    <i class="lni lni-shopping-basket"></i>
                                    <span>add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });
    document.querySelector("#owl--product").innerHTML = content;
    refreshOwl();
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

/* ------------------------- WINDOW CONFIG FUNCTION ------------------------- */
window.getProductList = getProductList;
window.getListType = getListType;

/* ------------------------------ CALL FUNCTION ----------------------------- */
getProductList();

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
