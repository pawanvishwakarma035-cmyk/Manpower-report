// ==========================================
// DEPARTMENTS
// ==========================================

const departments = [
	"Electrician",
	"Builder",
	"Plumber",
	"Carpenter",
	"Painter",
	"Welder",
	"Helper"
];

// ==========================================
// STAFF COUNTS
// ==========================================

let staffCounts = [];

departments.forEach(() => {
	staffCounts.push(0);
});

// ==========================================
// CREATE DEPARTMENT LIST
// ==========================================

function createDepartments() {
	const container = document.getElementById("departments");

	container.innerHTML = "";

	departments.forEach((department, index) => {
		const row = document.createElement("div");

		row.className = "department-row";
		row.innerHTML = `
			<div class="department-name">
				${department}
			</div>

			<div class="counter">
				<button onclick="changeStaff(${index}, -1)">
					−
				</button>

				<div class="counter-number" id="count-${index}">
					${staffCounts[index]}
				</div>

				<button onclick="changeStaff(${index}, 1)">
					+
				</button>
			</div>
		`;

		container.appendChild(row);
	});

	updateTotal();
}

// ==========================================
// PLUS / MINUS
// ==========================================

function changeStaff(index, amount) {
	staffCounts[index] += amount;

	if (staffCounts[index] < 0) {
		staffCounts[index] = 0;
	}

	document.getElementById(`count-${index}`).textContent = staffCounts[index];
	updateTotal();
}

// ==========================================
// TOTAL STAFF
// ==========================================

function updateTotal() {
	const total = staffCounts.reduce((sum, count) => sum + count, 0);
	document.getElementById("totalStaff").textContent = total;
}

// ==========================================
// DATE & TIME
// ==========================================

function updateDateTime() {
	const now = new Date();
	const date = now.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
	const time = now.toLocaleTimeString("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});

	document.getElementById("currentDate").textContent = date;
	document.getElementById("currentTime").textContent = time;
}

setInterval(updateDateTime, 1000);

// ==========================================
// GENERATE REPORT
// ==========================================

function generateReport() {
	const companyName = document.getElementById("companyName").value.trim();
	const foremanName = document.getElementById("foremanName").value.trim();

	if (companyName === "") {
		alert("Please enter company name.");
		return;
	}

	if (foremanName === "") {
		alert("Please enter foreman name.");
		return;
	}

	const now = new Date();
	const date = now.toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
	const time = now.toLocaleTimeString("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});

	document.getElementById("reportCompany").textContent = companyName.toUpperCase();
	document.getElementById("reportForeman").textContent = foremanName;
	document.getElementById("reportDate").textContent = date;
	document.getElementById("reportTime").textContent = time;

	const reportContainer = document.getElementById("reportDepartments");
	reportContainer.innerHTML = "";

	departments.forEach((department, index) => {
		const row = document.createElement("div");

		row.className = "table-row";
		row.innerHTML = `
			<span>${department}</span>
			<span>${staffCounts[index]}</span>
		`;

		reportContainer.appendChild(row);
	});

	document.getElementById("reportTotal").textContent =
		staffCounts.reduce((sum, number) => sum + number, 0);

	document.getElementById("mainScreen").classList.add("hidden");
	document.getElementById("reportScreen").classList.remove("hidden");
	window.scrollTo(0, 0);
}

// ==========================================
// EDIT REPORT
// ==========================================

function editReport() {
	document.getElementById("reportScreen").classList.add("hidden");
	document.getElementById("mainScreen").classList.remove("hidden");
	window.scrollTo(0, 0);
}

// ==========================================
// WHATSAPP SHARE
// ==========================================

function shareWhatsApp() {
	const company = document.getElementById("reportCompany").textContent;
	const foreman = document.getElementById("reportForeman").textContent;
	const date = document.getElementById("reportDate").textContent;
	const time = document.getElementById("reportTime").textContent;
	const total = document.getElementById("reportTotal").textContent;

	let message = `*${company}*\n`;
	message += `*DAILY MANPOWER REPORT*\n\n`;
	message += `Foreman: ${foreman}\n`;
	message += `Date: ${date}\n`;
	message += `Time: ${time}\n\n`;
	message += `*STAFF PRESENT*\n`;

	departments.forEach((department, index) => {
		message += `${department}: ${staffCounts[index]}\n`;
	});

	message += `\n*TOTAL STAFF: ${total}*`;

	const whatsappURL = "https://wa.me/?text=" + encodeURIComponent(message);
	window.open(whatsappURL, "_blank");
}

// ==========================================
// START
// ==========================================

createDepartments();
updateDateTime();
