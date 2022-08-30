export default class ProductService {
    getProductList() {
        return axios({
            method: "GET",
            url: "https://62e74ea669bd03090f7b1c73.mockapi.io/Phones",
        });
    }

    addProduct(product) {
        return axios({
            method: "POST",
            url: "https://62e74ea669bd03090f7b1c73.mockapi.io/Phones",
            data: product,
        });
    }

    updateProduct(product, id) {
        return axios({
            method: "PUT",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Phones/${id}`,
            data: product,
        });
    }

    deleteProduct(id) {
        return axios({
            method: "DELETE",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Phones/${id}`,
        });
    }

    getProductById(id) {
        return axios({
            method: "GET",
            url: `https://62e74ea669bd03090f7b1c73.mockapi.io/Phones/${id}`,
        });
    }
}
