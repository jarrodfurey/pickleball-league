// schedule.js

// Array of week data
const weeks = [
  {
    week: 1,
    teams:
      "T1 = (Jerry, Turner), T2 = (Bonez, Toole), T3 = (Cole, Seth), T4 = (Conz, Rory), T5 = (Graham, Matt E), T6 = (Greg, Mandre), T7 = (Jack, Kyu)",
    matchups: [
      ["2:00–2:15 PM", "Jerry/Turner vs Bonez/Toole", "Cole/Seth vs Conz/Rory"],
      [
        "2:15–2:30 PM",
        "Graham/Matt E vs Greg/Mandre",
        "Jerry/Turner vs Cole/Seth",
      ],
      ["2:30–2:45 PM", "Bonez/Toole vs Conz/Rory", "Graham/Matt E vs Jack/Kyu"],
      ["2:45–3:00 PM", "Greg/Mandre vs Jack/Kyu", "Jerry/Turner vs Conz/Rory"],
      [
        "3:00–3:15 PM",
        "Bonez/Toole vs Greg/Mandre",
        "Cole/Seth vs Graham/Matt E",
      ],
      [
        "3:15–3:30 PM",
        "Jerry/Turner vs Jack/Kyu",
        "Conz/Rory vs Graham/Matt E",
      ],
      ["3:30–3:45 PM", "Bonez/Toole vs Jack/Kyu", "Cole/Seth vs Greg/Mandre"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 2,
    teams:
      "T1 = (Jerry, Toole), T2 = (Turner, Seth), T3 = (Bonez, Rory), T4 = (Cole, Matt E), T5 = (Conz, Mandre), T6 = (Graham, Kyu), T7 = (Greg, Jack)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Toole vs Turner/Seth",
        "Bonez/Rory vs Cole/Matt E",
      ],
      [
        "2:15–2:30 PM",
        "Conz/Mandre vs Graham/Kyu",
        "Jerry/Toole vs Bonez/Rory",
      ],
      [
        "2:30–2:45 PM",
        "Turner/Seth vs Cole/Matt E",
        "Conz/Mandre vs Greg/Jack",
      ],
      ["2:45–3:00 PM", "Graham/Kyu vs Greg/Jack", "Jerry/Toole vs Cole/Matt E"],
      [
        "3:00–3:15 PM",
        "Turner/Seth vs Graham/Kyu",
        "Bonez/Rory vs Conz/Mandre",
      ],
      [
        "3:15–3:30 PM",
        "Jerry/Toole vs Greg/Jack",
        "Cole/Matt E vs Conz/Mandre",
      ],
      ["3:30–3:45 PM", "Turner/Seth vs Greg/Jack", "Bonez/Rory vs Graham/Kyu"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 3,
    teams:
      "T1 = (Jerry, Seth), T2 = (Toole, Rory), T3 = (Turner, Matt E), T4 = (Bonez, Mandre), T5 = (Cole, Kyu), T6 = (Conz, Jack), T7 = (Graham, Greg)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Seth vs Toole/Rory",
        "Turner/Matt E vs Bonez/Mandre",
      ],
      ["2:15–2:30 PM", "Cole/Kyu vs Conz/Jack", "Jerry/Seth vs Turner/Matt E"],
      ["2:30–2:45 PM", "Toole/Rory vs Bonez/Mandre", "Cole/Kyu vs Graham/Greg"],
      [
        "2:45–3:00 PM",
        "Conz/Jack vs Graham/Greg",
        "Jerry/Seth vs Bonez/Mandre",
      ],
      ["3:00–3:15 PM", "Toole/Rory vs Conz/Jack", "Turner/Matt E vs Cole/Kyu"],
      ["3:15–3:30 PM", "Jerry/Seth vs Graham/Greg", "Bonez/Mandre vs Cole/Kyu"],
      [
        "3:30–3:45 PM",
        "Toole/Rory vs Graham/Greg",
        "Turner/Matt E vs Conz/Jack",
      ],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 4,
    teams:
      "T1 = (Jerry, Rory), T2 = (Seth, Matt E), T3 = (Toole, Mandre), T4 = (Turner, Kyu), T5 = (Bonez, Jack), T6 = (Cole, Greg), T7 = (Conz, Graham)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Rory vs Seth/Matt E",
        "Toole/Mandre vs Turner/Kyu",
      ],
      ["2:15–2:30 PM", "Bonez/Jack vs Cole/Greg", "Jerry/Rory vs Toole/Mandre"],
      [
        "2:30–2:45 PM",
        "Seth/Matt E vs Turner/Kyu",
        "Bonez/Jack vs Conz/Graham",
      ],
      ["2:45–3:00 PM", "Cole/Greg vs Conz/Graham", "Jerry/Rory vs Turner/Kyu"],
      [
        "3:00–3:15 PM",
        "Seth/Matt E vs Cole/Greg",
        "Toole/Mandre vs Bonez/Jack",
      ],
      ["3:15–3:30 PM", "Jerry/Rory vs Conz/Graham", "Turner/Kyu vs Bonez/Jack"],
      [
        "3:30–3:45 PM",
        "Seth/Matt E vs Conz/Graham",
        "Toole/Mandre vs Cole/Greg",
      ],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 5,
    teams:
      "T1 = (Jerry, Matt E), T2 = (Rory, Mandre), T3 = (Seth, Kyu), T4 = (Toole, Jack), T5 = (Turner, Greg), T6 = (Bonez, Graham), T7 = (Cole, Conz)",
    matchups: [
      ["2:00–2:15 PM", "Jerry/Matt E vs Rory/Mandre", "Seth/Kyu vs Toole/Jack"],
      [
        "2:15–2:30 PM",
        "Turner/Greg vs Bonez/Graham",
        "Jerry/Matt E vs Seth/Kyu",
      ],
      ["2:30–2:45 PM", "Rory/Mandre vs Toole/Jack", "Turner/Greg vs Cole/Conz"],
      [
        "2:45–3:00 PM",
        "Bonez/Graham vs Cole/Conz",
        "Jerry/Matt E vs Toole/Jack",
      ],
      [
        "3:00–3:15 PM",
        "Rory/Mandre vs Bonez/Graham",
        "Seth/Kyu vs Turner/Greg",
      ],
      [
        "3:15–3:30 PM",
        "Jerry/Matt E vs Cole/Conz",
        "Toole/Jack vs Bonez/Graham",
      ],
      ["3:30–3:45 PM", "Rory/Mandre vs Turner/Greg", "Seth/Kyu vs Cole/Conz"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 6,
    teams:
      "T1 = (Jerry, Mandre), T2 = (Matt E, Kyu), T3 = (Rory, Jack), T4 = (Seth, Greg), T5 = (Toole, Graham), T6 = (Turner, Conz), T7 = (Bonez, Cole)",
    matchups: [
      ["2:00–2:15 PM", "Jerry/Mandre vs Matt E/Kyu", "Rory/Jack vs Seth/Greg"],
      [
        "2:15–2:30 PM",
        "Toole/Graham vs Turner/Conz",
        "Matt E/Kyu vs Rory/Jack",
      ],
      [
        "2:30–2:45 PM",
        "Jerry/Mandre vs Toole/Graham",
        "Seth/Greg vs Turner/Conz",
      ],
      [
        "2:45–3:00 PM",
        "Bonez/Cole vs Rory/Jack",
        "Jerry/Mandre vs Turner/Conz",
      ],
      ["3:00–3:15 PM", "Matt E/Kyu vs Bonez/Cole", "Toole/Graham vs Seth/Greg"],
      [
        "3:15–3:30 PM",
        "Jerry/Mandre vs Bonez/Cole",
        "Rory/Jack vs Turner/Conz",
      ],
      ["3:30–3:45 PM", "Matt E/Kyu vs Seth/Greg", "Bonez/Cole vs Toole/Graham"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 7,
    teams:
      "T1 = (Jerry, Kyu), T2 = (Mandre, Jack), T3 = (Matt E, Greg), T4 = (Rory, Graham), T5 = (Seth, Conz), T6 = (Toole, Cole), T7 = (Turner, Bonez)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Kyu vs Mandre/Jack",
        "Matt E/Greg vs Rory/Graham",
      ],
      ["2:15–2:30 PM", "Seth/Conz vs Toole/Cole", "Jerry/Kyu vs Matt E/Greg"],
      [
        "2:30–2:45 PM",
        "Mandre/Jack vs Rory/Graham",
        "Seth/Conz vs Turner/Bonez",
      ],
      [
        "2:45–3:00 PM",
        "Toole/Cole vs Turner/Bonez",
        "Jerry/Kyu vs Rory/Graham",
      ],
      ["3:00–3:15 PM", "Mandre/Jack vs Toole/Cole", "Matt E/Greg vs Seth/Conz"],
      ["3:15–3:30 PM", "Jerry/Kyu vs Turner/Bonez", "Rory/Graham vs Seth/Conz"],
      ["3:30–3:45 PM", "Mandre/Jack vs Seth/Conz", "Matt E/Greg vs Toole/Cole"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 8,
    teams:
      "T1 = (Jerry, Jack), T2 = (Kyu, Greg), T3 = (Mandre, Graham), T4 = (Matt E, Conz), T5 = (Rory, Cole), T6 = (Seth, Bonez), T7 = (Toole, Turner)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Jack vs Kyu/Greg",
        "Mandre/Graham vs Matt E/Conz",
      ],
      [
        "2:15–2:30 PM",
        "Rory/Cole vs Seth/Bonez",
        "Jerry/Jack vs Mandre/Graham",
      ],
      ["2:30–2:45 PM", "Kyu/Greg vs Matt E/Conz", "Rory/Cole vs Toole/Turner"],
      [
        "2:45–3:00 PM",
        "Seth/Bonez vs Toole/Turner",
        "Jerry/Jack vs Matt E/Conz",
      ],
      ["3:00–3:15 PM", "Kyu/Greg vs Seth/Bonez", "Mandre/Graham vs Rory/Cole"],
      [
        "3:15–3:30 PM",
        "Jerry/Jack vs Toole/Turner",
        "Matt E/Conz vs Rory/Cole",
      ],
      [
        "3:30–3:45 PM",
        "Kyu/Greg vs Toole/Turner",
        "Mandre/Graham vs Seth/Bonez",
      ],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 9,
    teams:
      "T1 = (Jerry, Greg), T2 = (Jack, Graham), T3 = (Kyu, Conz), T4 = (Mandre, Cole), T5 = (Matt E, Bonez), T6 = (Rory, Turner), T7 = (Seth, Toole)",
    matchups: [
      ["2:00–2:15 PM", "Jerry/Greg vs Jack/Graham", "Kyu/Conz vs Mandre/Cole"],
      ["2:15–2:30 PM", "Matt E/Bonez vs Rory/Turner", "Jerry/Greg vs Kyu/Conz"],
      [
        "2:30–2:45 PM",
        "Jack/Graham vs Mandre/Cole",
        "Matt E/Bonez vs Seth/Toole",
      ],
      [
        "2:45–3:00 PM",
        "Rory/Turner vs Seth/Toole",
        "Jerry/Greg vs Mandre/Cole",
      ],
      [
        "3:00–3:15 PM",
        "Jack/Graham vs Rory/Turner",
        "Kyu/Conz vs Matt E/Bonez",
      ],
      [
        "3:15–3:30 PM",
        "Jerry/Greg vs Matt E/Bonez",
        "Mandre/Cole vs Seth/Toole",
      ],
      ["3:30–3:45 PM", "Jack/Graham vs Seth/Toole", "Kyu/Conz vs Rory/Turner"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 10,
    teams:
      "T1 = (Jerry, Graham), T2 = (Greg, Conz), T3 = (Jack, Cole), T4 = (Kyu, Bonez), T5 = (Mandre, Turner), T6 = (Matt E, Toole), T7 = (Rory, Seth)",
    matchups: [
      ["2:00–2:15 PM", "Jerry/Graham vs Greg/Conz", "Jack/Cole vs Kyu/Bonez"],
      [
        "2:15–2:30 PM",
        "Mandre/Turner vs Matt E/Toole",
        "Jerry/Graham vs Jack/Cole",
      ],
      ["2:30–2:45 PM", "Greg/Conz vs Kyu/Bonez", "Mandre/Turner vs Rory/Seth"],
      [
        "2:45–3:00 PM",
        "Matt E/Toole vs Rory/Seth",
        "Jerry/Graham vs Kyu/Bonez",
      ],
      [
        "3:00–3:15 PM",
        "Greg/Conz vs Matt E/Toole",
        "Jack/Cole vs Mandre/Turner",
      ],
      [
        "3:15–3:30 PM",
        "Jerry/Graham vs Rory/Seth",
        "Kyu/Bonez vs Mandre/Turner",
      ],
      ["3:30–3:45 PM", "Greg/Conz vs Rory/Seth", "Jack/Cole vs Matt E/Toole"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 11,
    teams:
      "T1 = (Jerry, Conz), T2 = (Graham, Cole), T3 = (Greg, Bonez), T4 = (Jack, Turner), T5 = (Kyu, Toole), T6 = (Mandre, Seth), T7 = (Matt E, Rory)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Conz vs Graham/Cole",
        "Greg/Bonez vs Jack/Turner",
      ],
      ["2:15–2:30 PM", "Kyu/Toole vs Mandre/Seth", "Jerry/Conz vs Greg/Bonez"],
      [
        "2:30–2:45 PM",
        "Graham/Cole vs Jack/Turner",
        "Kyu/Toole vs Matt E/Rory",
      ],
      [
        "2:45–3:00 PM",
        "Mandre/Seth vs Matt E/Rory",
        "Jerry/Conz vs Jack/Turner",
      ],
      ["3:00–3:15 PM", "Graham/Cole vs Mandre/Seth", "Greg/Bonez vs Kyu/Toole"],
      ["3:15–3:30 PM", "Jerry/Conz vs Matt E/Rory", "Jack/Turner vs Kyu/Toole"],
      ["3:30–3:45 PM", "Graham/Cole vs Kyu/Toole", "Greg/Bonez vs Mandre/Seth"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
  {
    week: 12,
    teams:
      "T1 = (Jerry, Cole), T2 = (Conz, Bonez), T3 = (Graham, Turner), T4 = (Greg, Toole), T5 = (Jack, Seth), T6 = (Kyu, Rory), T7 = (Mandre, Matt E)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Jerry/Cole vs Conz/Bonez",
        "Graham/Turner vs Greg/Toole",
      ],
      ["2:15–2:30 PM", "Jack/Seth vs Kyu/Rory", "Jerry/Cole vs Graham/Turner"],
      [
        "2:30–2:45 PM",
        "Conz/Bonez vs Greg/Toole",
        "Jack/Seth vs Mandre/Matt E",
      ],
      ["2:45–3:00 PM", "Kyu/Rory vs Mandre/Matt E", "Jerry/Cole vs Greg/Toole"],
      ["3:00–3:15 PM", "Conz/Bonez vs Kyu/Rory", "Graham/Turner vs Jack/Seth"],
      [
        "3:15–3:30 PM",
        "Jerry/Cole vs Mandre/Matt E",
        "Graham/Turner vs Jack/Seth",
      ],
      ["3:30–3:45 PM", "Conz/Bonez vs Jack/Seth", "Kyu/Rory vs Greg/Toole"],
      ["3:45–4:00 PM", "FREE BLOCK", "FREE BLOCK"],
    ],
  },
];

const scheduleSection = document.querySelector("#schedule");
const weeksGrid = scheduleSection.querySelector(".weeks-grid");
const weekDetailsContainer = document.getElementById("week-details");

// Function to format dates with suffixes (e.g., "Jan. 4th")
function getFormattedDate(date) {
  const options = { month: "short" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);
  const day = date.getDate();
  let suffix = "th";

  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${month}. ${day}${suffix}`;
}

// Define the starting date (January 4th, 2025)
const startDate = new Date(2025, 0, 4); // Months are zero-indexed (0 = January)

// Array to store week date ranges
const weekDateRanges = [];

// Generate week buttons and content
weeks.forEach((weekData, index) => {
  // Calculate the date for the current week
  const weekDate = new Date(
    startDate.getTime() + index * 7 * 24 * 60 * 60 * 1000
  );
  const formattedDate = getFormattedDate(weekDate);

  // Define week start and end dates
  let weekStartDate, weekEndDate;

  if (index === 0) {
    // Week 1: Only the startDate (January 4th, 2025)
    weekStartDate = new Date(weekDate);
    weekEndDate = new Date(weekDate);
  } else {
    // Subsequent Weeks: Start from the day after the previous week's end date
    weekStartDate = new Date(weekDate.getTime() + 1 * 24 * 60 * 60 * 1000); // Add 1 day
    weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days
  }

  // Store the date range for current week
  weekDateRanges.push({
    week: weekData.week,
    start: weekStartDate,
    end: weekEndDate,
  });

  // Create button for the week with formatted date
  const weekButton = document.createElement("button");
  weekButton.textContent = formattedDate; // Display date (e.g., "Jan. 4th")
  // Optional: To include week number, use the following line instead:
  // weekButton.textContent = `Week ${weekData.week} - ${formattedDate}`;
  weekButton.classList.add("week-button");
  weekButton.setAttribute("data-week", index);

  // Attach click event to toggle week details
  weekButton.addEventListener("click", (event) => {
    // Remove active class from all buttons
    document.querySelectorAll(".week-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    event.currentTarget.classList.add("active");

    // Hide the current active week details
    const currentDetails = document.querySelector(".week-details.active");
    if (currentDetails) {
      currentDetails.classList.remove("active");
      currentDetails.style.display = "none";
    }

    // Show the selected week's details
    const targetDetails = document.querySelector(`#week-${index}`);
    if (targetDetails && targetDetails !== currentDetails) {
      targetDetails.classList.add("active");
      targetDetails.style.display = "block";
    }
  });

  weeksGrid.appendChild(weekButton);

  // Create week details container
  const weekDetails = document.createElement("div");
  weekDetails.id = `week-${index}`;
  weekDetails.classList.add("week-details");
  weekDetails.style.display = "none";

  const matchups = document.createElement("h3");
  matchups.textContent = "Matchups";

  const matchupTable = document.createElement("table");
  const tableHead = document.createElement("thead");
  tableHead.innerHTML = `<tr><th>Time Slot</th><th>Court 1</th><th>Court 2</th></tr>`;
  const tableBody = document.createElement("tbody");

  weekData.matchups.forEach(([slot, court1, court2]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${slot}</td><td>${court1}</td><td>${court2}</td>`;
    tableBody.appendChild(row);
  });

  matchupTable.appendChild(tableHead);
  matchupTable.appendChild(tableBody);

  weekDetails.appendChild(matchups);
  weekDetails.appendChild(matchupTable);

  weekDetailsContainer.appendChild(weekDetails);
});

// Function to determine the current week based on today's date
function determineCurrentWeek() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to midnight for accurate comparison

  for (let i = 0; i < weekDateRanges.length; i++) {
    const week = weekDateRanges[i];
    if (today <= week.end) {
      return i;
    }
  }

  // If today is after all weeks, return the last week index
  return weekDateRanges.length - 1;
}

// Automatically select the current week on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentWeekIndex = determineCurrentWeek();

  // Find the corresponding week button
  const currentWeekButton = weeksGrid.querySelector(
    `.week-button[data-week="${currentWeekIndex}"]`
  );
  if (currentWeekButton) {
    currentWeekButton.click();
  }
});
