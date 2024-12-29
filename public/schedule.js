const weeks = [
  {
    week: 1,
    teams:
      "T1 = (Kyu, Turner), T2 = (Rory, Bonez), T3 = (Graham, Greg), T4 = (Conz, Jack), T5 = (Matt E, Jerry), T6 = (Seth, Mandre), T7 = (Toole, Cole)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Turner vs Rory/Bonez", "Graham/Greg vs Conz/Jack"],
      [
        "2:15-2:30 PM",
        "Matt E/Jerry vs Seth/Mandre",
        "Rory/Bonez vs Graham/Greg",
      ],
      [
        "2:30-2:45 PM",
        "Kyu/Turner vs Matt E/Jerry",
        "Conz/Jack vs Seth/Mandre",
      ],
      [
        "2:45-3:00 PM",
        "Toole/Cole vs Graham/Greg",
        "Rory/Bonez vs Matt E/Jerry",
      ],
      [
        "3:00-3:15 PM",
        "Kyu/Turner vs Seth/Mandre",
        "Matt E/Jerry vs Conz/Jack",
      ],
      [
        "3:15-3:30 PM",
        "Rory/Bonez vs Toole/Cole",
        "Graham/Greg vs Seth/Mandre",
      ],
      ["3:30-3:45 PM", "Toole/Cole vs Conz/Jack", "Kyu/Turner vs Graham/Greg"],
      [
        "3:45-4:00 PM",
        "Matt E/Jerry vs Seth/Mandre",
        "Kyu/Turner vs Toole/Cole",
      ],
    ],
  },
  {
    week: 2,
    teams:
      "T1 = (Kyu, Bonez), T2 = (Turner, Greg), T3 = (Rory, Jack), T4 = (Graham, Jerry), T5 = (Conz, Mandre), T6 = (Matt E, Cole), T7 = (Seth, Toole)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Kyu/Bonez vs Turner/Greg",
        "Conz/Mandre vs Matt E/Cole",
      ],
      ["2:15-2:30 PM", "Rory/Jack vs Graham/Jerry", "Turner/Greg vs Rory/Jack"],
      [
        "2:30-2:45 PM",
        "Kyu/Bonez vs Conz/Mandre",
        "Graham/Jerry vs Matt E/Cole",
      ],
      ["2:45-3:00 PM", "Kyu/Bonez vs Matt E/Cole", "Seth/Toole vs Rory/Jack"],
      [
        "3:00-3:15 PM",
        "Conz/Mandre vs Graham/Jerry",
        "Turner/Greg vs Seth/Toole",
      ],
      ["3:15-3:30 PM", "Kyu/Bonez vs Seth/Toole", "Rory/Jack vs Matt E/Cole"],
      [
        "3:30-3:45 PM",
        "Turner/Greg vs Conz/Mandre",
        "Seth/Toole vs Graham/Jerry",
      ],
      [
        "3:45-4:00 PM",
        "Kyu/Bonez vs Graham/Jerry",
        "Turner/Greg vs Matt E/Cole",
      ],
    ],
  },
  {
    week: 3,
    teams:
      "T1 = (Kyu, Greg), T2 = (Bonez, Jack), T3 = (Turner, Jerry), T4 = (Rory, Mandre), T5 = (Graham, Cole), T6 = (Conz, Toole), T7 = (Matt E, Seth)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Greg vs Bonez/Jack", "Graham/Cole vs Conz/Toole"],
      [
        "2:15-2:30 PM",
        "Turner/Jerry vs Rory/Mandre",
        "Bonez/Jack vs Turner/Jerry",
      ],
      ["2:30-2:45 PM", "Kyu/Greg vs Graham/Cole", "Rory/Mandre vs Conz/Toole"],
      ["2:45-3:00 PM", "Matt E/Seth vs Turner/Jerry", "Kyu/Greg vs Conz/Toole"],
      [
        "3:00-3:15 PM",
        "Bonez/Jack vs Matt E/Seth",
        "Graham/Cole vs Rory/Mandre",
      ],
      ["3:15-3:30 PM", "Kyu/Greg vs Matt E/Seth", "Turner/Jerry vs Conz/Toole"],
      [
        "3:30-3:45 PM",
        "Bonez/Jack vs Graham/Cole",
        "Matt E/Seth vs Rory/Mandre",
      ],
      ["3:45-4:00 PM", "Kyu/Greg vs Turner/Jerry", "Graham/Cole vs Conz/Toole"],
    ],
  },
  {
    week: 4,
    teams:
      "T1 = (Kyu, Jack), T2 = (Greg, Jerry), T3 = (Bonez, Mandre), T4 = (Turner, Cole), T5 = (Rory, Toole), T6 = (Graham, Seth), T7 = (Conz, Matt E)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Jack vs Greg/Jerry", "Bonez/Mandre vs Turner/Cole"],
      [
        "2:15-2:30 PM",
        "Rory/Toole vs Graham/Seth",
        "Greg/Jerry vs Bonez/Mandre",
      ],
      ["2:30-2:45 PM", "Kyu/Jack vs Rory/Toole", "Turner/Cole vs Graham/Seth"],
      [
        "2:45-3:00 PM",
        "Conz/Matt E vs Bonez/Mandre",
        "Kyu/Jack vs Graham/Seth",
      ],
      [
        "3:00-3:15 PM",
        "Greg/Jerry vs Conz/Matt E",
        "Rory/Toole vs Turner/Cole",
      ],
      [
        "3:15-3:30 PM",
        "Kyu/Jack vs Conz/Matt E",
        "Bonez/Mandre vs Graham/Seth",
      ],
      [
        "3:30-3:45 PM",
        "Greg/Jerry vs Rory/Toole",
        "Conz/Matt E vs Turner/Cole",
      ],
      ["3:45-4:00 PM", "Kyu/Jack vs Bonez/Mandre", "(Match 16: SKIPPED)"],
    ],
  },
  {
    week: 5,
    teams:
      "T1 = (Kyu, Jerry), T2 = (Jack, Mandre), T3 = (Greg, Cole), T4 = (Bonez, Toole), T5 = (Turner, Seth), T6 = (Rory, Matt E), T7 = (Graham, Conz)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Jerry vs Jack/Mandre", "Greg/Cole vs Bonez/Toole"],
      [
        "2:15-2:30 PM",
        "Turner/Seth vs Rory/Matt E",
        "Jack/Mandre vs Greg/Cole",
      ],
      [
        "2:30-2:45 PM",
        "Kyu/Jerry vs Turner/Seth",
        "Bonez/Toole vs Rory/Matt E",
      ],
      ["2:45-3:00 PM", "Graham/Conz vs Greg/Cole", "Kyu/Jerry vs Rory/Matt E"],
      [
        "3:00-3:15 PM",
        "Jack/Mandre vs Graham/Conz",
        "Turner/Seth vs Bonez/Toole",
      ],
      ["3:15-3:30 PM", "Kyu/Jerry vs Graham/Conz", "Greg/Cole vs Rory/Matt E"],
      [
        "3:30-3:45 PM",
        "Jack/Mandre vs Turner/Seth",
        "Graham/Conz vs Bonez/Toole",
      ],
      ["3:45-4:00 PM", "Kyu/Jerry vs Greg/Cole", "Turner/Seth vs Rory/Matt E"],
    ],
  },
  {
    week: 6,
    teams:
      "T1 = (Kyu, Mandre), T2 = (Jerry, Cole), T3 = (Jack, Toole), T4 = (Greg, Seth), T5 = (Bonez, Matt E), T6 = (Turner, Conz), T7 = (Rory, Graham)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Mandre vs Jerry/Cole", "Jack/Toole vs Greg/Seth"],
      [
        "2:15-2:30 PM",
        "Bonez/Matt E vs Turner/Conz",
        "Jerry/Cole vs Jack/Toole",
      ],
      [
        "2:30-2:45 PM",
        "Kyu/Mandre vs Bonez/Matt E",
        "Greg/Seth vs Turner/Conz",
      ],
      [
        "2:45-3:00 PM",
        "Rory/Graham vs Jack/Toole",
        "Kyu/Mandre vs Turner/Conz",
      ],
      [
        "3:00-3:15 PM",
        "Jerry/Cole vs Rory/Graham",
        "Bonez/Matt E vs Greg/Seth",
      ],
      [
        "3:15-3:30 PM",
        "Kyu/Mandre vs Rory/Graham",
        "Jack/Toole vs Turner/Conz",
      ],
      [
        "3:30-3:45 PM",
        "Jerry/Cole vs Bonez/Matt E",
        "Rory/Graham vs Greg/Seth",
      ],
      [
        "3:45-4:00 PM",
        "Kyu/Mandre vs Jack/Toole",
        "Bonez/Matt E vs Turner/Conz",
      ],
    ],
  },
  {
    week: 7,
    teams:
      "T1 = (Kyu, Cole), T2 = (Mandre, Toole), T3 = (Jerry, Seth), T4 = (Jack, Matt E), T5 = (Greg, Conz), T6 = (Bonez, Graham), T7 = (Turner, Rory)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Cole vs Mandre/Toole", "Jerry/Seth vs Jack/Matt E"],
      [
        "2:15-2:30 PM",
        "Greg/Conz vs Bonez/Graham",
        "Mandre/Toole vs Jerry/Seth",
      ],
      ["2:30-2:45 PM", "Kyu/Cole vs Greg/Conz", "Jack/Matt E vs Bonez/Graham"],
      ["2:45-3:00 PM", "Turner/Rory vs Jerry/Seth", "Kyu/Cole vs Bonez/Graham"],
      [
        "3:00-3:15 PM",
        "Mandre/Toole vs Turner/Rory",
        "Greg/Conz vs Jack/Matt E",
      ],
      ["3:15-3:30 PM", "Kyu/Cole vs Turner/Rory", "Jerry/Seth vs Bonez/Graham"],
      [
        "3:30-3:45 PM",
        "Mandre/Toole vs Greg/Conz",
        "Turner/Rory vs Jack/Matt E",
      ],
      ["3:45-4:00 PM", "Kyu/Cole vs Jerry/Seth", "Greg/Conz vs Bonez/Graham"],
    ],
  },
  {
    week: 8,
    teams:
      "T1 = (Kyu, Toole), T2 = (Cole, Seth), T3 = (Mandre, Matt E), T4 = (Jerry, Conz), T5 = (Jack, Graham), T6 = (Greg, Rory), T7 = (Bonez, Turner)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Toole vs Cole/Seth", "Mandre/Matt E vs Jerry/Conz"],
      [
        "2:15-2:30 PM",
        "Jack/Graham vs Greg/Rory",
        "Cole/Seth vs Mandre/Matt E",
      ],
      ["2:30-2:45 PM", "Kyu/Toole vs Jack/Graham", "Jerry/Conz vs Greg/Rory"],
      [
        "2:45-3:00 PM",
        "Bonez/Turner vs Mandre/Matt E",
        "Kyu/Toole vs Greg/Rory",
      ],
      [
        "3:00-3:15 PM",
        "Cole/Seth vs Bonez/Turner",
        "Jack/Graham vs Jerry/Conz",
      ],
      [
        "3:15-3:30 PM",
        "Kyu/Toole vs Bonez/Turner",
        "Mandre/Matt E vs Greg/Rory",
      ],
      [
        "3:30-3:45 PM",
        "Cole/Seth vs Jack/Graham",
        "Bonez/Turner vs Jerry/Conz",
      ],
      ["3:45-4:00 PM", "Kyu/Toole vs Mandre/Matt E", "(Match 16: SKIPPED)"],
    ],
  },
  {
    week: 9,
    teams:
      "T1 = (Kyu, Seth), T2 = (Toole, Matt E), T3 = (Cole, Conz), T4 = (Mandre, Graham), T5 = (Jerry, Rory), T6 = (Jack, Turner), T7 = (Greg, Bonez)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Kyu/Seth vs Toole/Matt E",
        "Cole/Conz vs Mandre/Graham",
      ],
      [
        "2:15-2:30 PM",
        "Jerry/Rory vs Jack/Turner",
        "Toole/Matt E vs Cole/Conz",
      ],
      [
        "2:30-2:45 PM",
        "Kyu/Seth vs Jerry/Rory",
        "Mandre/Graham vs Jack/Turner",
      ],
      ["2:45-3:00 PM", "Greg/Bonez vs Cole/Conz", "Kyu/Seth vs Jack/Turner"],
      [
        "3:00-3:15 PM",
        "Toole/Matt E vs Greg/Bonez",
        "Jerry/Rory vs Mandre/Graham",
      ],
      ["3:15-3:30 PM", "Kyu/Seth vs Greg/Bonez", "Cole/Conz vs Jack/Turner"],
      [
        "3:30-3:45 PM",
        "Toole/Matt E vs Jerry/Rory",
        "Greg/Bonez vs Mandre/Graham",
      ],
      [
        "3:45-4:00 PM",
        "Kyu/Seth vs Mandre/Graham",
        "Jerry/Rory vs Jack/Turner",
      ],
    ],
  },
  {
    week: 10,
    teams:
      "T1 = (Kyu, Matt E), T2 = (Seth, Conz), T3 = (Toole, Graham), T4 = (Cole, Rory), T5 = (Mandre, Turner), T6 = (Jerry, Bonez), T7 = (Jack, Greg)",
    matchups: [
      ["2:00–2:15 PM", "Kyu/Matt E vs Seth/Conz", "Toole/Graham vs Cole/Rory"],
      [
        "2:15-2:30 PM",
        "Mandre/Turner vs Jerry/Bonez",
        "Seth/Conz vs Toole/Graham",
      ],
      [
        "2:30-2:45 PM",
        "Kyu/Matt E vs Mandre/Turner",
        "Cole/Rory vs Jerry/Bonez",
      ],
      [
        "2:45-3:00 PM",
        "Jack/Greg vs Toole/Graham",
        "Kyu/Matt E vs Jerry/Bonez",
      ],
      ["3:00-3:15 PM", "Seth/Conz vs Jack/Greg", "Mandre/Turner vs Cole/Rory"],
      [
        "3:15-3:30 PM",
        "Kyu/Matt E vs Jack/Greg",
        "Toole/Graham vs Jerry/Bonez",
      ],
      ["3:30-3:45 PM", "Seth/Conz vs Mandre/Turner", "Jack/Greg vs Cole/Rory"],
      [
        "3:45-4:00 PM",
        "Kyu/Matt E vs Toole/Graham",
        "Mandre/Turner vs Jerry/Bonez",
      ],
    ],
  },
  {
    week: 11,
    teams:
      "T1 = (Kyu, Conz), T2 = (Matt E, Graham), T3 = (Seth, Rory), T4 = (Toole, Turner), T5 = (Cole, Bonez), T6 = (Mandre, Greg), T7 = (Jerry, Jack)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Kyu/Conz vs Matt E/Graham",
        "Seth/Rory vs Toole/Turner",
      ],
      [
        "2:15-2:30 PM",
        "Cole/Bonez vs Mandre/Greg",
        "Matt E/Graham vs Seth/Rory",
      ],
      ["2:30-2:45 PM", "Kyu/Conz vs Cole/Bonez", "Toole/Turner vs Mandre/Greg"],
      ["2:45-3:00 PM", "Jerry/Jack vs Seth/Rory", "Kyu/Conz vs Mandre/Greg"],
      [
        "3:00-3:15 PM",
        "Matt E/Graham vs Jerry/Jack",
        "Cole/Bonez vs Toole/Turner",
      ],
      ["3:15-3:30 PM", "Kyu/Conz vs Jerry/Jack", "Seth/Rory vs Mandre/Greg"],
      [
        "3:30-3:45 PM",
        "Matt E/Graham vs Cole/Bonez",
        "Jerry/Jack vs Toole/Turner",
      ],
      [
        "3:45-4:00 PM",
        "Kyu/Conz vs Seth/Rory",
        "Matt E/Graham vs Toole/Turner",
      ],
    ],
  },
  {
    week: 12,
    teams:
      "T1 = (Kyu, Graham), T2 = (Conz, Rory), T3 = (Matt E, Turner), T4 = (Seth, Bonez), T5 = (Toole, Greg), T6 = (Cole, Jack), T7 = (Mandre, Jerry)",
    matchups: [
      [
        "2:00–2:15 PM",
        "Kyu/Graham vs Conz/Rory",
        "Matt E/Turner vs Seth/Bonez",
      ],
      ["2:15-2:30 PM", "Toole/Greg vs Cole/Jack", "Conz/Rory vs Matt E/Turner"],
      ["2:30-2:45 PM", "Kyu/Graham vs Toole/Greg", "Seth/Bonez vs Cole/Jack"],
      [
        "2:45-3:00 PM",
        "Mandre/Jerry vs Matt E/Turner",
        "Kyu/Graham vs Cole/Jack",
      ],
      ["3:00-3:15 PM", "Conz/Rory vs Mandre/Jerry", "Toole/Greg vs Seth/Bonez"],
      [
        "3:15-3:30 PM",
        "Kyu/Graham vs Mandre/Jerry",
        "Matt E/Turner vs Cole/Jack",
      ],
      ["3:30-3:45 PM", "Conz/Rory vs Toole/Greg", "Mandre/Jerry vs Seth/Bonez"],
      ["3:45-4:00 PM", "Kyu/Graham vs Matt E/Turner", "(Match 16: SKIPPED)"],
    ],
  },
];

const scheduleSection = document.querySelector("#schedule");
const weeksGrid = scheduleSection.querySelector(".weeks-grid");
const weekDetailsContainer = document.getElementById("week-details");

// Generate week buttons and content
weeks.forEach((weekData, index) => {
  // Create button for the week
  const weekButton = document.createElement("button");
  weekButton.textContent = `Week ${weekData.week}`;
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

  const teams = document.createElement("h3");
  teams.textContent = "Teams";

  const teamsDetails = document.createElement("p");
  teamsDetails.textContent = weekData.teams;

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

  weekDetails.appendChild(teams);
  weekDetails.appendChild(teamsDetails);
  weekDetails.appendChild(matchups);
  weekDetails.appendChild(matchupTable);

  weekDetailsContainer.appendChild(weekDetails);
});
