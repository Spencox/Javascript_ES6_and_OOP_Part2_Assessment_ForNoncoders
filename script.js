// Get references to HTML elements
const clubList = document.getElementById('club-list');
const searchInput = document.getElementById('search');
const clubDetailsContainer = document.getElementById('main');


// Attach an input event listener for the search input
searchInput.addEventListener('input', handleSearchInput);

// Initialize football club data and display all clubs
let clubData = footballClubs; 
displayClubs(footballClubs);


// Display football clubs in the club list
function displayClubs(clubs) {
    // Generate HTML for club cards and set it in the clubList element
    const clubCardsHTML = clubs.map(createClubCardHTML).join('');
    clubList.innerHTML = clubCardsHTML;
}

// Create HTML for a football club card
function createClubCardHTML(club) {
    return `
        <div class="club-card" onclick="handleClubClick(this);"><!-- Add onclick event -->
            <h2>${club.name}</h2>
            <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
            <p><b>League: </b>${club.league}</p>
            <p><b>City: </b>${club.city}</p>
            <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
        </div>
    `;
}

// Handle clicking on a football club card
function handleClubClick(element) {
    // TODO: Write your code here for task1
    const clickedClubCard = element;
    if (clickedClubCard) {
        // Get the name of the clicked club
        const clubName = clickedClubCard.querySelector('h2').textContent;
        console.log(clubName);
        // Find the selected club by its name
        const clickedClubData = footballClubs.find(club => club.name === clubName)
        console.log(clickedClubData)  
        // Display details of the selected club
        if (clickedClubData) {
            displayClubDetails(clickedClubData)
        }
    }          
}

// Display football club details
function displayClubDetails(club) {
    // TODO: Write your code here for task2
    // Create a club details HTML using template strings
    const focusedClubCard = 
`
<div id="club-details">
    <button onclick="window.location.reload();" style="width: 100%">Back</button>
        <h2>${club.name}</h2>
        <img src="${club.image}" alt="${club.name} Image" style="width:100%; height:20vh;">
        <p><b>League: </b>${club.league}</p>
        <p><b>City: </b>${club.city}</p>
        <p><b>Stadium: </b>${club.stadium}</p>
        <button onclick="viewClubPlayers('${club.name}'); event.stopPropagation();" style="width:100%;">View Players</button>
    <p><b>Description: </b>${club.description}</p>
</div>
`;    
    // Set the club details HTML in the clubDetailsContainer
    clubDetailsContainer.innerHTML =focusedClubCard;
}

// Function to view club players
function viewClubPlayers(clubName) {
    // Find the selected club by its name
    const selectedClub = clubData.find(club => club.name === clubName);
    // TODO: Write your code here for task3
    
    // Generate HTML for the list of players and display it
    const clubDetailsHTML = 
`
<div id="club-details">
    <button onclick="window.location.reload();" style="width: 100%">Back</button>
    <h2>${selectedClub.name} Players</h2>
    <ul id="players-list" style="list-style-type: none;"></ul>
</div>
`;    
    clubDetailsContainer.innerHTML =clubDetailsHTML;

    const playerDataListEl = document.getElementById('players-list');

    console.log(playerDataListEl);
    
    // Iterate over selectedClub object's players property
    selectedClub.players.forEach(player => {
        // Create a string joining the information of all the players of the selected Club 
        const playerListItem = document.createElement('li');
        playerListItem.innerHTML = 
`
<li>
    <p><b>Name: </b>${player.name}</p>
    <p><b>Position: </b>${player.position}</p>
    <p><b>Goals: </b>${player.goals}</p>
    <p><b>Assists: </b>${player.assists}</p>
</li>
<hr />        
`
    // Display the information by setting the HTML in the clubDetailsContainer
        const playerDataListEl = document.getElementById('players-list');
        playerDataListEl.appendChild(playerListItem);
    })       
}

// Handle search input and filter clubs
function handleSearchInput() {
    // TODO: Write your code here for task4

    // Get the search term and convert it to lowercase for case-insensitive search
    const searchClub = searchInput.value.toLowerCase();

    // Create a string containing club details for searching
    const filteredClubs = clubData.filter(club => {
        const clubDataString = `${club.name} ${club.league} ${club.city}`.toLowerCase();
    // Check if the search term is found in the club data string
        return clubDataString.includes(searchClub);
    });
    
    // Display the filtered clubs
    displayClubs(filteredClubs);
    
}