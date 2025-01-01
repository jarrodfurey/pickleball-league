// createMatches.js

const fs = require("fs");
const path = require("path");

// Load schedule data
const schedulePath = path.join(__dirname, "schedule.json");
let scheduleData;
try {
  scheduleData = JSON.parse(fs.readFileSync(schedulePath, "utf-8"));
} catch (error) {
  console.error("Error reading schedule.json:", error.message);
  process.exit(1);
}

// Load existing data
const dataPath = path.join(__dirname, "data.json");
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} catch (error) {
  console.error("Error reading data.json:", error.message);
  process.exit(1);
}

// Function to generate unique match IDs
const generateMatchId = (week, index) => `week${week}-match${index + 1}`;

// Function to calculate the date based on week number
const getDateForWeek = (weekNumber) => {
  // Define the start date for week 1 (January 4th, 2025)
  const startDate = new Date("2025-01-04"); // Adjust the year if necessary

  // Calculate the date for the given week
  const matchDate = new Date(startDate);
  matchDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

  // Format the date as YYYY-MM-DD
  const year = matchDate.getFullYear();
  const month = String(matchDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(matchDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Iterate through each week and create matches
scheduleData.forEach((week) => {
  const { week: weekNumber, matchups } = week;

  // Calculate the date for this week
  const matchDate = getDateForWeek(weekNumber);

  matchups.forEach((matchup, index) => {
    const [timeSlot, court1, court2] = matchup;

    // Skip FREE BLOCKs
    if (court1 === "FREE BLOCK" || court2 === "FREE BLOCK") return;

    // Extract team players
    const [team1Str, team2Str] = [court1, court2].map((court) =>
      court.split(" vs ")
    );

    const team1Players = team1Str[0].split("/");
    const team2Players = team2Str[0].split("/");

    // Create match entry
    const match = {
      id: generateMatchId(weekNumber, index),
      team1: {
        player1: team1Players[0].trim(),
        player2: team1Players[1].trim(),
      },
      team2: {
        player1: team2Players[0].trim(),
        player2: team2Players[1].trim(),
      },
      team1Score: null, // Initially no score
      team2Score: null, // Initially no score
      winner: null, // Initially no winner
      date: matchDate, // Assign the calculated date
    };

    // Add match to data if it doesn't already exist
    const existingMatch = data.matches.find((m) => m.id === match.id);
    if (!existingMatch) {
      data.matches.push(match);
      console.log(`Created match: ${match.id}`);
    } else {
      // Optionally, update the date if the match already exists
      // This ensures that dates are corrected if the script is re-run
      existingMatch.date = matchDate;
      console.log(`Updated date for existing match: ${match.id}`);
    }
  });
});

// Save updated data back to data.json
try {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  console.log("All matches have been processed and data.json updated.");
} catch (error) {
  console.error("Error writing to data.json:", error.message);
  process.exit(1);
}
