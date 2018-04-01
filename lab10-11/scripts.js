function makeCheck() {
    var alert = "";
    alert += checkInteger();
    alert += checkFloat();
    alert += checkDate();
    alert += checkPasswords();
    if (alert.length > 0) {
        window.alert(alert);
    } else {
        window.alert("Inputs are valid");
    }
}

function isInt(n) {
    return Number(parseInt(n)) == n && n % 1 == 0;
}

function isFloat(n) {
    return Number(parseFloat(n)) == n && n % 1 != 0;
}

function checkInteger() {
    var fieldValue = document.getElementById("integer_input").value;
    if (fieldValue.length > 0 && !isInt(fieldValue)) {
        document.getElementById("integer_input_block").style.color = "red";
        return "Integer Field Input should be integer!\n";
    }
    else {
        document.getElementById("integer_input_block").style.color = "black";
        return "";
    }
}

function checkFloat() {
    var fieldValue = document.getElementById("float_input").value;
    if (fieldValue.length > 0 && !isFloat(fieldValue)) {
        document.getElementById("float_input_block").style.color = "red";
        return "Float Field Input should be float!\n";
    }
    else {
        document.getElementById("float_input_block").style.color = "black";
        return "";
    }
}

function checkDate() {
    var field = document.getElementById("date_input").value;
    var block = document.getElementById("date_input_block");
    if (field.length != 0 && (field.length != 10 || isNaN(Date.parse(field, "DD.MM.YYYY")))) {
        block.style.color = "red";
        return "Date is in wrong format!";
    } else {
        block.style.color = "black";
        return "";
    }
}


function checkPasswords() {
    var pass_block = document.getElementById("password_input_block");
    var pass = document.getElementById("password").value;
    var pass_conf_block = document.getElementById("password_confirmation_input_block");
    var pass_conf = document.getElementById("repeat_password").value;

    if (pass.length == 0) {
        pass_block.style.color = "red";
        pass_conf_block.style.color = "black";
        return "Password field is required"
    }
    else if (pass_conf.length == 0) {
        pass_block.style.color = "black";
        pass_conf_block.style.color = "red";
        return "Password confirmation field is required"
    }
    else if (pass != pass_conf) {
        pass_block.style.color = "red";
        pass_conf_block.style.color = "red";
        return "Passwords are different";
    } else {
        pass_block.style.color = "black";
        pass_conf_block.style.color = "black";
        return "";
    }
}

