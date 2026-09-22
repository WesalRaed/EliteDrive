const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    loginMessage.textContent = "Logging in...";


    try {

        const response = await fetch(
"/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            loginMessage.textContent =
                data.message || "Login failed.";

            return;
        }


        // Save logged-in user
        localStorage.setItem(
            "eliteDriveUser",
            JSON.stringify(data.user)
        );


        loginMessage.textContent =
            "Login successful!";


        setTimeout(() => {
            window.location.href = "rent.html";
        }, 800);


    } catch (error) {

        console.error(error);

        loginMessage.textContent =
            "Unable to connect to the server.";
    }

});