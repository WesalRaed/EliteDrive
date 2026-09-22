
// ================= CAR FILTER =================

const typeFilter = document.getElementById("typeFilter");
const transmissionFilter = document.getElementById("transmissionFilter");
const priceFilter = document.getElementById("priceFilter");

const carCards = document.querySelectorAll(".rent-car-card");
const carCount = document.getElementById("carCount");


function filterCars() {

    const selectedType = typeFilter.value;
    const selectedTransmission = transmissionFilter.value;
    const maxPrice = Number(priceFilter.value);

    let visibleCars = 0;

    carCards.forEach(card => {

        const type = card.dataset.type;
        const transmission = card.dataset.transmission;
        const price = Number(card.dataset.price);

        const typeMatch =
            selectedType === "all" ||
            type.includes(selectedType);

        const transmissionMatch =
            selectedTransmission === "all" ||
            transmission === selectedTransmission;

        const priceMatch =
            price <= maxPrice;


        if (
            typeMatch &&
            transmissionMatch &&
            priceMatch
        ) {

            card.style.display = "block";
            visibleCars++;

        } else {

            card.style.display = "none";

        }

    });


    carCount.textContent =
        visibleCars + " Vehicles Available";
}


typeFilter.addEventListener("change", filterCars);
transmissionFilter.addEventListener("change", filterCars);
priceFilter.addEventListener("change", filterCars);


// ================= CLEAR FILTERS =================

function clearFilters() {

    typeFilter.value = "all";
    transmissionFilter.value = "all";
    priceFilter.value = "9999";

    filterCars();
}


// ================= BOOKING =================

let selectedCarName = "";
let selectedCarPrice = 0;


function openBooking(carName, price) {

    selectedCarName = carName;
    selectedCarPrice = Number(price);

    document.getElementById("selectedCar").textContent =
        carName;

    document.getElementById("bookingModal")
        .classList.add("active");

    setMinimumDate();

    calculateTotal();
}


function closeModal(modalId) {

    document.getElementById(modalId)
        .classList.remove("active");
}


// ================= MINIMUM DATE =================

function setMinimumDate() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    const dateString =
        `${year}-${month}-${day}`;

    document.getElementById("pickupDate")
        .min = dateString;

    document.getElementById("returnDate")
        .min = dateString;
}


// ================= CALCULATE TOTAL =================
const rentPickupInput = document.getElementById("pickupDate");
const rentReturnInput = document.getElementById("returnDate");

rentPickupInput.addEventListener("change", calculateTotal);
rentReturnInput.addEventListener("change", calculateTotal);



function calculateTotal() {
const pickup = rentPickupInput.value;
const returnDate = rentReturnInput.value;

    if (!pickup || !returnDate) {

        document.getElementById("totalPrice")
            .textContent = "$0";

        return;
    }


    const start =
        new Date(pickup);

    const end =
        new Date(returnDate);


    const difference =
        end - start;

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (days <= 0) {

        document.getElementById("totalPrice")
            .textContent = "$0";

        return;
    }


    const total =
        days * selectedCarPrice;


    document.getElementById("totalPrice")
        .textContent =
        "$" + total.toLocaleString();
}


// ================= CONFIRM BOOKING =================

function confirmBooking(event) {

    event.preventDefault();


    const name =
        document.getElementById("customerName").value.trim();

    const email =
        document.getElementById("customerEmail").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const pickupDate =
        document.getElementById("pickupDate").value;

    const returnDate =
        document.getElementById("returnDate").value;

    const location =
        document.getElementById("pickupLocation").value.trim();


    if (
        !name ||
        !email ||
        !phone ||
        !pickupDate ||
        !returnDate ||
        !location
    ) {

        alert("Please complete all fields.");

        return;
    }


    const start =
        new Date(pickupDate);

    const end =
        new Date(returnDate);


    const difference =
        end - start;

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (days <= 0) {

        alert(
            "Return date must be after the pick-up date."
        );

        return;
    }


    const total =
        days * selectedCarPrice;


    // Temporary booking confirmation.
    // Later this information will be sent
    // to the backend/database.

    alert(
        "Booking Request Submitted!\n\n" +
        "Customer: " + name + "\n" +
        "Car: " + selectedCarName + "\n" +
        "Pick-up: " + pickupDate + "\n" +
        "Return: " + returnDate + "\n" +
        "Location: " + location + "\n" +
        "Total: $" + total.toLocaleString()
    );


    document.getElementById("bookingForm").reset();

    closeModal("bookingModal");
}


// ================= DETAILS =================

function showDetails(
    carName,
    price,
    image,
    description
) {

    document.getElementById("detailsTitle")
        .innerHTML =
        `${carName} <span style="color:#c9a227;">Details</span>`;

    document.getElementById("detailsImage")
        .src = image;

    document.getElementById("detailsDescription")
        .textContent = description;


    document.getElementById("detailsBookButton")
        .onclick = function () {

            closeModal("detailsModal");

            openBooking(
                carName,
                Number(price)
            );

        };


    document.getElementById("detailsModal")
        .classList.add("active");
}


// ================= CLOSE MODAL BY CLICKING OUTSIDE =================

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {

                    modal.classList.remove(
                        "active"
                    );

                }

            }
        );

    });

