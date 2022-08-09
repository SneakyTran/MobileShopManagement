function ProductService() {
    this.productList = [];

    this.getProductList = function () {
        return axios({
            method: "GET",
            url: "https://62e74ea669bd03090f7b1c73.mockapi.io/Products",
        });
    };

    this.addProduct = function (product) {
        return axios({
            method: "POST",
            url: "https://62e74ea669bd03090f7b1c73.mockapi.io/Products",
            data: product,
        });
    };

    this.updateProduct = function (product, id) {
        return axios({
            method: "PUT",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Products/${id}`,
            data: product,
        });
    };

    this.deleteProduct = function (id) {
        return axios({
            method: "DELETE",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Products/${id}`,
        });
    };

    this.getProductById = function (id) {
        return axios({
            method: "GET",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Products/${id}`,
        });
    };
}
