// removeAllMatches.js

const fs = require("fs");
const path = require("path");

// Path to data.json
const dataPath = path.join(__dirname, "data.json");

// Read data.json
let data;
try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  data = JSON.parse(rawData);
} catch (error) {
  console.error("Error reading data.json:", error.message);
  process.exit(1);
}

// Remove all matches
const originalMatchCount = data.matches.length;
data.matches = []; // Clear all matches
const removedMatchCount = originalMatchCount;

// Write the updated data back to data.json
try {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(
    `Successfully removed ${removedMatchCount} match(es) from data.json.`
  );
} catch (error) {
  console.error("Error writing to data.json:", error.message);
  process.exit(1);
}
