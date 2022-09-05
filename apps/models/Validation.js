export default class Validation {
    checkEmpty(input, spanId, message) {
        if (input === "") {
            document.querySelector("#" + spanId).innerHTML = message;
            document.querySelector("#" + spanId).style.display = "block";
        } else {
            document.querySelector("#" + spanId).innerHTML = "";
            document.querySelector("#" + spanId).style.display = "none";
        }
    }

    checkNumber(input, spanId, message) {
        let regex = /^[0-9]+$/;
        if (input.match(regex)) {
            document.querySelector("#" + spanId).innerHTML = "";
            document.querySelector("#" + spanId).style.display = "none";
        } else {
            document.querySelector("#" + spanId).innerHTML = message;
            document.querySelector("#" + spanId).style.display = "block";
        }
    }
}
