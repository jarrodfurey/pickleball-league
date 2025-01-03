// server.js

require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const path = require("path");
const fs = require("fs");
const basicAuth = require("express-basic-auth");
const { body, validationResult } = require("express-validator");

const app = express();

// Define Admin Credentials using environment variables
const adminUsers = { [process.env.ADMIN_USER]: process.env.ADMIN_PASS };

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Seoul Pickleball League!");
});

// Apply Basic Auth to Admin Page
app.use(
  "/admin.html",
  basicAuth({
    users: adminUsers,
    challenge: true,
    unauthorizedResponse: "Unauthorized",
  })
);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// --- Helper Functions to Read/Write data.json ---

const readData = () => {
  const dataPath = path.join(__dirname, "data.json");
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading data.json:", error.message);
    throw error;
  }
};

const writeData = (data) => {
  const dataPath = path.join(__dirname, "data.json");
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to data.json:", error.message);
    throw error;
  }
};

// --- API Routes ---

/**
 * GET /api/leaderboard
 * Returns a list of players who have played at least one match, sorted by points desc, then winRate desc
 */
app.get("/api/leaderboard", (req, res) => {
  try {
    const data = readData();
    const players = data.players
      .filter((p) => p.matchesPlayed > 0) // Only include players who have played matches
      .sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points; // Sort by points descending
        }
        return b.winRate - a.winRate; // Then by win rate descending
      });
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /api/matches
 * Returns all matches from data.json
 */
