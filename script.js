const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const branchData = {
  ECE: [
    { sub: "SV", fac: "Dr. Rao" },
    { sub: "EMD", fac: "Dr. Kumar" },
    { sub: "DIP", fac: "Dr. Meena" },
    { sub: "ML", fac: "Dr. Suresh" },
    { sub: "IC", fac: "Dr. Anjali" },
    { sub: "CDC", fac: "Mr. Naveen" }
  ],
  CSE: [
    { sub: "DSA", fac: "Dr. Prasad" },
    { sub: "OS", fac: "Dr. Lakshmi" },
    { sub: "DBMS", fac: "Dr. Ravi" },
    { sub: "CN", fac: "Dr. Kiran" },
    { sub: "AI", fac: "Dr. Sunitha" }
  ],
  EEE: [
    { sub: "PS", fac: "Dr. Reddy" },
    { sub: "EM", fac: "Dr. Rao" },
    { sub: "CS", fac: "Dr. Kumar" },
    { sub: "MEAS", fac: "Dr. Teja" }
  ],
  MECH: [
    { sub: "TOM", fac: "Dr. Vinod" },
    { sub: "FM", fac: "Dr. Arjun" },
    { sub: "HT", fac: "Dr. Mahesh" },
    { sub: "MD", fac: "Dr. Siva" }
  ],
  CIVIL: [
    { sub: "RCC", fac: "Dr. Ramesh" },
    { sub: "GEO", fac: "Dr. Naresh" },
    { sub: "ENV", fac: "Dr. Kavitha" },
    { sub: "SURVEY", fac: "Dr. Bhanu" }
  ]
};

const subjectFullForms = {
  SV: "System Verilog",
  EMD: "Embedded Systems",
  DIP: "Digital Image Processing",
  ML: "Machine Learning",
  IC: "Indian Constitution",
  CDC: "Career Development Course",
  DSA: "Data Structures and Algorithms",
  OS: "Operating Systems",
  DBMS: "Database Management Systems",
  CN: "Computer Networks",
  AI: "Artificial Intelligence",
  PS: "Power Systems",
  EM: "Electrical Machines",
  CS: "Control Systems",
  MEAS: "Measurements",
  TOM: "Theory of Machines",
  FM: "Fluid Mechanics",
  HT: "Heat Transfer",
  MD: "Machine Design",
  RCC: "Reinforced Cement Concrete",
  GEO: "Geotechnical Engineering",
  ENV: "Environmental Engineering",
  SURVEY: "Surveying",
  LAB: "Laboratory"
};

const labNames = {
  ECE: "PROGRAMMING LAB",
  CSE: "CODING LAB",
  EEE: "ELECTRICAL LAB",
  MECH: "MECH LAB",
  CIVIL: "CIVIL LAB"
};

function generateTimetable() {
  const branch = document.getElementById("branch").value;
  const periodCount = parseInt(document.getElementById("periods").value);

  if (!periodCount || periodCount < 4 || periodCount > 8) {
    alert("Enter periods between 4 and 8");
    return;
  }

  const data = branchData[branch];
  const lab = labNames[branch];

  const header = document.getElementById("headerRow");
  const tbody = document.querySelector("#timetable tbody");

  header.innerHTML = "<th>DAY</th>";
  for (let i = 1; i <= periodCount; i++) {
    header.innerHTML += `<th>P${i}</th>`;
  }

  tbody.innerHTML = "";

  days.forEach(day => {
    let row = `<tr><td>${day}</td>`;
    let labUsed = false;

    for (let p = 0; p < periodCount; p++) {
      if (!labUsed && p <= periodCount - 2 && Math.random() < 0.3) {
        row += `<td colspan="2" class="lab">${lab}</td>`;
        labUsed = true;
        p++;
        continue;
      }
      let item = data[Math.floor(Math.random() * data.length)];
      row += `<td>${item.sub}</td>`;
    }

    row += "</tr>";
    tbody.innerHTML += row;
  });

  loadBottomTables(branch);
}

function loadBottomTables(branch) {
  const facultyTable = document.getElementById("facultyTable");
  const subjectTable = document.getElementById("subjectTable");

  facultyTable.innerHTML = "<tr><th>SUBJECT</th><th>FACULTY NAME</th></tr>";
  subjectTable.innerHTML = "<tr><th>SUBJECT</th><th>FULL FORM</th></tr>";

  branchData[branch].forEach(item => {
    facultyTable.innerHTML += `<tr><td>${item.sub}</td><td>${item.fac}</td></tr>`;
    subjectTable.innerHTML += `<tr><td>${item.sub}</td><td>${subjectFullForms[item.sub]}</td></tr>`;
  });

  facultyTable.innerHTML += "<tr><td>LAB</td><td>Lab Incharge</td></tr>";
  subjectTable.innerHTML += `<tr><td>LAB</td><td>${subjectFullForms["LAB"]}</td></tr>`;
}

function enableAdmin() {
  const pass = prompt("Enter Admin Password:");
  if (pass !== "admin123") {
    alert("Wrong Password");
    return;
  }

  document.querySelectorAll("#timetable td").forEach(td => {
    if (!td.classList.contains("lab") && td.innerText !== "") {
      td.contentEditable = true;
      td.classList.add("editable");
    }
  });
}

function downloadPDF() {
  html2pdf().from(document.body).save("College_Timetable.pdf");
}
