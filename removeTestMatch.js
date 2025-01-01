// removeTestMatch.js

const fs = require("fs");
const path = require("path");

// Path to data.json
const dataPath = path.join(__dirname, "data.json");

// Read data.json
let data;
try {
  data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} catch (error) {
  console.error("Error reading data.json:", error.message);
  process.exit(1);
}

// Filter out the test match with id "match1"
const originalMatchCount = data.matches.length;
data.matches = data.matches.filter((match) => match.id !== "match1");
const removedMatchCount = originalMatchCount - data.matches.length;

if (removedMatchCount > 0) {
  // Write the updated data back to data.json
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(
      `Successfully removed ${removedMatchCount} test match(es) from data.json.`
    );
  } catch (error) {
    console.error("Error writing to data.json:", error.message);
    process.exit(1);
  }
} else {
  console.log("No test matches found to remove.");
}
