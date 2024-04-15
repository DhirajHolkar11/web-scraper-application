document.getElementById("loginForm").addEventListener("submit", function(event){
        event.preventDefault();

        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");

        var email = emailInput.value;
        var password = passwordInput.value;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // Empty the input fields regardless of success or failure
                emailInput.value = "";
                passwordInput.value = "";

                if (xhr.status === 200) {
                    // Store the token in localStorage
                    var json = JSON.parse(xhr.responseText);
                    var token = json.token;
                    localStorage.setItem('token', token);

                    // Console log the token
                    console.log("Token:", token);

                    // Redirect to home page on successful login
                    // window.location.href = 'home.html';
                    window.location.href = 'home.html';








                } else {
                    alert("Username and/or Password is wrong");
                }
            }
        };

        var data = JSON.stringify({ "email": email, "password": password });
        xhr.send(data);
});




