// public/results.js

document.addEventListener("DOMContentLoaded", async () => {
  const weeksGrid = document.querySelector(".weeks-grid");
  const weekDetails = document.getElementById("week-details");

  try {
    const response = await fetch("/api/matches");
    const matches = await response.json();

    if (!matches || matches.length === 0) {
      weeksGrid.innerHTML = "<p>No match results available.</p>";
      return;
    }

    // Group matches by week
    const weeks = {};
    matches.forEach((match) => {
      // Extract week number from match.id (e.g., "week1-match1-court1" => "Week 1")
      const weekMatch = match.id.match(/^week(\d+)-match\d+-court\d+$/i);
      const weekNumber = weekMatch ? `Week ${weekMatch[1]}` : "Unknown Week";

      if (!weeks[weekNumber]) weeks[weekNumber] = [];
      weeks[weekNumber].push(match);
    });

    // Sort the weeks in ascending order (Week 1, Week 2, ...)
    const sortedWeekKeys = Object.keys(weeks).sort((a, b) => {
      const weekA = parseInt(a.replace(/\D/g, ""), 10);
      const weekB = parseInt(b.replace(/\D/g, ""), 10);
      return weekA - weekB;
    });

    // Generate buttons for each week
    sortedWeekKeys.forEach((week) => {
      const button = document.createElement("button");
      button.textContent = week;
      button.classList.add("week-button");
      button.addEventListener("click", () =>
        showWeekResults(weeks[week], week, button)
      );
      weeksGrid.appendChild(button);
    });

    // Function to display match results for a specific week
    const showWeekResults = (matches, week, button) => {
      // Remove 'active' class from all buttons
      document
        .querySelectorAll(".week-button")
        .forEach((btn) => btn.classList.remove("active"));
      // Add 'active' class to the clicked button
      button.classList.add("active");

      weekDetails.innerHTML = `<h2>${week}</h2>`;
      const table = document.createElement("table");
      table.classList.add("table");
      table.innerHTML = `
            <thead>
              <tr>
                <th>Match ID</th>
                <th>Team 1</th>
                <th>Team 2</th>
                <th>Team 1 Score</th>
                <th>Team 2 Score</th>
                <th>Winner</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${matches
                .map(
                  (match) => `
                  <tr>
                    <td>${match.id || "-"}</td>
                    <td>${match.team1.player1} & ${match.team1.player2}</td>
                    <td>${match.team2.player1} & ${match.team2.player2}</td>
                    <td>${
                      match.team1Score !== null ? match.team1Score : "-"
                    }</td>
                    <td>${
                      match.team2Score !== null ? match.team2Score : "-"
                    }</td>
                    <td>${
                      match.winner
                        ? formatWinner(match.winner, match.team1, match.team2)
                        : "-"
                    }</td>
                    <td>${match.date || "-"}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          `;
      weekDetails.appendChild(table);
      weekDetails.classList.add("active");
    };

    // Helper function to format the winner display
    const formatWinner = (winner, team1, team2) => {
      if (winner === "team1") {
        return `${team1.player1} & ${team1.player2}`;
      } else if (winner === "team2") {
        return `${team2.player1} & ${team2.player2}`;
      } else if (winner === "Draw") {
        return "Draw";
      } else {
        return winner; // In case of unexpected values
      }
    };

    // Automatically show the first week's results
    if (sortedWeekKeys.length > 0) {
      const firstWeek = sortedWeekKeys[0];
      const firstButton = weeksGrid.querySelector(".week-button");
      if (firstButton) {
        showWeekResults(weeks[firstWeek], firstWeek, firstButton);
      }
    }
  } catch (error) {
    console.error("Error fetching match results:", error);
    weeksGrid.innerHTML = "<p>An error occurred while loading results.</p>";
  }
});
