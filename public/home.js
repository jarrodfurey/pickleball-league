// public/home.js

document.addEventListener("DOMContentLoaded", async () => {
  // Display upcoming matches
  await displayUpcomingMatches();

  // Display top players
  await displayTopPlayers();
});

/**
 * Fetches matches and displays them in a single, compact table.
 */
async function displayUpcomingMatches() {
  try {
    const response = await fetch("/api/matches");
    const matches = await response.json();

    // Determine current week's Monday -> Sunday
    const { monday, sunday } = getCurrentWeekRange();

    // Filter matches within the current week
    const currentWeekMatches = matches.filter((match) => {
      const matchDate = new Date(match.date);
      return matchDate >= monday && matchDate <= sunday;
    });

    const schedulePreviewContent = document.getElementById(
      "schedulePreviewContent"
    );
    schedulePreviewContent.innerHTML = ""; // Clear existing content

    if (!currentWeekMatches.length) {
      schedulePreviewContent.innerHTML =
        "<p>No matches scheduled for the current week.</p>";
      return;
    }

    // Create a table for upcoming matches
    const table = document.createElement("table");
    table.classList.add("upcoming-matches-table");

    // Table header
    table.innerHTML = `
        <thead>
          <tr>
            <th>Date</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Score</th> <!-- optional column -->
          </tr>
        </thead>
        <tbody></tbody>
      `;
    const tbody = table.querySelector("tbody");

    // Sort matches by date ascending (in case they're not sorted)
    currentWeekMatches.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Populate rows
    currentWeekMatches.forEach((match) => {
      const row = document.createElement("tr");

      // Date cell
      const dateCell = document.createElement("td");
      const matchDate = new Date(match.date);
      dateCell.textContent = matchDate.toDateString(); // e.g. "Mon Jan 15 2024"
      row.appendChild(dateCell);

      // Team 1 cell
      const team1Cell = document.createElement("td");
      team1Cell.textContent = `${match.team1.player1} & ${match.team1.player2}`;
      row.appendChild(team1Cell);

      // Team 2 cell
      const team2Cell = document.createElement("td");
      team2Cell.textContent = `${match.team2.player1} & ${match.team2.player2}`;
      row.appendChild(team2Cell);

      // Score cell (optional)
      const scoreCell = document.createElement("td");
      // If match.team1Score is null => unplayed
      if (match.team1Score !== null && match.team2Score !== null) {
        scoreCell.textContent = `${match.team1Score} - ${match.team2Score}`;
      } else {
        scoreCell.textContent = "-"; // Not played or not updated
      }
      row.appendChild(scoreCell);

      tbody.appendChild(row);
    });

    schedulePreviewContent.appendChild(table);
  } catch (error) {
    console.error("Error fetching schedule preview:", error);
    const schedulePreviewContent = document.getElementById(
      "schedulePreviewContent"
    );
    schedulePreviewContent.innerHTML =
      "<p>An error occurred while loading upcoming matches.</p>";
  }
}

/**
 * Fetches the top players and displays them in a small table
 */
async function displayTopPlayers() {
  try {
    const leaderboardResponse = await fetch("/api/leaderboard");
    let players = await leaderboardResponse.json();

    // Take the top 3 players (or however many you want)
    players = players.slice(0, 3);

    const leaderboardPreviewContent = document.getElementById(
      "leaderboardPreviewContent"
    );
    leaderboardPreviewContent.innerHTML = ""; // Clear existing content

    if (!players.length) {
      leaderboardPreviewContent.innerHTML =
        "<tr><td colspan='3'>No players found.</td></tr>";
      return;
    }

    players.forEach((player, index) => {
      const row = document.createElement("tr");

      // Rank
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      // Name
      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      row.appendChild(nameCell);

      // Points
      const pointsCell = document.createElement("td");
      pointsCell.textContent = player.points;
      row.appendChild(pointsCell);

      leaderboardPreviewContent.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching leaderboard preview:", error);
    const leaderboardPreviewContent = document.getElementById(
      "leaderboardPreviewContent"
    );
    leaderboardPreviewContent.innerHTML =
      "<tr><td colspan='3'>An error occurred while loading the leaderboard.</td></tr>";
  }
}

/**
 * Returns start of the current week (Monday) and end of the current week (Sunday).
 */
function getCurrentWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday = 0 ... Saturday = 6
  const monday = new Date(today);
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}
