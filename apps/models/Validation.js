export default class Validation {
    checkEmpty(input, spanId, message) {
        if (input === "") {
            document.querySelector("#" + spanId).innerHTML = message;
            document.querySelector("#" + spanId).style.display = "block";
            return false;
        } else {
            document.querySelector("#" + spanId).innerHTML = "";
            document.querySelector("#" + spanId).style.display = "none";
            return true;
        }
    }

    checkNumber(input, spanId, message) {
        let regex = /^[0-9]+$/;
        if (input.match(regex)) {
            document.querySelector("#" + spanId).innerHTML = "";
            document.querySelector("#" + spanId).style.display = "none";
            return true;
        } else {
            document.querySelector("#" + spanId).innerHTML = message;
            document.querySelector("#" + spanId).style.display = "block";
            return false;
        }
    }
}
