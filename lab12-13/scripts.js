function dublicated() {

}

function sendPerson(person) {
    $.ajax({
            type: "GET",
            url: "http://192.168.176.234:8000/data.xml",
            dataType: "xml",
            crossDomain: true
        },

        function (xml) {
            console.log("xml received");
            let foudDublicates = false;

            $(xml).find('person')
                .each(function () {

                    console.log("person");
                    foudDublicates |= $(this).find('name') == person.name;
                }).after(function () {
                if (foudDublicates) {

                    console.log("dublicated");
                    dublicated();
                } else {
                    console.log("no dublicates");
                    $(xml).find("persons")
                        .appendChild(person)
                        .ajax({
                            type: "POST",
                            url: "http://192.168.176.234:8000/data.xml",
                            dataType: "xml"
                        }, function () {
                            window.alert("34");
                        })
                }
            })
        });
}

function makeRegister() {
    let alert = "";
    alert += checkPasswords();
    if (alert.length > 0) {
        window.alert(alert);
    } else {
        // let hash = require('object-hash');
        sendPerson(new Person(document.getElementById("name").value,
            document.getElementById("city").value,
            document.getElementById("country").value,
            // hash.sha1(
            document.getElementById("password").value));
    }
}


function checkPasswords() {
    let pass_block = document.getElementById("password_input_block");
    let pass = document.getElementById("password").value;
    let pass_conf_block = document.getElementById("password_confirmation_input_block");
    let pass_conf = document.getElementById("repeat_password").value;

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
        if (validatePassword(pass)) {
            return ""
        }
        else {
            pass_block.style.color = "red";
            pass_conf_block.style.color = "black";
            return "Password should contain: minimum eight characters, at least one uppercase letter, one lowercase letter and one number!"
        }
    }
}

function validatePassword(pass) {
    let passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
    let passwordRegExp = new RegExp(passwordRegex);
    return passwordRegExp.exec(pass)
}

class Person {
    constructor(name, city, country, passFingerprint) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.passFingerprint = passFingerprint;
    }
}