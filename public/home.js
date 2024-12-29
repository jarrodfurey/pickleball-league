document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Fetch the schedule data
    // Option A: If you have an endpoint /api/matches that includes "week" data
    const scheduleResponse = await fetch("/api/matches");
    const matches = await scheduleResponse.json();

    // 2. Identify "next" matches
    // This part depends on how your data is structured:
    //   - If each match includes a date: find matches whose date is >= today
    //   - Sort by date ascending
    //   - Take the first 3 matches
    const upcomingMatches = getNextMatches(matches, 3);

    const schedulePreviewContent = document.getElementById(
      "schedulePreviewContent"
    );

    if (upcomingMatches.length === 0) {
      schedulePreviewContent.textContent = "No upcoming matches.";
    } else {
      // Create a small list or table
      const ul = document.createElement("ul");
      upcomingMatches.forEach((match) => {
        const li = document.createElement("li");
        li.textContent = `${match.id}: ${match.team1.player1}/${match.team1.player2} vs ${match.team2.player1}/${match.team2.player2} on ${match.date}`;
        ul.appendChild(li);
      });
      schedulePreviewContent.appendChild(ul);
    }
  } catch (error) {
    console.error("Error fetching schedule preview:", error);
  }

  // Now fetch the top players
  try {
    const leaderboardResponse = await fetch("/api/leaderboard");
    let players = await leaderboardResponse.json();

    // Sort or assume it's already sorted by points
    // Take the top 3
    players = players.slice(0, 3);

    const leaderboardPreviewContent = document.getElementById(
      "leaderboardPreviewContent"
    );

    if (players.length === 0) {
      leaderboardPreviewContent.innerHTML =
        "<tr><td colspan='3'>No players found.</td></tr>";
    } else {
      players.forEach((player, index) => {
        const row = document.createElement("tr");

        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;
        row.appendChild(nameCell);

        const pointsCell = document.createElement("td");
        pointsCell.textContent = player.points;
        row.appendChild(pointsCell);

        leaderboardPreviewContent.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching leaderboard preview:", error);
  }
});

/**
 * Sample function: getNextMatches
 * Sort by date ascending, then pick the earliest "count" matches
 * If your match objects have a "date" property, you can parse & compare.
 */
function getNextMatches(matches, count) {
  // parseInt or new Date(...) for match.date
  // For example, if your date is a string '2024-01-15'
  const upcoming = matches.filter((m) => new Date(m.date) >= new Date());
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  return upcoming.slice(0, count);
}
