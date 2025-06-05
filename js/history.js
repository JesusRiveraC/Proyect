document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos HTML
    const homeIcon = document.getElementById('homeIcon');
    const profileIcon = document.getElementById('profileIcon');
    const historyTableBody = document.getElementById('historyTableBody');
    const energyConsumptionChartCanvas = document.getElementById('energyConsumptionChart');

    // Controles de tabla
    const sortOrderSelect = document.getElementById('sortOrder');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const filterDateBtn = document.getElementById('filterDateBtn');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // --- Datos de ejemplo para el historial ---
    // Asegurarse de que las fechas sean objetos Date para facilitar la manipulación.
    // Los valores de energía deben ser numéricos.
    let mockHistoryData = [
        { date: new Date('2025-05-28'), energyConsumed: 15.2 },
        { date: new Date('2025-05-29'), energyConsumed: 16.8 },
        { date: new Date('2025-05-30'), energyConsumed: 14.5 },
        { date: new Date('2025-05-31'), energyConsumed: 17.1 },
        { date: new Date('2025-06-01'), energyConsumed: 16.0 },
        { date: new Date('2025-06-02'), energyConsumed: 15.5 },
        { date: new Date('2025-06-03'), energyConsumed: 17.9 },
        { date: new Date('2025-06-04'), energyConsumed: 18.2 },
        { date: new Date('2025-06-05'), energyConsumed: 19.1 },
        { date: new Date('2025-06-06'), energyConsumed: 17.5 },
        { date: new Date('2025-06-07'), energyConsumed: 16.3 },
        { date: new Date('2025-06-08'), energyConsumed: 18.8 },
        { date: new Date('2025-06-09'), energyConsumed: 19.5 },
        { date: new Date('2025-06-10'), energyConsumed: 20.0 },
        { date: new Date('2025-05-27'), energyConsumed: 14.0 }, // Agregado para más datos
        { date: new Date('2025-05-26'), energyConsumed: 13.5 }, // Agregado para más datos
    ];

    let currentData = [...mockHistoryData]; // Datos sobre los que se opera (filtrados/ordenados)
    const itemsPerPage = 7; // Cantidad de elementos a mostrar inicialmente y por cada "cargar más"
    let currentPage = 1; // Página actual para la paginación

    let chartInstance; // Variable para almacenar la instancia del gráfico de Chart.js

    // --- Funciones de Utilidad ---

    // Formatea una fecha a 'DD/MM/YYYY' para mostrar en la tabla
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // --- Lógica de Ordenamiento, Paginación y Filtro ---

    // Función para ordenar los datos
    function sortData(data, order) {
        return [...data].sort((a, b) => {
            if (order === 'asc') {
                return a.date.getTime() - b.date.getTime(); // De más antiguo a más reciente
            } else {
                return b.date.getTime() - a.date.getTime(); // De más reciente a más antiguo
            }
        });
    }

    // Función para filtrar los datos por rango de fechas
    function filterDataByDateRange(data, startDate, endDate) {
        if (!startDate && !endDate) {
            return data; // No hay filtro, devuelve todos los datos
        }

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        // Ajusta la fecha final para incluir todo el día
        if (end) {
            end.setHours(23, 59, 59, 999);
        }

        return data.filter(entry => {
            const entryDate = new Date(entry.date);
            let matchesStart = true;
            let matchesEnd = true;

            if (start) {
                matchesStart = entryDate >= start;
            }
            if (end) {
                matchesEnd = entryDate <= end;
            }
            return matchesStart && matchesEnd;
        });
    }

    // Función para renderizar la tabla con los datos actuales (paginación aplicada)
    function populateHistoryTable() {
        // Obtener los datos a mostrar según la paginación
        const endIndex = currentPage * itemsPerPage;
        const dataToDisplay = currentData.slice(0, endIndex);

        historyTableBody.innerHTML = ''; // Limpia las filas existentes

        if (dataToDisplay.length > 0) {
            dataToDisplay.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatDate(entry.date)}</td>
                    <td>${entry.energyConsumed} kWh</td>
                `;
                historyTableBody.appendChild(row);
            });
        } else {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `<td colspan="2">No history data available for this selection.</td>`;
            historyTableBody.appendChild(noDataRow);
        }

        // Habilitar/deshabilitar el botón "Cargar Más"
        if (endIndex >= currentData.length) {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'No More Data';
        } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More';
        }
    }

    // Función para actualizar el gráfico
    function updateChart(data) {
        if (chartInstance) {
            chartInstance.destroy(); // Destruye la instancia anterior del gráfico si existe
        }

        const dates = data.map(entry => formatDate(entry.date)); // Fechas formateadas para etiquetas
        const consumption = data.map(entry => entry.energyConsumed);

        if (energyConsumptionChartCanvas) {
            const ctx = energyConsumptionChartCanvas.getContext('2d');
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Energy Consumed (kWh)',
                        data: consumption,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Energy (kWh)'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + ' kWh';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            console.error('Canvas element for chart not found!');
        }
    }

    // Función para aplicar filtros y ordenamiento y actualizar todo
    function applyFiltersAndSort() {
        // 1. Filtrar
        const selectedStartDate = startDateInput.value;
        const selectedEndDate = endDateInput.value;
        let filteredData = filterDataByDateRange(mockHistoryData, selectedStartDate, selectedEndDate);

        // 2. Ordenar
        const sortOrder = sortOrderSelect.value;
        currentData = sortData(filteredData, sortOrder);

        // Resetear la paginación a la primera página después de filtrar/ordenar
        currentPage = 1;

        // 3. Actualizar la tabla y el gráfico
        populateHistoryTable();
        updateChart(currentData); // El gráfico siempre muestra todos los datos filtrados/ordenados
    }

    // --- Listeners de Eventos (actualizados) ---

    // Listener para el clic en el icono de casa (volver al dashboard)
    homeIcon.addEventListener('click', () => {
        // En una aplicación real, redirigirías al dashboard
        window.location.href = '/html/dashboard.html';
    });

    // Listener para el clic en el icono de perfil
    profileIcon.addEventListener('click', () => {
        alert('Navigating to user profile from history page!');
        // window.location.href = '/profile.html';
    });

    // Listener para el cambio en el orden de clasificación
    sortOrderSelect.addEventListener('change', applyFiltersAndSort);

    // Listener para el botón de filtrar fechas
    filterDateBtn.addEventListener('click', applyFiltersAndSort);

    // Listener para el botón de limpiar filtro
    clearFilterBtn.addEventListener('click', () => {
        startDateInput.value = ''; // Limpia el campo de fecha de inicio
        endDateInput.value = '';   // Limpia el campo de fecha de fin
        applyFiltersAndSort();     // Vuelve a aplicar filtros (ahora sin fechas)
    });

    // Listener para el botón "Cargar Más"
    loadMoreBtn.addEventListener('click', () => {
        currentPage++; // Incrementa la página actual
        populateHistoryTable(); // Vuelve a poblar la tabla con más datos
    });


    // --- Inicialización al cargar la página ---
    // Asegura que los datos iniciales estén ordenados por más reciente y se muestren con paginación
    applyFiltersAndSort(); // Esto llamará a populateHistoryTable y updateChart inicialmente
});
