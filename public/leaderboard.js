// public/leaderboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const leaderboardBody = document.getElementById("leaderboardBody");

  try {
    const res = await fetch("/api/leaderboard");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const players = await res.json();

    // Clear existing content (if any)
    leaderboardBody.innerHTML = "";

    players.forEach((player, index) => {
      const row = document.createElement("tr");

      // Rank
      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      // Player Name (Clickable)
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
      winRateCell.textContent = player.winRate.toFixed(2); // Assuming winRate is a number
      row.appendChild(winRateCell);

      // Points
      const pointsCell = document.createElement("td");
      pointsCell.textContent = player.points;
      row.appendChild(pointsCell);

      leaderboardBody.appendChild(row);
    });

    // Optional: Sort Players by Points Descending (if not already sorted)
    /*
      players.sort((a, b) => b.points - a.points);
      // Re-render the leaderboard
      */
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    leaderboardBody.innerHTML = `<tr><td colspan="6">Failed to load leaderboard.</td></tr>`;
  }
});
