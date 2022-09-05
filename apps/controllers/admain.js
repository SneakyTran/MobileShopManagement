import Product from "../models/Product.js";
import ProductService from "../services/ProductServices.js";

const spServices = new ProductService();

let showtable = (phoneArray) => {
    let content = "";
    phoneArray.map((product) => {
        let {
            id,
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type,
        } = product;

        content += `
        <tr>
           <td>${id}</td>
           <td>${name}</td>
           <td>${price}$</td>
           <td>${screen}</td>
           <td>
           ${backCamera} & ${frontCamera}
           </td>
           <td class="ad__product__img">
           <img src="${img}" alt="" class="img-fluid"/>
           </td>
           <td>${desc}</td>
           <td>${type}</td>
         <td class="btn--action">
        <button onclick="getDetailMain('${id}')" class="btn btn-info" data-toggle="modal" data-target="#myModal">Xem</button>
        <button class="btn btn-danger" onclick="deletePhoneMain('${id}')" >xoa</button>
        </td>
        
          </tr>
        `;
    });

    document.querySelector("#tblDanhSachSP").innerHTML = content;
};

let getList = () => {
    spServices
        .getProductList()
        .then((result) => {
            showtable(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

getList();

let addPhoneMain = () => {
    let phoneValue = {};
    let formELE = document.querySelectorAll("#btnThemSPl .spPro");
    for (let i = 0; i < formELE.length; i++) {
        let { id, value } = formELE[i];

        if (id != "id") {
            phoneValue = { ...phoneValue, [id]: value };
        }
    }

    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
        phoneValue;
    let product = new Product(
        id,
        name,
        Number(price),
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    );

    spServices
        .addProduct(product)
        .then((result) => {
            getList();
        })
        .catch((error) => {
            console.log(error);
        });
};

document.querySelector("#btnThemMon").onclick = addPhoneMain;

//xem
let getDetailMain = (id) => {
    spServices
        .getProductById(id)
        .then((result) => {
            document.querySelector("#TenSP").value = result.data.name;
            document.querySelector("#GiaSP").value = result.data.price;
            document.querySelector("#manHinh").value = result.data.screen;
            document.querySelector("#camera").value = result.data.backCamera;
            document.querySelector("#camera2").value = result.data.frontCamera;
            document.querySelector("#HinhSP").value = result.data.img;
            document.querySelector("#motaSP").value = result.data.desc;
            document.querySelector("#loaiSP").value = result.data.type;
        })
        .catch((error) => {
            console.log(error);
        });
};
window.getDetailMain = getDetailMain;

//update
let updatePhoneMain = () => {
    let phoneValue = {};
    let formELE = document.querySelectorAll("#btnThemSPl .spPro");
    for (let i = 0; i < formELE.length; i++) {
        let { id, value } = formELE[i];
        phoneValue = { ...phoneValue, [id]: value };
    }
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
        phoneValue;
    let product = new Product(
        id,
        name,
        Number(price),
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
    );

    spServices
        .updateProduct(product, id)
        .then((result) => {
            getList();
        })
        .catch((error) => {
            console.log(error);
        });
};

document.querySelector("#btnCapNhat").onclick = updatePhoneMain;

//xoa
function deletePhoneMain(id) {
    spServices
        .deleteProduct(id)
        .then(function (result) {
            getList();
        })
        .catch(function (error) {
            console.log(error);
        });
}
window.deletePhoneMain = deletePhoneMain;

let resetForm = () => {
    document.querySelector("#popupModal").reset();
};
document.querySelector("#btnThemSP").onclick = resetForm;
