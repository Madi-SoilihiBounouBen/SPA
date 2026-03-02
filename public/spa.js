// Récupère l'élément HTML avec l'id "calendar" où le calendrier sera affiché
const calendar = document.getElementById("calendar");

// Initialise la date actuelle avec la date du jour
let currentDate = new Date();
// Définit la vue actuelle du calendrier. Valeurs possibles: 'month' (mois), 'week' (semaine), 'day' (jour)
let currentView = 'month';

// Fonction principale qui génère le calendrier selon la vue sélectionnée
function generateCalendar() {

    // vide le calendrier avant de le redessiner, pour éviter les doublons.
    calendar.innerHTML = "";

    /*Ensuite, redirige vers la bonne fonction selon la vue active (currentView). La fonction est appelée à chaque fois que l'utilisateur change de vue (mois / semaine / jour)*/
    if (currentView === 'month') {//mois
        generateMonthView(); // fonction qui génère la vue mensuelle du calendrier
    } else if (currentView === 'week') { //semaine
        generateWeekView(); // fonction qui génère la vue hebdomadaire du calendrier
    } else if (currentView === 'day') { //jour
        generateDayView(); // fonction qui génère la vue journalière du calendrier
    }
}

// Fonction qui génère la vue mensuelle du calendrier
function generateMonthView() {
    // Récupère l'année et le mois de la date actuelle
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Affiche le mois et l'année au format français (ex: "février 2026") dans le titre
    document.getElementById("currentMonth").innerText =
        currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" });

    // Crée une date pour le premier jour du mois et le dernier jour du mois
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Crée un élément tableau pour afficher le calendrier
    let table = document.createElement("table");
    // Crée la première ligne du tableau pour l'en-tête (jours de la semaine)
    let headerRow = document.createElement("tr");
    // Tableau des noms des jours de la semaine en français
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    // Boucle sur chaque jour et crée une cellule d'en-tête
    days.forEach(day => {
        let th = document.createElement("th");
        th.innerText = day;
        headerRow.appendChild(th);
    });
    // Ajoute la ligne d'en-tête au tableau
    table.appendChild(headerRow);

    // Crée la première ligne du calendrier
    let row = document.createElement("tr");

    // Calcule le nombre de cellules vides avant le premier jour du mois (lundi = 0)
    const startIndex = (firstDay.getDay() + 6) % 7;
    // Ajoute des cellules vides au début si le mois ne commence pas le lundi
    for (let i = 0; i < startIndex; i++) {
        row.appendChild(document.createElement("td"));
    }

    // Boucle sur chaque jour du mois
    for (let day = 1; day <= lastDay.getDate(); day++) {
        let cell = document.createElement("td");
        cell.innerText = day;

        // Détermine le jour de la semaine (0=dimanche, 6=samedi)
        let dayOfWeek = new Date(year, month, day).getDay();
        // Si c'est un week-end, ajoute la classe CSS "weekend"
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add("weekend");
        }
        row.appendChild(cell);

        // Lorsqu'on arrive à dimanche, ajoute la ligne au tableau et commence une nouvelle
        if (dayOfWeek === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }

    // Ajoute la dernière ligne au tableau
    table.appendChild(row);
    calendar.appendChild(table);
}

