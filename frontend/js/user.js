$(document).ready(() => {
  // $("#fileNotFound").attr('style', 'display: none;');
  let user;
  if (sessionStorage.getItem("user") === null) {
    window.location.assign("./index.html");
  } else {
    user = sessionStorage.getItem("user");
  }

  const getDocuments = async () => {
    const tbody = document.getElementById("filesTable");

    await $.ajax({
      url: "http://localhost:8080/documents/" + user,
      method: "GET",
      timeout: 0,
    })
      .done(function (response) {
        tbody.innerHTML = '';
        $("#fileNotFound").attr('style', 'display: none;');
        for (var i = 0; i < response.length; i++) {
          var row = document.createElement("tr");

          var cell = document.createElement("td");

          var link = document.createElement("a");
          link.href =
            "http://localhost:8080/assets/" + user + "/" + response[i];
          link.target = "_blank";
          link.textContent = response[i];

          cell.appendChild(link);
          row.appendChild(cell);
          tbody.appendChild(row);
        }
      })
      .fail((e) => {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.textContent = e.responseJSON.messages.error;
        row.appendChild(cell);
        tbody.appendChild(row);
        // $("#fileNotFound").attr('style', 'display: table-row;');
      });
  };
  getDocuments();

  $("#docSubmit").click(() => {
    var form = new FormData();
    form.append("mobile_number", user);
    let image = $("#doc").val();
    if (image != "") {
      var file_data = $('input[name="doc"]')[0].files;
      for (let i = 0; i < file_data.length; i++) {
        form.append("file", file_data[i]);
      }
    }

    var settings = {
      url: "http://localhost:8080/documents/create",
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };

    $.ajax(settings)
      .done(function (response) {
        console.log(response);
        alert("Document Uploaded Successfully!");
        $("#doc").val(null);
        getDocuments();
      })
      .fail(function (e) {
        var result = JSON.parse(JSON.stringify(e));
        console.log(result);
        alert("Something went wrong, Please try again.");
      });
  });

  $("#signout").click(() => {
    sessionStorage.clear();
    window.location.assign("./index.html");
  })
});
