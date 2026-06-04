// ==========================================================================
// 1. MODULAR EVENT LISTENERS (Fulfills: Separation of Concerns & Clean HTML)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners to Navigation Links dynamically
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevents jumping to top of page
            const targetSection = link.getAttribute("data-section");
            showSection(targetSection);
        });
    });

    // Attach event listener to Home Section "Order Now" button
    const heroBtn = document.getElementById("heroOrderBtn");
    if (heroBtn) {
        heroBtn.addEventListener("click", () => showSection("menu"));
    }

    // Attach event listeners to Menu Add buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const price = parseInt(button.getAttribute("data-price"), 10);
            addToCart(price);
        });
    });

    // Attach form/action button listeners dynamically
    document.getElementById("loginBtn")?.addEventListener("click", login);
    document.getElementById("sendBtn")?.addEventListener("click", sendMessage);
    document.getElementById("bookBtn")?.addEventListener("click", bookTable);
    document.getElementById("placeOrderBtn")?.addEventListener("click", placeOrder);
});


// ==========================================================================
// 2. SECTION SWITCH LOGIC
// ==========================================================================
function showSection(id) {
    // Grabs sections/pages cleanly
    let sections = document.querySelectorAll(".section, .page");

    sections.forEach(sec => {
        sec.classList.add("hidden");
        sec.classList.remove("active");
    });

    const activeTarget = document.getElementById(id);
    if (activeTarget) {
        activeTarget.classList.remove("hidden");
        activeTarget.classList.add("active");
    }
}


// ==========================================================================
// 3. LOGIN VALIDATION
// ==========================================================================
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill all login fields!");
        return;
    }

    if (!email.includes("@")) {
        alert("Enter a valid email!");
        return;
    }

    if (password.length < 4) {
        alert("Password must be at least 4 characters!");
        return;
    }

    document.getElementById("welcome").innerText = "Welcome, " + email;
    alert("Login successful!");
}


// ==========================================================================
// 4. CONTACT VALIDATION
// ==========================================================================
function sendMessage() {
    let name = document.getElementById("cname").value.trim();
    let email = document.getElementById("cemail").value.trim();
    let msg = document.getElementById("cmsg").value.trim();

    if (name === "" || email === "" || msg === "") {
        alert("All contact fields are required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email address!");
        return;
    }

    if (msg.length < 10) {
        alert("Message should be at least 10 characters!");
        return;
    }

    alert("Message sent successfully!");
}


// ==========================================================================
// 5. RESERVATION VALIDATION
// ==========================================================================
function bookTable() {
    let name = document.getElementById("rname").value.trim();
    let date = document.getElementById("rdate").value;
    let time = document.getElementById("rtime").value;

    if (name === "" || date === "" || time === "") {
        alert("Please fill all reservation details!");
        return;
    }

    let selectedDate = new Date(date);
    let today = new Date();

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
        alert("Please select a future date!");
        return;
    }

    alert("Table booked successfully!");
}


// ==========================================================================
// 6. CART & MENU LOGIC (Fulfills: Smooth sync of cross-section updates)
// ==========================================================================
let total = 0;

function addToCart(price) {
    total += price;

    // Updates UI elements synchronously across separate panel states
    document.getElementById("orderTotal").innerText = "Total: Rs." + total;
    document.getElementById("total").innerText = "Total: Rs." + total;

    alert("Item added!");
}


// ==========================================================================
// 7. ORDER PLACE VALIDATION
// ==========================================================================
function placeOrder() {
    if (total === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Total: Rs." + total);

    // FIXED BUG: Resetting values globally across both UI instances
    total = 0;
    document.getElementById("orderTotal").innerText = "Total: Rs.0";
    document.getElementById("total").innerText = "Total: Rs.0";
}