document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos HTML
    const homeIcon = document.getElementById('homeIcon');
    const profileIcon = document.getElementById('profileIcon');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Referencias a los elementos del modal
    const logoutConfirmationModal = document.getElementById('logoutConfirmationModal');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    // --- Funciones para controlar el modal ---
    function showModal() {
        logoutConfirmationModal.style.display = 'flex'; // Muestra el overlay y centra el modal
    }

    function hideModal() {
        logoutConfirmationModal.style.display = 'none'; // Oculta el modal
    }

    // --- Listeners de Eventos ---

    // Listener para el clic en el icono de casa (volver al dashboard)
    homeIcon.addEventListener('click', () => {
        window.location.href = '/html/dashboard.html';
    });

    // Listener para el clic en el icono de perfil (si decides mantenerlo y darle otra función)
    profileIcon.addEventListener('click', () => {
        alert('Already on profile page!');
    });

    // Listener para el botón "Change Password"
    changePasswordBtn.addEventListener('click', () => {
        alert('Opening Change Password dialog/page!');
    });

    // Listener para el botón "Log Out" (ahora muestra el modal)
    logoutBtn.addEventListener('click', () => {
        showModal(); // Muestra el modal de confirmación
    });

    // Listener para el botón "Cancel" del modal
    cancelLogoutBtn.addEventListener('click', () => {
        hideModal(); // Oculta el modal
    });

    // Listener para el botón "Yes, Log Out" del modal
    confirmLogoutBtn.addEventListener('click', () => {
        hideModal(); // Oculta el modal antes de redirigir
        window.location.href = '/index.html'; // Redirige a la página de inicio de sesión
    });

    // --- Funciones para cargar datos del usuario (opcional) ---
    function loadUserData() {
        const userData = {
            username: 'Usser1',
            email: 'proyect_123@gmail.com'
        };

        const usernameElement = document.getElementById('username');
        const userEmailElement = document.getElementById('userEmail');

        if (usernameElement) usernameElement.textContent = userData.username;
        if (userEmailElement) userEmailElement.textContent = userData.email;
    }

    // Llama a la función para cargar los datos del usuario al inicio
    loadUserData();
});