document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const homeIcon = document.getElementById('homeIcon');
    const profileIcon = document.getElementById('profileIcon');
    const simulateTradeBtn = document.getElementById('simulateTradeBtn');
    const resetSimulationBtn = document.getElementById('resetSimulationBtn');
    const neighborAExcessSpan = document.getElementById('neighborAExcess');
    const neighborBNeededSpan = document.getElementById('neighborBNeeded');
    const transactionLogUl = document.getElementById('transactionLog');

    // --- Simulation State ---
    let neighborAExcess = 10; // Initial excess energy for Neighbor A
    let neighborBNeeded = 5;  // Initial needed energy for Neighbor B
    let transactionCount = 0; // To keep track of simulated transactions

    // --- Utility Functions ---

    // Function to add a log entry to the transaction log
    function addTransactionLog(message) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString();
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
        transactionLogUl.prepend(listItem); // Add to the top
        // Keep the log from getting too long
        if (transactionLogUl.children.length > 20) {
            transactionLogUl.removeChild(transactionLogUl.lastChild);
        }
    }

    // Function to update the displayed energy values
    function updateEnergyDisplay() {
        neighborAExcessSpan.textContent = `${neighborAExcess} kWh`;
        neighborBNeededSpan.textContent = `${neighborBNeeded} kWh`;
    }

    // Function to simulate an energy trade
    function simulateEnergyTrade() {
        if (neighborAExcess <= 0) {
            addTransactionLog('Neighbor A has no excess energy to sell.');
            return;
        }
        if (neighborBNeeded <= 0) {
            addTransactionLog('Neighbor B does not need energy.');
            return;
        }

        const tradeAmount = Math.min(neighborAExcess, neighborBNeeded, 2); // Trade a max of 2 kWh at a time
        if (tradeAmount === 0) {
            addTransactionLog('No energy to trade at this moment.');
            return;
        }

        neighborAExcess -= tradeAmount;
        neighborBNeeded -= tradeAmount;
        transactionCount++;

        const transactionMessage = `TX #${transactionCount}: Neighbor A sold ${tradeAmount} kWh to Neighbor B.`;
        addTransactionLog(transactionMessage);
        updateEnergyDisplay();

        // Conceptual: In a real system, this would involve smart contract execution
        // and actual energy metering.
    }

    // Function to reset the simulation
    function resetSimulation() {
        neighborAExcess = 10;
        neighborBNeeded = 5;
        transactionCount = 0;
        transactionLogUl.innerHTML = '<li><span class="timestamp">[00:00:00]</span> System initialized.</li>';
        updateEnergyDisplay();
        addTransactionLog('Simulation reset.');
    }

    // --- Event Listeners ---

    // Listener for home icon click (back to dashboard)
    homeIcon.addEventListener('click', () => {
        window.location.href = '/html/dashboard.html';
    });

    // Listener for profile icon click (to user profile)
    profileIcon.addEventListener('click', () => {
        window.location.href = '/html/profile.html';
    });

    // Listener for simulate trade button click
    simulateTradeBtn.addEventListener('click', simulateEnergyTrade);

    // Listener for reset simulation button click
    resetSimulationBtn.addEventListener('click', resetSimulation);

    // Initial display update
    updateEnergyDisplay();
});