// Fonction qui génère la vue hebdomadaire du calendrier
function generateWeekView() {
    // Crée une copie de la date actuelle pour la traiter
    let tmp = new Date(currentDate);
    // Récupère le jour de la semaine (0=dimanche, 6=samedi)
    let dow = tmp.getDay();
    // Calcule le nombre de jours à retrancher pour atteindre le lundi
    let diff = (dow + 6) % 7;
    // Crée une date pour le lundi de la semaine en cours
    let monday = new Date(tmp);
    monday.setDate(tmp.getDate() - diff);

    // Crée une date pour le dimanche de la semaine en cours
    let end = new Date(monday);
    end.setDate(monday.getDate() + 6);
    // Affiche la plage de dates de la semaine au format français
    document.getElementById("currentMonth").innerText =
        "Semaine du " + monday.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) +
        " au " + end.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' });

    // Crée un élément tableau pour afficher la semaine
    let table = document.createElement("table");

    // Tableau des noms des jours de la semaine
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    // Crée la ligne d'en-tête avec la colonne "Heure" + les 7 jours avec leur date
    let headerRow = document.createElement("tr");
    // Cellule d'en-tête pour la colonne heure
    let thHeure = document.createElement("th");
    thHeure.innerText = "Heure";
    thHeure.classList.add("col-heure");
    headerRow.appendChild(thHeure);
    // Boucle sur les 7 jours pour créer les en-têtes avec le nom du jour et sa date
    for (let i = 0; i < 7; i++) {
        let d = new Date(monday);
        d.setDate(monday.getDate() + i);
        let th = document.createElement("th");
        th.innerText = days[i] + " " + d.getDate();
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Boucle sur les heures de 7h à 17h pour créer une ligne par heure
    for (let h = 7; h <= 17; h++) {
        let row = document.createElement("tr");

        // Cellule affichant l'heure (ex: "07:00")
        let tdHeure = document.createElement("td");
        tdHeure.innerText = String(h).padStart(2, "0") + ":00";
        tdHeure.classList.add("col-heure");
        row.appendChild(tdHeure);

        // Boucle sur les 7 jours pour créer une cellule vide par jour
        for (let i = 0; i < 7; i++) {
            let d = new Date(monday);
            d.setDate(monday.getDate() + i);
            let cell = document.createElement("td");
            // Si c'est un week-end, ajoute la classe CSS "weekend"
            if (d.getDay() === 0 || d.getDay() === 6) {
                cell.classList.add("weekend");
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

// Fonction qui génère la vue journalière du calendrier
function generateDayView() {
    // Affiche la date du jour en format français (ex: "Jour : lundi 26 février 2026")
    document.getElementById("currentMonth").innerText =
        "Jour : " + currentDate.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Tableau des noms des jours de la semaine
    const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    // Récupère le jour de la semaine (0=dimanche, 6=samedi)
    const jsDay = currentDate.getDay();
    // Convertit le jour JavaScript en index de 0-6 où 0=lundi
    const dayIndex = (jsDay + 6) % 7;
    // Récupère le label du jour de la semaine en français
    const dayLabel = dayLabels[dayIndex];
    // Vérifie si c'est un week-end
    const isWeekend = jsDay === 0 || jsDay === 6;

    // Crée un élément tableau pour afficher le jour
    let table = document.createElement("table");
    table.classList.add("day-view-table");

    // Crée la ligne d'en-tête avec deux colonnes : Heure et le jour
    let headerRow = document.createElement("tr");
    // Cellule d'en-tête pour la colonne "Heure"
    let thHeure = document.createElement("th");
    thHeure.innerText = "Heure";
    thHeure.classList.add("col-heure");
    // Cellule d'en-tête pour la colonne du jour (ex: "Jeu 26")
    let thJour = document.createElement("th");
    thJour.innerText = dayLabel + " " + currentDate.getDate();
    headerRow.appendChild(thHeure);
    headerRow.appendChild(thJour);
    table.appendChild(headerRow);

    // Affichages des heures de 7h à 19h
    for (let h = 7; h <= 19; h++) {
        let row = document.createElement("tr");

        // Cellule affichant l'heure au format HH:00 (ex: "07:00", "17:00")
        let tdHeure = document.createElement("td"); // Cellule pour l'heure horizontale
        tdHeure.innerText = String(h).padStart(2, "0") + ":00";//convertit le nombre h en texte "string", puis le complète avec un zéro devant si nécessaire, et ajoute :00. Par exemple : 9 → "09:00", 14 → "14:00"
        tdHeure.classList.add("col-heure"); //ajoute la classe CSS col-heure pour pouvoir styliser cette cellule (largeur, couleur, etc.).

        // Cellule vide pour saisir des événements
        let tdJour = document.createElement("td");
        // Si c'est un week-end, colore la cellule différemment
        if (isWeekend) tdJour.classList.add("weekend");

        row.appendChild(tdHeure);
        row.appendChild(tdJour);
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

// Ajoute un événement au bouton "précédent" pour naviguer en arrière
document.getElementById("prevMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        // va au mois précédent
        currentDate.setMonth(currentDate.getMonth() - 1);
    } else if (currentView === 'week') {
        // Affiche une semaine
        currentDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'day') {
        // Affiche 1 jour
        currentDate.setDate(currentDate.getDate() - 1);
    }
    generateCalendar();
});

// Ajoute un événement au bouton "suivant" pour naviguer en avant
document.getElementById("nextMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        // En vue mensuelle, va au mois suivant
        currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (currentView === 'week') {
        // En vue hebdomadaire, avance de 7 jours (une semaine)
        currentDate.setDate(currentDate.getDate() + 7);
    } else if (currentView === 'day') {
        // En vue journalière, avance d'1 jour
        currentDate.setDate(currentDate.getDate() + 1);
    }
    generateCalendar();
});

// Sélectionne tous les boutons de changement de vue et ajoute des événements au clic
document.querySelectorAll('.view-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Change la vue selon l'attribut data-view du bouton cliqué
        currentView = btn.dataset.view;
        generateCalendar();
    });
});

// Affiche le calendrier au chargement initial de la page
generateCalendar();