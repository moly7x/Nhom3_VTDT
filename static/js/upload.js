// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

var form = document.getElementById("inventory-form");
var submit = document.getElementById("submitButton");

// Huỷ submit thật mà thay bằng gọi thằng khác
form.onsubmit = function () {
    // IMPORTANT
    return false; // To avoid actual submission of the form
}

// Khi click nó sẽ chạy function này (submit vẫn chạy song song nhưng sẽ bị huỷ do thằng ở trên)
submit.onclick = function () {
    let formData = new FormData(form);

    let xhr = new XMLHttpRequest();

    // Khi request xử lý xong chạy function
    xhr.onload = function () {
        let response = JSON.parse(this.responseText);

        // Edit button to default
        submit.classList.remove("button--loading");
        submit.removeAttribute("disabled");

        // Hide collapse in modal
        $('#collapseDetails').collapse('hide');

        // Setup icon and title of modal
        if (response["connection status"]) {
            // Success
            document.getElementsByClassName("modal-title")[0].textContent = "Connection successfully";
            document.getElementById("successIcon").removeAttribute("hidden");
            document.getElementById("successText").removeAttribute("hidden");
        } else {
            // Unreachable
            document.getElementsByClassName("modal-title")[0].textContent = "Connection unsuccessfully";
            document.getElementById("unreachableIcon").removeAttribute("hidden");
            document.getElementById("unreachableText").removeAttribute("hidden");
        }

        // Create details of modal
        let details = "";
        for (let i = 0; i < response.ip.length; i++) {
            let className = "successCode";
            if (response["status"][i] === "UNREACHABLE") {
                className = "unreachableCode";
            }

            details += `<div class="row justify-content-between">
                            <div class="col-md-auto">
                                <code class="${className}">${response["ip"][i]}</code>
                            </div>
                            <div class="col-md-auto">
                                <code class="${className}">${response["status"][i]}</code>
                            </div>
                        </div>`;
        }
        // Writing details in modal
        document.querySelector("#collapseDetails > div").innerHTML = details;

        // Show modal
        $('#notiModal').modal('show');
    }

    // Khi state đang bằng 1 (đã được open) thì chạy function này
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 1) {
            // Edit button
            submit.classList.add("button--loading");
            submit.setAttribute("disabled", "")
        }
    };

    xhr.open('POST', form.getAttribute('action'), true);
    xhr.send(formData);
}
