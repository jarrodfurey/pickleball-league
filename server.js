// server.js
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const path = require("path");
const fs = require("fs");
const basicAuth = require("express-basic-auth");
require("dotenv").config();
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

// --- Your API Routes Below ---

// Helper Function: Read Data
const readData = () => {
  return JSON.parse(fs.readFileSync("data.json", "utf-8"));
};

// Helper Function: Write Data
const writeData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

// Endpoint to get leaderboard data
app.get("/api/leaderboard", (req, res) => {
  try {
    const data = readData();
    const players = data.players.sort((a, b) => b.points - a.points); // Sort by points
    res.json(players);
  } catch (error) {
    console.error("Error reading data.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get all matches
app.get("/api/matches", (req, res) => {
  try {
    const data = readData();
    res.json(data.matches);
  } catch (error) {
    console.error("Error reading data.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get player details
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

    // Find all matches involving this player
    const matchHistory = data.matches.filter(
      (m) =>
        m.team1.player1 === playerName ||
        m.team1.player2 === playerName ||
        m.team2.player1 === playerName ||
        m.team2.player2 === playerName
    );

    // Attach match history to player data
    const playerData = { ...player, matchHistory };

    res.json(playerData);
  } catch (error) {
    console.error("Error reading data.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new match with validation
app.post("/api/update-match", (req, res) => {
  const { matchId, team1Score, team2Score } = req.body;

  if (!matchId || team1Score === undefined || team2Score === undefined) {
    return res.status(400).json({ error: "All fields are required." });
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  } catch (error) {
    console.error("Error reading data.json:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  // Find the match
  const match = data.matches.find((m) => m.id === matchId);
  if (!match) {
    return res.status(404).json({ error: "Match not found." });
  }

  // Update match scores and determine the winner
  match.team1Score = parseInt(team1Score, 10);
  match.team2Score = parseInt(team2Score, 10);
  if (match.team1Score > match.team2Score) {
    match.winner = "team1";
  } else if (match.team2Score > match.team1Score) {
    match.winner = "team2";
  } else {
    match.winner = "Draw";
  }

  // Update player stats
  const updatePlayerStats = (playerName, isWin, isDraw) => {
    const player = data.players.find((p) => p.name === playerName);
    if (player) {
      player.matchesPlayed += 1;
      if (isWin) {
        player.wins += 1;
        player.points += 2; // 2 points for a win
      } else if (isDraw) {
        player.points += 1; // 1 point for a draw
      }
      player.winRate = ((player.wins / player.matchesPlayed) * 100).toFixed(1);
    }
  };

  if (match.winner === "team1") {
    updatePlayerStats(match.team1.player1, true, false);
    updatePlayerStats(match.team1.player2, true, false);
    updatePlayerStats(match.team2.player1, false, false);
    updatePlayerStats(match.team2.player2, false, false);
  } else if (match.winner === "team2") {
    updatePlayerStats(match.team2.player1, true, false);
    updatePlayerStats(match.team2.player2, true, false);
    updatePlayerStats(match.team1.player1, false, false);
    updatePlayerStats(match.team1.player2, false, false);
  } else {
    updatePlayerStats(match.team1.player1, false, true);
    updatePlayerStats(match.team1.player2, false, true);
    updatePlayerStats(match.team2.player1, false, true);
    updatePlayerStats(match.team2.player2, false, true);
  }

  // Save the updated data
  try {
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Match updated successfully." });
  } catch (error) {
    console.error("Error writing to data.json:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update match results with validation
app.post(
  "/api/update-match",
  [
    body("matchId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Match ID is required."),
    body("team1Score")
      .isInt({ min: 0 })
      .withMessage("Team 1 Score must be a non-negative integer."),
    body("team2Score")
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
      const match = data.matches.find((m) => m.id === matchId);
      if (!match) {
        return res.status(404).send("Match not found.");
      }

      // Update match scores
      match.team1Score = parseInt(team1Score, 10);
      match.team2Score = parseInt(team2Score, 10);

      // Determine the winner
      if (match.team1Score > match.team2Score) {
        match.winner = "team1";
      } else if (match.team2Score > match.team1Score) {
        match.winner = "team2";
      } else {
        match.winner = "Draw";
      }

      // Update player stats based on the outcome
      if (match.winner === "team1" || match.winner === "team2") {
        const winningTeam =
          match.winner === "team1" ? match.team1 : match.team2;
        const losingTeam = match.winner === "team1" ? match.team2 : match.team1;

        // Update winners
        const winners = [winningTeam.player1, winningTeam.player2];
        winners.forEach((player) => {
          const playerData = data.players.find((p) => p.name === player);
          if (playerData) {
            playerData.matchesPlayed++;
            playerData.wins++;
            playerData.points += 2;
            playerData.winRate = (
              (playerData.wins / playerData.matchesPlayed) *
              100
            ).toFixed(1);
          }
        });

        // Update losers' matchesPlayed
        const losers = [losingTeam.player1, losingTeam.player2];
        losers.forEach((player) => {
          const playerData = data.players.find((p) => p.name === player);
          if (playerData) {
            playerData.matchesPlayed++;
            playerData.winRate = (
              (playerData.wins / playerData.matchesPlayed) *
              100
            ).toFixed(1);
          }
        });
      } else if (match.winner === "Draw") {
        // In case of a draw, increment matchesPlayed for all players without adding wins or points
        const teams = [match.team1, match.team2];
        teams.forEach((team) => {
          [team.player1, team.player2].forEach((player) => {
            const playerData = data.players.find((p) => p.name === player);
            if (playerData) {
              playerData.matchesPlayed++;
              playerData.winRate = (
                (playerData.wins / playerData.matchesPlayed) *
                100
              ).toFixed(1);
            }
          });
        });
      }

      // Save the updated data back to the file
      writeData(data);
      res.send("Match results updated successfully.");
    } catch (error) {
      console.error("Error updating match:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
