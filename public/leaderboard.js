// leaderboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardBody = document.getElementById("leaderboardBody");

  try {
    const res = await fetch("/api/leaderboard"); // Adjust the URL if different
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const players = await res.json();

    // Log the received players data for debugging
    console.log("Received players data:", players);

    // Clear existing content
    leaderboardBody.innerHTML = "";

    players.forEach((player, index) => {
      console.log(`Processing player ${index + 1}:`, player); // Debugging log

      const row = document.createElement("tr");

      // Rank
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      // Player Name
      const nameCell = document.createElement("td");
      const playerLink = document.createElement("a");
      playerLink.href = `/player.html?name=${encodeURIComponent(player.name)}`;
      playerLink.textContent = player.name;
      nameCell.appendChild(playerLink);
      row.appendChild(nameCell);

      // Matches Played
      const matchesCell = document.createElement("td");
      matchesCell.textContent = player.matchesPlayed;
      row.appendChild(matchesCell);

      // Wins
      const winsCell = document.createElement("td");
      winsCell.textContent = player.wins;
      row.appendChild(winsCell);

      // Win Rate
      const winRateCell = document.createElement("td");
      let winRate = parseFloat(player.winRate); // Convert to number
      if (isNaN(winRate)) {
        console.warn(
          `Invalid winRate for player ${player.name}:`,
          player.winRate
        );
        winRate = 0; // Default to 0 if invalid
      }
      winRateCell.textContent = winRate.toFixed(2);
      row.appendChild(winRateCell);

      // Points
      const pointsCell = document.createElement("td");
      pointsCell.textContent = player.points;
      row.appendChild(pointsCell);

      leaderboardBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    leaderboardBody.innerHTML = `<tr><td colspan="6">Failed to load leaderboard.</td></tr>`;
  }
});
