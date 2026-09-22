// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
    });
}

// ================= BOOKING SEARCH =================

const searchCars = document.getElementById("searchCars");

if (searchCars) {

    searchCars.addEventListener("click", () => {

        const location = document.getElementById("pickupLocation").value;
        const pickup = document.getElementById("pickupDate").value;
        const returnDate = document.getElementById("returnDate").value;

        if (!location || !pickup || !returnDate) {
            alert("Please select your location and rental dates.");
            return;
        }

        if (new Date(returnDate) <= new Date(pickup)) {
            alert("Return date must be after the pick-up date.");
            return;
        }

        window.location.href =
            `rent.html?location=${encodeURIComponent(location)}&pickup=${pickup}&return=${returnDate}`;
    });

}


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;

        alert(
            `Thank you ${name}! Your message has been received.`
        );

        contactForm.reset();

    });

}


// ================= HEART BUTTON =================

document.querySelectorAll(".heart-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "♡") {
            button.textContent = "♥";
            button.style.color = "#c9a45c";
        } else {
            button.textContent = "♡";
            button.style.color = "white";
        }

    });

});


// ================= MINIMUM DATE =================

const today = new Date().toISOString().split("T")[0];

const pickupInput = document.getElementById("pickupDate");
const returnInput = document.getElementById("returnDate");

if (pickupInput) {
    pickupInput.min = today;
}

if (returnInput) {
    returnInput.min = today;
}

if (pickupInput && returnInput) {

    pickupInput.addEventListener("change", () => {
        returnInput.min = pickupInput.value;
    });

}
