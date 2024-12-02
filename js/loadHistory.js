function loadHistory() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loadButtonsDiv = document.getElementById('loadButtons');
    loadButtonsDiv.innerHTML = ''; // Clear previous buttons

    // Loop through all keys in local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(loggedInUser + '_')) { // Check if the key belongs to the logged-in user
            const scoreData = localStorage.getItem(key);
            const data = JSON.parse(scoreData);

            // Check if currentScore is defined before creating the entry
            if (data.currentScore !== undefined) {
                // Create a text entry for the saved score
                const matchEntry = document.createElement('div');
                matchEntry.className = 'match-entry';
                matchEntry.innerHTML = `
                    <p><strong>Team Name:</strong> ${data.teamName}</p>
                    <p><strong>Score:</strong> ${data.currentScore}</p>
                    <p><strong>Net Zone Samples:</strong> ${data.nzNum}</p>
                    <p><strong>Low Box:</strong> ${data.lbNum}</p>
                    <p><strong>High Box:</strong> ${data.hbNum}</p>
                    <p><strong>Net Zone TeleOp Samples:</strong> ${data.nzTeleOpNum}</p>
                    <p><strong>Low Box TeleOp Samples:</strong> ${data.lbTeleOpNum}</p>
                    <p><strong>High Box TeleOp Samples:</strong> ${data.hbTeleOpNum}</p>
                    <p><strong>Low Corner TeleOp Samples:</strong> ${data.lcTeleOpNum}</p>
                    <p><strong>High Corner TeleOp Samples:</strong> ${data.hcTeleOpNum}</p>
                    <p><strong>End Game Location:</strong> ${getEndGameLocation(data.endGamePoints)}</p>
                    <p><strong>TeleOp End Game Location:</strong> ${getEndGameLocation(data.endGamePointsTeleOp)}</p>
                    <p><strong>Comment:</strong> ${data.comment}</p>
                `;
                loadButtonsDiv.appendChild(matchEntry);
            }
        }
    }

    if (loadButtonsDiv.innerHTML === '') {
        loadButtonsDiv.innerHTML = '<p>No saved matches found.</p>'; // Inform user if no buttons were created
    }
}

function getEndGameLocation(points) {
    switch (points) {
        case '0':
            return 'None (0 pts)';
        case '3':
            return 'Observation Zone (3 pts)';
        case '15':
            return 'Level 2 Ascent (15 pts)';
        case '30':
            return 'Level 3 Ascent (30 pts)';
        default:
            return 'Unknown';
    }
}

function loadScoreData(addressKey) {
    const scoreData = localStorage.getItem(addressKey);
    if (scoreData) {
        const data = JSON.parse(scoreData);
        // Load the data into the scoreboard
        currentScore = data.currentScore;
        nzNum = data.nzNum;
        lbNum = data.lbNum;
        hbNum = data.hbNum;
        lcNum = data.lcNum;
        hcNum = data.hcNum;
        nzTeleOpNum = data.nzTeleOpNum;
        lbTeleOpNum = data.lbTeleOpNum;
        hbTeleOpNum = data.hbTeleOpNum;
        lcTeleOpNum = data.lcTeleOpNum;
        hcTeleOpNum = data.hcTeleOpNum;

        // Set the radio buttons based on saved data
        document.querySelector(`input[name="endGame"][value="${data.endGamePoints}"]`).checked = true;
        document.querySelector(`input[name="endGameTeleOp"][value="${data.endGamePointsTeleOp}"]`).checked = true;

        // Update the displayed scores
        updateScore(); // Call your existing updateScore function
    } else {
        console.warn(`No score data found for ${addressKey}`);
    }
}

// Call loadHistory on page load to populate buttons
window.onload = loadHistory;