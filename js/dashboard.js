document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos HTML
    const profileIcon = document.getElementById('profileIcon');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const addEnergyBtn = document.getElementById('addEnergyBtn');
    const viewP2PSystemBtn = document.getElementById('viewP2PSystemBtn'); // Nuevo botón P2P

    // Referencias opcionales para actualizar la batería dinámicamente
    const totalBatterySpan = document.getElementById('totalBattery');
    const batteryFillBar = document.querySelector('.battery-fill');

    // --- Listeners de Eventos ---

    // Listener para el clic en el icono de perfil
    profileIcon.addEventListener('click', () => {
        window.location.href = '/html/profile.html'; 
    });

    // Listener para el clic en el botón "View Consumption History"
    viewHistoryBtn.addEventListener('click', () => {
        window.location.href = '/html/history.html'; // Asegúrate de que esta ruta sea correcta
    });

    // Listener para el clic en el botón "Add Energy"
    addEnergyBtn.addEventListener('click', () => {
        alert('Opening Add Energy dialog!'); 
    });

    // Listener para el nuevo botón "View P2P System"
    viewP2PSystemBtn.addEventListener('click', () => {
        window.location.href = '/html/p2p-energy.html'; // Redirige a la nueva página P2P
    });

    // --- Función Opcional: Actualizar la visualización de la batería ---
    function updateBatteryDisplay(percentage, timeRemaining) {
        totalBatterySpan.textContent = `${percentage}%`;
        batteryFillBar.style.width = `${percentage}%`;
        batteryFillBar.querySelector('.battery-time').textContent = timeRemaining;
    }
});
