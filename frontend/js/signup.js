
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirm-password");

    var email = emailInput.value;
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (!validateEmail(email)) {
        alert("Email is not valid");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/signup", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // Empty the input fields regardless of success or failure
            emailInput.value = "";
            passwordInput.value = "";
            confirmPasswordInput.value = "";

            if (xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log("Signup successful:", json.email);
                window.location.href = 'login.html';
            }

            else if(xhr.status === 400){
                var json = JSON.parse(xhr.responseText);
                alert(json.error);
            }

             else {
                alert("Signup failed. Please try again.");
            }
        }
    };

    var data = JSON.stringify({ "email": email, "password": password });
    xhr.send(data);
});


function validateEmail(email) {
    
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}


