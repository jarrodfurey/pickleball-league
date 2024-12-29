// public/player.js

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const playerName = urlParams.get("name");

  const playerNameHeader = document.getElementById("playerName");
  const matchesBody = document.getElementById("matchesBody");

  if (!playerName) {
    playerNameHeader.textContent = "Player Not Found";
    matchesBody.innerHTML = `<tr><td colspan="7">No player specified.</td></tr>`;
    return;
  }

  playerNameHeader.textContent = playerName;

  try {
    const res = await fetch(
      `/api/player?name=${encodeURIComponent(playerName)}`
    );
    if (!res.ok) {
      throw new Error("Player not found.");
    }
    const playerData = await res.json();
    const matches = playerData.matchHistory;

    if (matches.length === 0) {
      matchesBody.innerHTML = `<tr><td colspan="7">No matches found for this player.</td></tr>`;
      return;
    }

    // Sort matches by date ascending
    matches.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Assign week numbers based on match dates
    const matchesWithWeeks = assignWeekNumbers(matches);

    matchesWithWeeks.forEach((match) => {
      const row = document.createElement("tr");

      // Week
      const weekCell = document.createElement("td");
      weekCell.textContent = match.week;
      row.appendChild(weekCell);

      // Date
      const dateCell = document.createElement("td");
      dateCell.textContent = match.date;
      row.appendChild(dateCell);

      // Player's Team
      const playerTeam =
        match.team1.player1 === playerName || match.team1.player2 === playerName
          ? match.team1
          : match.team2;
      const playerTeamNames = `${playerTeam.player1} & ${playerTeam.player2}`;
      const playerTeamCell = document.createElement("td");
      playerTeamCell.textContent = playerTeamNames;
      row.appendChild(playerTeamCell);

      // Opponent Team
      const opponentTeam =
        playerTeam === match.team1 ? match.team2 : match.team1;
      const opponentTeamNames = `${opponentTeam.player1} & ${opponentTeam.player2}`;
      const opponentCell = document.createElement("td");
      opponentCell.textContent = opponentTeamNames;
      row.appendChild(opponentCell);

      // Your Team Score
      const yourScore =
        playerTeam === match.team1 ? match.team1Score : match.team2Score;
      const yourScoreCell = document.createElement("td");
      yourScoreCell.textContent = yourScore !== null ? yourScore : "-";
      row.appendChild(yourScoreCell);

      // Opponent Team Score
      const oppScore =
        playerTeam === match.team1 ? match.team2Score : match.team1Score;
      const oppScoreCell = document.createElement("td");
      oppScoreCell.textContent = oppScore !== null ? oppScore : "-";
      row.appendChild(oppScoreCell);

      // Result
      const resultCell = document.createElement("td");
      if (match.winner === "Draw") {
        resultCell.textContent = "Draw";
        resultCell.classList.add("draw");
      } else {
        const yourTeamWon =
          (match.winner === "team1" && playerTeam === match.team1) ||
          (match.winner === "team2" && playerTeam === match.team2);
        if (yourTeamWon) {
          resultCell.textContent = "Win";
          resultCell.classList.add("success");
        } else {
          resultCell.textContent = "Loss";
          resultCell.classList.add("loss");
        }
      }
      row.appendChild(resultCell);

      matchesBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    playerNameHeader.textContent = "Player Not Found";
    matchesBody.innerHTML = `<tr><td colspan="7">Player not found.</td></tr>`;
  }

  // Function to assign week numbers based on dates
  function assignWeekNumbers(matches) {
    const matchesWithWeeks = [];
    let currentWeek = 1;
    let lastDate = null;

    matches.forEach((match) => {
      const matchDate = new Date(match.date);
      if (!lastDate) {
        lastDate = matchDate;
      } else {
        // If match is 7 days or more after the lastDate, increment the week
        const diffTime = matchDate - lastDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        if (diffDays >= 7) {
          currentWeek++;
          lastDate = matchDate;
        }
      }
      matchesWithWeeks.push({ ...match, week: `Week ${currentWeek}` });
    });

    return matchesWithWeeks;
  }
});
