
let user;
if(sessionStorage.getItem("user") === null) {
    window.location.assign("./index.html");
} else {
    user = sessionStorage.getItem("user");
}

$("#docSubmit").click(() => {
    var form = new FormData();
    form.append("mobile_number", user);
    let image = $("#doc").val();
    if(image != '') {
        var file_data = $('input[name="doc"]')[0].files;
        for (let i = 0; i < file_data.length; i++){
            form.append("file", file_data[i]);
        }
    }

    var settings = {
    "url": "http://localhost:8080/documents/create",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
    };

    $.ajax(settings)
    .done(function (response) {
        console.log(response);
        alert("Document Uploaded Successfully!");
    })
    .fail(function (e) {
        var result = JSON.parse(JSON.stringify(e));
        console.log(result);
        alert("Something went wrong, Please try again.");
    });
});