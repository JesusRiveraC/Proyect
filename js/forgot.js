document
  .getElementById('forgotForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const infoMessage = document.getElementById('infoMessage');

    // Simulate sending a reset link
    infoMessage.style.color = 'green';
    infoMessage.textContent =
      `A reset link has been sent to ${email} (simulation).`;

    // Optionally clear the input
    this.reset();
  });
