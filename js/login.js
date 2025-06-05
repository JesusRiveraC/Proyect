document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");

  // Simulated credentials (replace with real validation later)
  const validUser = username === "admin" && password === "1234";

  if (validUser) {
    // Redirect to dashboard
    window.location.href = "/html/dashboard.html";
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
});