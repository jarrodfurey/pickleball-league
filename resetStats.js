const fs = require("fs");

const filePath = "data.json"; // Path to your data.json file

try {
  // Read the existing data
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Reset player stats
  data.players.forEach((player) => {
    player.matchesPlayed = 0;
    player.wins = 0;
    player.points = 0;
    player.winRate = "0.0";
  });

  // Save the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log("Player stats have been reset successfully!");
} catch (error) {
  console.error("Error updating data.json:", error);
}