app.get("/api/matches", (req, res) => {
  try {
    const data = readData();
    res.json(data.matches);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /api/player
 * Returns data about a specific player, including match history (only completed matches, i.e., winner != null)
 */
app.get("/api/player", (req, res) => {
  const playerName = req.query.name;

  if (!playerName) {
    return res.status(400).json({ error: "Player name is required." });
  }

  try {
    const data = readData();
    const player = data.players.find((p) => p.name === playerName);

    if (!player) {
      return res.status(404).json({ error: "Player not found." });
    }

    // Find all matches involving this player that have been completed
    const matchHistory = data.matches.filter(
      (m) =>
        (m.team1.player1 === playerName ||
          m.team1.player2 === playerName ||
          m.team2.player1 === playerName ||
          m.team2.player2 === playerName) &&
        m.winner // Only include matches that have a winner (completed)
    );

    const playerData = { ...player, matchHistory };
    res.json(playerData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * POST /api/update-match
 * Updates the scores and winner of a match, reverting any previously awarded points before re-awarding
 */
app.post(
  "/api/update-match",
  [
    body("matchId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Match ID is required."),
    body("team1Score")
      .optional({ nullable: true })
      .isInt({ min: 0 })
      .withMessage("Team 1 Score must be a non-negative integer."),
    body("team2Score")
      .optional({ nullable: true })
      .isInt({ min: 0 })
      .withMessage("Team 2 Score must be a non-negative integer."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors with 400 Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    const { matchId, team1Score, team2Score } = req.body;

    try {
      const data = readData();

      // Find the match by ID
      const matchIndex = data.matches.findIndex((m) => m.id === matchId);
      if (matchIndex === -1) {
        return res.status(404).json({ error: "Match not found." });
      }

      const match = data.matches[matchIndex];
      const previousWinner = match.winner;

      // --- Revert previous match outcome if it exists ---
      if (previousWinner) {
        if (previousWinner === "team1" || previousWinner === "team2") {
          const winningTeam =
            previousWinner === "team1" ? match.team1 : match.team2;
          const losingTeam =
            previousWinner === "team1" ? match.team2 : match.team1;

          // Revert winner's stats
          [winningTeam.player1, winningTeam.player2].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed -= 1;
              player.wins -= 1;
              player.points -= 2; // Assuming 2 points for a win
              player.winRate = player.matchesPlayed
                ? ((player.wins / player.matchesPlayed) * 100).toFixed(1)
                : "0.0";
            }
          });

          // Revert loser's stats
          [losingTeam.player1, losingTeam.player2].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed -= 1;
              // Losers do not have wins, so no change to 'wins'
              // No point change for losers unless you track participation points
              player.winRate = player.matchesPlayed
                ? ((player.wins / player.matchesPlayed) * 100).toFixed(1)
                : "0.0";
            }
          });
        } else if (previousWinner === "Draw") {
          // Revert draw: decrement matchesPlayed, remove any draw points
          [
            match.team1.player1,
            match.team1.player2,
            match.team2.player1,
            match.team2.player2,
          ].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed -= 1;
              player.points -= 1; // Assuming 1 point for a draw
              player.winRate = player.matchesPlayed
                ? ((player.wins / player.matchesPlayed) * 100).toFixed(1)
                : "0.0";
            }
          });
        }
      }

      // --- Update match scores & determine new winner ---
      if (team1Score !== null && team2Score !== null) {
        match.team1Score = parseInt(team1Score, 10);
        match.team2Score = parseInt(team2Score, 10);

        if (match.team1Score > match.team2Score) {
          match.winner = "team1";
        } else if (match.team2Score > match.team1Score) {
          match.winner = "team2";
        } else {
          match.winner = "Draw";
        }

        // --- Apply new match outcome ---
        if (match.winner === "team1" || match.winner === "team2") {
          const winningTeam =
            match.winner === "team1" ? match.team1 : match.team2;
          const losingTeam =
            match.winner === "team1" ? match.team2 : match.team1;

          // Update winner's stats
          [winningTeam.player1, winningTeam.player2].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed += 1;
              player.wins += 1;
              player.points += 2; // Assuming 2 points for a win
              player.winRate = (
                (player.wins / player.matchesPlayed) *
                100
              ).toFixed(1);
            }
          });

          // Update loser's stats
          [losingTeam.player1, losingTeam.player2].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed += 1;
              // Losers do not get wins
              // No points for losers unless you have partial-credit logic
              player.winRate = (
                (player.wins / player.matchesPlayed) *
                100
              ).toFixed(1);
            }
          });
        } else if (match.winner === "Draw") {
          // Everyone gets 1 point, matchesPlayed +1
          [
            match.team1.player1,
            match.team1.player2,
            match.team2.player1,
            match.team2.player2,
          ].forEach((playerName) => {
            const player = data.players.find((p) => p.name === playerName);
            if (player) {
              player.matchesPlayed += 1;
              player.points += 1; // 1 point each for a draw
              player.winRate = (
                (player.wins / player.matchesPlayed) *
                100
              ).toFixed(1);
            }
          });
        }
      } else {
        // If scores are not provided, reset to unplayed
        match.winner = null;
      }

      // Save the updated data back to the file
      writeData(data);
      res.json({ message: "Match updated successfully." });
    } catch (error) {
      console.error("Error updating match:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/**
 * POST /api/replace-player
 * Replaces a missing player with a sub name for all matches in a given week.
 * Example: { "weekNumber": 1, "missingPlayer": "Jerry", "subName": "sub1" }
 */
app.post(
  "/api/replace-player",
  [
    body("weekNumber")
      .isInt({ min: 1 })
      .withMessage("Week number must be >= 1."),
    body("missingPlayer")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Missing player name is required."),
    body("subName")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Substitute name is required."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors with 400 Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    let { weekNumber, missingPlayer, subName } = req.body;
    weekNumber = parseInt(weekNumber, 10);

    try {
      const data = readData();
      let replacements = 0;

      // For each match, if match.id starts with "week<weekNumber>-..."
      data.matches.forEach((match) => {
        const weekRegex = /^week(\d+)-match/i;
        const matchWeekMatch = match.id.match(weekRegex);
        if (!matchWeekMatch) return; // skip if ID doesn't match pattern

        const matchWeek = parseInt(matchWeekMatch[1], 10);
        if (matchWeek !== weekNumber) return; // skip if not the requested week

        // Check each player's name
        ["team1", "team2"].forEach((teamKey) => {
          if (match[teamKey].player1 === missingPlayer) {
            match[teamKey].player1 = subName;
            replacements++;
          }
          if (match[teamKey].player2 === missingPlayer) {
            match[teamKey].player2 = subName;
            replacements++;
          }
        });
      });

      writeData(data);

      if (replacements > 0) {
        res.json({
          message: `Successfully replaced '${missingPlayer}' with '${subName}' in ${replacements} spot(s) for Week ${weekNumber}.`,
        });
      } else {
        res.json({
          message: `No occurrences of '${missingPlayer}' found in Week ${weekNumber} matches. No changes made.`,
        });
      }
    } catch (error) {
      console.error("Error replacing player:", error);
      res
        .status(500)
        .json({ error: "An error occurred while replacing the player." });
    }
  }
);

/**
 * POST /api/create-matches-from-schedule
 * Creates (or updates) matches from an external schedule file (schedule.json).
 */
app.post(
  "/api/create-matches-from-schedule",
  basicAuth({
    users: adminUsers,
    challenge: true,
    unauthorizedResponse: "Unauthorized",
  }),
  (req, res) => {
    try {
      // Load schedule data
      const schedulePath = path.join(__dirname, "schedule.json");
      const scheduleData = JSON.parse(fs.readFileSync(schedulePath, "utf-8"));

      // Load existing data
      const dataPath = path.join(__dirname, "data.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      // Helper to generate unique match ID (includes court #)
      const generateMatchId = (week, matchIndex, courtNumber) =>
        `week${week}-match${matchIndex + 1}-court${courtNumber}`;

      // Helper to get date for each week
      const getDateForWeek = (weekNumber) => {
        // Define the start date for week 1 (Jan 4th, 2025)
        const startDate = new Date("2025-01-04");

        // Calculate the date for the given week
        const matchDate = new Date(startDate);
        matchDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

        // Format as YYYY-MM-DD
        const year = matchDate.getFullYear();
        const month = String(matchDate.getMonth() + 1).padStart(2, "0");
        const day = String(matchDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      // Iterate over each week
      scheduleData.forEach((week) => {
        const { week: weekNumber, matchups } = week;
        const matchDate = getDateForWeek(weekNumber);

        // For each matchup row
        matchups.forEach((matchup, index) => {
          const [timeSlot, court1, court2] = matchup;
          const courts = [court1, court2];

          courts.forEach((court, courtIndex) => {
            if (court === "FREE BLOCK") return; // skip

            // Example "Bonez/Toole vs Greg/Mandre"
            const [teamStr, opponentStr] = court.split(" vs ");
            const teamPlayers = teamStr.split("/");
            const opponentPlayers = opponentStr.split("/");

            // Ensure valid teams
            if (teamPlayers.length !== 2 || opponentPlayers.length !== 2) {
              console.warn(
                `Invalid team format in week ${weekNumber}, match ${
                  index + 1
                }, court ${courtIndex + 1}.`
              );
              return;
            }

            // Build match object
            const match = {
              id: generateMatchId(weekNumber, index, courtIndex + 1),
              team1: {
                player1: teamPlayers[0].trim(),
                player2: teamPlayers[1].trim(),
              },
              team2: {
                player1: opponentPlayers[0].trim(),
                player2: opponentPlayers[1].trim(),
              },
              team1Score: null,
              team2Score: null,
              winner: null,
              date: matchDate,
            };

            // If match doesn't exist, add it
            const existingMatch = data.matches.find((m) => m.id === match.id);
            if (!existingMatch) {
              data.matches.push(match);
              console.log(`Created match: ${match.id}`);
            } else {
              // Optionally update date if match already exists
              existingMatch.date = matchDate;
              console.log(`Updated date for existing match: ${match.id}`);
            }
          });
        });
      });

      // Save changes
      writeData(data);
      res.json({ message: "Matches created successfully from schedule." });
    } catch (error) {
      console.error("Error creating matches from schedule:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 3000; // Use dynamic port from environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
