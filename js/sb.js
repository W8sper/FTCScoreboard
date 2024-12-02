// Initialize all counters at the start
let currentScore = 0;   
let nzNum = 0;  // Net Zone Samples counter for Auto
let lbNum = 0;  // Low Box counter for Auto
let hbNum = 0;  // High Box counter for Auto
let lcNum = 0;  // Low Chamber counter for Auto
let hcNum = 0;  // High Chamber counter for Auto

// New counters for TeleOp
let nzTeleOpNum = 0;  // Net Zone Samples counter for TeleOp
let lbTeleOpNum = 0;  // Low Box counter for TeleOp
let hbTeleOpNum = 0;  // High Box counter for TeleOp
let lcTeleOpNum = 0;  // Low Chamber counter for TeleOp
let hcTeleOpNum = 0;  // High Chamber counter for TeleOp

let lastEndGamePoints = 0;  // Initialize this variable
let lastEndGamePointsTeleOp = 0;  // New variable for TeleOp

// Point values for each zone
const POINTS = {
    nz: 2,  // Net Zone Samples points
    lb: 4,  // Low Box points
    hb: 8,  // High Box points
    lc: 6,  // Low Chamber points
    hc: 10,  // High Chamber points
    eg: 1,   // End Game multiplier (we'll multiply by the radio value)
    egTeleOp: 1 // New multiplier for TeleOp
};

const TEAM_NAME = document.getElementById('teamName'); // Keep the constant for team name

function updateScore() {
    document.getElementById('score').textContent = currentScore;
    document.getElementById('nzid').textContent = nzNum;
    document.getElementById('lbid').textContent = lbNum;
    document.getElementById('hbid').textContent = hbNum;
    document.getElementById('lcid').textContent = lcNum;
    document.getElementById('hcid').textContent = hcNum;

    // Update TeleOp scores
    document.getElementById('nzTeleOpId').textContent = nzTeleOpNum;
    document.getElementById('lbTeleOpId').textContent = lbTeleOpNum;
    document.getElementById('hbTeleOpId').textContent = hbTeleOpNum;
    document.getElementById('lcTeleOpId').textContent = lcTeleOpNum;
    document.getElementById('hcTeleOpId').textContent = hcTeleOpNum;
}

function addPoints(type, coefficient) {
    switch(type) {
        case 'nz':
            currentScore += POINTS.nz * coefficient;
            nzNum += coefficient;
            break;
        case 'lb':
            currentScore += POINTS.lb * coefficient;
            lbNum += coefficient;
            break;
        case 'hb':
            currentScore += POINTS.hb * coefficient;
            hbNum += coefficient;
            break;
        case 'lc':
            currentScore += POINTS.lc * coefficient;
            lcNum += coefficient;
            break;
        case 'hc':
            currentScore += POINTS.hc * coefficient;
            hcNum += coefficient;
            break;
        case 'nzTeleOp':
            currentScore += POINTS.nz * coefficient; // Assuming same points for TeleOp
            nzTeleOpNum += coefficient;
            break;
        case 'lbTeleOp':
            currentScore += POINTS.lb * coefficient; // Assuming same points for TeleOp
            lbTeleOpNum += coefficient;
            break;
        case 'hbTeleOp':
            currentScore += POINTS.hb * coefficient; // Assuming same points for TeleOp
            hbTeleOpNum += coefficient;
            break;
        case 'lcTeleOp':
            currentScore += POINTS.lc * coefficient; // Assuming same points for TeleOp
            lcTeleOpNum += coefficient;
            break;
        case 'hcTeleOp':
            currentScore += POINTS.hc * coefficient; // Assuming same points for TeleOp
            hcTeleOpNum += coefficient;
            break;
        case 'eg':
            currentScore += coefficient;  // For end game, pon will be the direct point value
            break;
        case 'egTeleOp':
            currentScore += POINTS.egTeleOp * coefficient;  // For end game, pon will be the direct point value
            break;
    }
    updateScore();
}

//生成address的逻辑：username+从1开始increment by 1的整数
function generateAddress() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    // Retrieve the current address counter for the user
    let addressCounter = localStorage.getItem(`${loggedInUser}_addressCounter`) || 0;
    addressCounter = parseInt(addressCounter) + 1; // Increment the counter
    localStorage.setItem(`${loggedInUser}_addressCounter`, addressCounter); // Save the updated counter
    return `${loggedInUser}_${addressCounter}`; // Generate a unique address based on the counter
}

function saveScore() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('No user is logged in. Please log in to save the score.'); // Debugging alert
        return;
    }
    
    const scoreData = {
        currentScore,
        nzNum,
        lbNum,
        hbNum,
        lcNum,
        hcNum,
        endGamePoints: document.querySelector('input[name="endGame"]:checked').value,
        lastEndGamePoints,
        endGamePointsTeleOp: document.querySelector('input[name="endGameTeleOp"]:checked').value,
        lastEndGamePointsTeleOp,
        nzTeleOpNum,
        lbTeleOpNum,
        hbTeleOpNum,
        lcTeleOpNum,
        hcTeleOpNum,
        address: generateAddress(), // Generate a unique address bound to the user
        teamName: TEAM_NAME.value, // Keep team name input
        comment: document.getElementById('commentInput').value // {{ edit_2 }}
    };

    // Save score data to local storage with a unique key
    localStorage.setItem(`${loggedInUser}_${scoreData.address}`, JSON.stringify(scoreData));
    alert('Score saved successfully!'); // Notify user
}

function loadScore() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const address = document.getElementById('addressInput').value; // Get address from input
    const saveKey = `${loggedInUser}_address${address}`;
    
    // Load total score and all counters
    const savedScore = localStorage.getItem(`${saveKey}_score`);
    const savedNZ = localStorage.getItem(`${saveKey}_nzNum`);
    const savedLB = localStorage.getItem(`${saveKey}_lbNum`);
    const savedHB = localStorage.getItem(`${saveKey}_hbNum`);
    const savedLC = localStorage.getItem(`${saveKey}_lcNum`);
    const savedHC = localStorage.getItem(`${saveKey}_hcNum`);
    const savedEndGamePoints = localStorage.getItem(`${saveKey}_endGamePoints`);
    const savedLastEndGamePoints = localStorage.getItem(`${saveKey}_lastEndGamePoints`);
    const savedEndGamePointsTeleOp = localStorage.getItem(`${saveKey}_endGamePointsTeleOp`);
    const savedLastEndGamePointsTeleOp = localStorage.getItem(`${saveKey}_lastEndGamePointsTeleOp`);
}

function handleEndGameChange(radio) {
    const newPoints = parseInt(radio.value);
    // Remove the previous points
    addPoints('eg', -lastEndGamePoints);
    // Add the new points
    addPoints('eg', newPoints);
    // Update the tracking variable
    lastEndGamePoints = newPoints;
}

function handleEndGameChangeTeleOp(radio) {
    const newPoints = parseInt(radio.value);
    // Remove the previous points
    addPoints('egTeleOp', -lastEndGamePointsTeleOp);
    // Add the new points
    addPoints('egTeleOp', newPoints);
    // Update the tracking variable
    lastEndGamePointsTeleOp = newPoints;
}

// Update loadScoreData to include team name and comment
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

        // Load the team name and comment into the inputs
        TEAM_NAME.value = data.teamName; // Keep team name input
        document.getElementById('commentInput').value = data.comment; // {{ edit_3 }}

        // Update the displayed scores
        updateScore(); // Call your existing updateScore function
    } else {
        console.warn(`No score data found for ${addressKey}`);
    }
}
