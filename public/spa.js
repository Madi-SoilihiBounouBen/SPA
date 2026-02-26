const calendar = document.getElementById("calendar");

let currentDate = new Date();
let currentView = 'month'; // possible values: 'month', 'week', 'day'

function generateCalendar() {
    // effacer le contenu existant
    calendar.innerHTML = "";

    if (currentView === 'month') {
        generateMonthView();
    } else if (currentView === 'week') {
        generateWeekView();
    } else if (currentView === 'day') {
        generateDayView();
    }
}

function generateMonthView() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById("currentMonth").innerText =
        currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    days.forEach(day => {
        let th = document.createElement("th");
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let row = document.createElement("tr");

    // calculer le nombre de cellules vides avant le premier jour (lundi=0)
    const startIndex = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < startIndex; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        let cell = document.createElement("td");
        cell.innerText = day;

        let dayOfWeek = new Date(year, month, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add("weekend");
        }
        row.appendChild(cell);

        // chaque fois que l'on atteint dimanche, ajouter la ligne au tableau et en commencer une nouvelle
        if (dayOfWeek === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }

    table.appendChild(row);
    calendar.appendChild(table);
}

function generateWeekView() {
    // trouver le lundi de la semaine en cours
    let tmp = new Date(currentDate);
    let dow = tmp.getDay(); // 0=dim..6=sam
    let diff = (dow + 6) % 7; // jours depuis lundi
    let monday = new Date(tmp);
    monday.setDate(tmp.getDate() - diff);

    // en-tête avec la plage de dates
    let end = new Date(monday);
    end.setDate(monday.getDate() + 6);
    document.getElementById("currentMonth").innerText =
        "Semaine du " + monday.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) +
        " au " + end.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' });

    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    days.forEach(day => {
        let th = document.createElement("th");
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let row = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
        let cell = document.createElement("td");
        let d = new Date(monday);
        d.setDate(monday.getDate() + i);
        cell.innerText = d.getDate();
        if (d.getDay() === 0 || d.getDay() === 6) {
            cell.classList.add("weekend");
        }
        row.appendChild(cell);
    }
    table.appendChild(row);
    calendar.appendChild(table);
}

function generateDayView() {
    document.getElementById("currentMonth").innerText =
        "Jour : " + currentDate.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    days.forEach(day => {
        let th = document.createElement("th");
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerText = currentDate.getDate();
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        cell.classList.add("weekend");
    }
    row.appendChild(cell);
    table.appendChild(row);
    calendar.appendChild(table);
}
document.getElementById("prevMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
    } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'day') {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    generateCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() + 7);
    } else if (currentView === 'day') {
        currentDate.setDate(currentDate.getDate() + 1);
    }
    generateCalendar();
});

// boutons de changement de vue (Mois / Semaine / Jour)
document.querySelectorAll('.view-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
        currentView = btn.dataset.view;
        generateCalendar();
    });
});

// rendu initial
generateCalendar();