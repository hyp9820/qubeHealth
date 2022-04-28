const userPhone = document.getElementById("userPhone");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

let master;
if(sessionStorage.getItem("master") === null) {
    window.location.assign("./index.html");
} else {
    master = sessionStorage.getItem("master");
}


$("#userSubmit").click(() => {

    let pattern = /[1-9]{1}[0-9]{9}/;
    if (userPhone.value == "") {
        alert("User Phone Number is required");
        return false;
    }
    if (!pattern.test(userPhone.value)) {
        alert("User Phone Number should be of pattern - XXXXX12345");
        return false;
    }
    if (firstName.value == "") {
        alert("User's First Name is required");
        return false;
    }
    if (lastName.value == "") {
        alert("User's Last Name is required");
        return false;
    }
    
    let form = new FormData();
    form.append("mobile_number", userPhone.value);
    form.append("first_name", firstName.value);
    form.append("last_name", lastName.value);

    let settings = {
    "url": "http://localhost:8080/users/create",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
    };

    $.ajax(settings)
    .done(function (response) {
        console.log("Success: " + response);
        alert("User Added Successfully!");
    })
    .fail(function(e) {
        var result = JSON.parse(JSON.stringify(e));
        console.log(result);
        alert("Something went wrong, Please try again.");
    });

});