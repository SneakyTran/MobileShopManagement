import Product from "../models/Product.js";
import Validation from "../models/Validation.js";
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

let isValidInput = (
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
) => {
    let isValid = true;
    const validation = new Validation();
    //name
    isValid &= validation.checkEmpty(
        name,
        "errName",
        "Tên sản phẩm không được để trống"
    );

    //price
    isValid &=
        validation.checkEmpty(
            price,
            "errPrice",
            "Giá sản phẩm không được để trống"
        ) &&
        validation.checkNumber(price, "errPrice", "Giá sản phẩm phải là số");

    //screen
    isValid &= validation.checkEmpty(
        screen,
        "errScreen",
        "Loại màn hình không được để trống"
    );

    //backCamera
    isValid &= validation.checkEmpty(
        backCamera,
        "errBCamera",
        "loại camera không được để trống"
    );

    //frontCamera
    isValid &= validation.checkEmpty(
        frontCamera,
        "errFCamera",
        "Loại camera không được để trống"
    );

    //img
    isValid &= validation.checkEmpty(
        img,
        "errImg",
        "Hình ảnh sản phẩm không được để trống"
    );

    //desc
    isValid &= validation.checkEmpty(
        desc,
        "errDesc",
        "Mô tả sản phẩm không được để trống"
    );

    //type
    isValid &= validation.checkEmpty(
        type,
        "errType",
        "Loại sản phẩm không được để trống"
    );
};

let addPhoneMain = () => {
    let phoneValue = {};
    let formELE = document.querySelectorAll("#popupModal .spPro");
    for (let i = 0; i < formELE.length; i++) {
        let { id, value } = formELE[i];

        if (id != "id") {
            phoneValue = { ...phoneValue, [id]: value };
        }
    }

    let { name, price, screen, backCamera, frontCamera, img, desc, type } =
        phoneValue;

    //VALIDATION
    if (
        !isValidInput(
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type
        )
    ) {
        return;
    }

    let product = new Product(
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
            closeModal();
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
            document.querySelector("#ad__product--id").innerHTML = id;
            document.querySelector("#name").value = result.data.name;
            document.querySelector("#price").value = result.data.price;
            document.querySelector("#screen").value = result.data.screen;
            document.querySelector("#backCamera").value =
                result.data.backCamera;
            document.querySelector("#frontCamera").value =
                result.data.frontCamera;
            document.querySelector("#img").value = result.data.img;
            document.querySelector("#desc").value = result.data.desc;
            document.querySelector("#type").value = result.data.type;
        })
        .catch((error) => {
            console.log(error);
        });
};
window.getDetailMain = getDetailMain;

//update
let updatePhoneMain = () => {
    let phoneValue = {};
    let formELE = document.querySelectorAll("#popupModal .spPro");
    for (let i = 0; i < formELE.length; i++) {
        let { id, value } = formELE[i];
        phoneValue = { ...phoneValue, [id]: value };
    }
    let { name, price, screen, backCamera, frontCamera, img, desc, type } =
        phoneValue;

    //VALIDATION
    if (
        !isValidInput(
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type
        )
    ) {
        return;
    }

    let product = new Product(
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
        .updateProduct(
            product,
            document.querySelector("#ad__product--id").innerHTML
        )
        .then((result) => {
            closeModal();
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

let closeModal = () => {
    document.querySelector("#btnClose").click();
};
