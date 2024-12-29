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
      const matchWeek = match.week || "Week 1"; // Ensure week property exists
      if (!weeks[matchWeek]) weeks[matchWeek] = [];
      weeks[matchWeek].push(match);
    });

    // Generate buttons for each week
    Object.keys(weeks).forEach((week) => {
      const button = document.createElement("button");
      button.textContent = week;
      button.classList.add("week-button");
      button.addEventListener("click", () =>
        showWeekResults(weeks[week], week)
      );
      weeksGrid.appendChild(button);
    });

    // Show results for a specific week
    const showWeekResults = (matches, week) => {
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
                  <td>${match.team1Score !== null ? match.team1Score : "-"}</td>
                  <td>${match.team2Score !== null ? match.team2Score : "-"}</td>
                  <td>${match.winner || "-"}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;
      weekDetails.appendChild(table);
      weekDetails.classList.add("active");
    };

    // Automatically show the first week's results
    const firstWeek = Object.keys(weeks)[0];
    if (firstWeek) {
      showWeekResults(weeks[firstWeek], firstWeek);
      document.querySelector(`.week-button`).classList.add("active");
    }
  } catch (error) {
    console.error("Error fetching match results:", error);
    weeksGrid.innerHTML = "<p>An error occurred while loading results.</p>";
  }
});
