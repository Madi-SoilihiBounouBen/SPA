// Récupère l'élément HTML avec l'id "calendar" où le calendrier sera affiché
const calendar = document.getElementById("calendar");

// Initialise la date actuelle avec la date sélectionnée / affichée
let currentDate = new Date();
// On conserve aussi la date « naturelle » d'aujourd'hui qui ne change jamais
const today = new Date();
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
    const year = currentDate.getFullYear(); // Récupère l'année de la date actuelle en utilisant la méthode getFullYear() de l'objet Date. Par exemple, si la date actuelle est le 26 février 2026, year vaudra 2026.
    const month = currentDate.getMonth(); // Récupère le mois de la date actuelle en utilisant la méthode getMonth() de l'objet Date. Les mois sont indexés de 0 à 11 (0 = janvier, 1 = février, ..., 11 = décembre). Par exemple, si la date actuelle est le 26 février 2026, month vaudra 1 (car février est le deuxième mois de l'année et en informatique les mois commencent par 0).

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

    // Boucle sur chaque jour et crée une cellule d'en-tête pour chaque jour de la semaine.
    days.forEach(day => {// Pour chaque jour de la semaine, une fonction fléchée est exécutée avec le nom du jour en paramètre (ex: "Lun", "Mar", etc.)

        let th = document.createElement("th");// Crée une cellule d'en-tête (th : cellule d'en-tête) pour le jour de la semaine. Cette cellule sera utilisée pour afficher le nom du jour (ex: "Lun" pour lundi) dans la première ligne du tableau. en utilisant la méthode createElement du DOM (Document Object Model : permet d'interagir avec tout document de langage de balisage basé sur HTML) pour créer un élément HTML de type "th" (table header).

        th.innerText = day; // Définit le texte de la cellule d'en-tête avec le nom du jour (ex: "Lun", "Mar", etc.) en utilisant la propriété innerText de l'élément th.

        headerRow.appendChild(th); // Ajoute la cellule d'en-tête (th) à la ligne d'en-tête (headerRow) en utilisant la méthode appendChild du DOM. Cela construit la première ligne du tableau qui affichera les noms des jours de la semaine.
    });

    // Ajoute la ligne d'en-tête au tableau
    table.appendChild(headerRow);

    // Crée la première ligne du calendrier
    let row = document.createElement("tr");

    // Calcule le nombre de cellules vides avant le premier jour du mois (lundi = 0)
    const startIndex = (firstDay.getDay() + 6) % 7; // % 7 est utilisé pour s'assurer que le résultat reste dans la plage de 0 à 6, ce qui correspond aux jours de la semaine. Par exemple, si firstDay.getDay() retourne 0 (dimanche), startIndex vaudra 6, ce qui signifie que le mois commence un dimanche et qu'il y aura 6 cellules vides avant d'afficher le premier jour du mois (lundi, mardi, mercredi, jeudi, vendredi, samedi). Si firstDay.getDay() retourne 1 (lundi), startIndex vaudra 0, ce qui signifie que le mois commence un lundi et qu'il n'y aura aucune cellule vide avant d'afficher le premier jour du mois.

    // Ajoute des cellules vides au début si le mois ne commence pas le lundi
    for (let i = 0; i < startIndex; i++) { // Boucle pour ajouter des cellules vides avant le premier jour du mois. i++ signifie que la variable i est incrémentée de 1 à chaque itération de la boucle, ce qui permet de répéter l'ajout de cellules vides autant de fois que nécessaire en fonction de la valeur de startIndex. Par exemple, si startIndex est 3, la boucle s'exécutera 3 fois pour ajouter 3 cellules vides avant d'afficher le premier jour du mois.

        row.appendChild(document.createElement("td")); // Ajoute une cellule vide (td : table data) à la ligne du calendrier pour chaque jour avant le premier jour du mois. Par exemple, si le mois commence un mercredi, startIndex vaudra 2 (car mercredi est le troisième jour de la semaine en comptant à partir de lundi), et deux cellules vides seront ajoutées au début de la première ligne du calendrier pour représenter les jours de lundi et mardi qui ne font pas partie du mois affiché.
    }

    // Boucle sur chaque jour du mois
    for (let day = 1; day <= lastDay.getDate(); day++) { // Boucle pour chaque jour du mois, de 1 au nombre de jours dans le mois (lastDay.getDate() retourne le dernier jour du mois, par exemple 28 pour février, 30 pour avril, etc.)

        let cell = document.createElement("td"); // Crée une cellule pour le jour du mois en cours (td : table data (cellule de données)) en utilisant la méthode createElement du DOM pour créer un élément HTML de type "td".
        cell.innerText = day; // Affiche le numéro du jour dans la cellule (ex: "1", "2", ..., "31")

        // Détermine le jour de la semaine (0=dimanche, 6=samedi)
        let dayOfWeek = new Date(year, month, day).getDay(); // Calcule le jour de la semaine pour le jour actuel en créant une nouvelle date avec l'année, le mois et le jour en cours, puis en utilisant la méthode getDay() pour obtenir le jour de la semaine (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi).

        // Si c'est un week-end, ajoute la classe "weekend" au CSS avec une couleur de fond différente.
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add("weekend"); // Si le jour de la semaine est dimanche (0) ou samedi (6), ajoute la classe "weekend" au CSS, à la cellule pour la styliser différemment (par exemple, en changeant la couleur de fond) afin de différencier les jours de week-end des jours de semaine dans le calendrier.
        }

        // Si c'est le jour « réel » d'aujourd'hui, on met en évidence (ne pas se baser sur currentDate qui change lors de la navigation)
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            cell.classList.add("today"); // Jour réel mis en évidence
        }
        
        row.appendChild(cell);

        // Lorsqu'on arrive à dimanche, ajoute la ligne au tableau et commence une nouvelle
        if (dayOfWeek === 0) {// Si le jour de la semaine est dimanche (0), cela signifie que la semaine est terminée, donc on ajoute la ligne actuelle au tableau et on commence une nouvelle ligne pour la semaine suivante.

            table.appendChild(row); // Ajoute la ligne actuelle au tableau en utilisant la méthode appendChild du DOM pour ajouter la ligne (tr) au tableau (table).

            row = document.createElement("tr"); // Crée une nouvelle ligne pour la semaine suivante en utilisant la méthode createElement du DOM pour créer un nouvel élément HTML de type "tr". Cette nouvelle ligne sera utilisée pour les jours suivants du mois jusqu'à ce que le mois soit terminé ou que la prochaine semaine soit terminée (lorsque le prochain dimanche est atteint).
        }
    }

    // Ajoute la dernière ligne au tableau
    table.appendChild(row); // Après la boucle qui ajoute les jours du mois, il peut rester une ligne partiellement remplie (si le mois ne se termine pas un dimanche). Cette ligne doit être ajoutée au tableau pour s'assurer que tous les jours du mois sont affichés correctement. La méthode appendChild du DOM est utilisée pour ajouter cette dernière ligne (tr) au tableau (table) afin de compléter l'affichage du calendrier mensuel. c'est-à-dire que même si la dernière semaine du mois n'est pas complète (par exemple, si le mois se termine un jeudi), cette ligne sera ajoutée pour afficher les jours restants du mois dans la vue mensuelle du calendrier.

    calendar.appendChild(table); // Ajoute le tableau complet du calendrier à l'élément HTML avec l'id "calendar" en utilisant la méthode appendChild du DOM pour ajouter le tableau (table) au conteneur (calendar). Cela rend le calendrier visible sur la page web, affichant ainsi la vue mensuelle du calendrier avec les jours du mois, les week-ends différenciés et le jour actuel mis en évidence.
}

// Fonction qui génère la vue hebdomadaire du calendrier
function generateWeekView() { // Génère la semaine en fonction de la date actuelle (currentDate) en calculant le lundi et le dimanche de la semaine en cours, puis affiche les jours de la semaine avec les heures de 7h à 17h. Les week-ends sont différenciés par une classe CSS, et le jour actuel est mis en évidence.

    // Crée une copie de la date actuelle pour la traiter
    let tmp = new Date(currentDate); // Crée une nouvelle date (tmp) qui est une copie de la date actuelle (currentDate). Cela permet de manipuler cette date temporaire pour calculer les jours de la semaine sans modifier la date originale (currentDate) qui représente la date du jour. En utilisant une copie, on peut effectuer des calculs pour trouver le lundi et le dimanche de la semaine en cours sans affecter la valeur de currentDate, ce qui est important pour maintenir la cohérence de la date du jour dans d'autres parties du code.

    // Récupère le jour de la semaine (0=dimanche, 6=samedi)
    let dow = tmp.getDay(); // dow (day of week) récupère le jour de la semaine pour la date temporaire (tmp) en utilisant la méthode getDay() de l'objet Date. Cette méthode retourne un nombre entier représentant le jour de la semaine, où 0 correspond à dimanche, 1 à lundi, ..., et 6 à samedi. Par exemple, si tmp représente le 26 février 2026, dow vaudra 4 (car c'est un jeudi).

    // Calcule le nombre de jours à retrancher pour atteindre le lundi
    let diff = (dow + 6) % 7; // diff calcule le nombre de jours à retrancher de la date temporaire (tmp) pour atteindre le lundi de la semaine en cours. En ajoutant 6 à dow et en prenant le résultat modulo 7, on obtient un nombre entre 0 et 6 qui représente le nombre de jours à soustraire pour revenir au lundi. Par exemple, si dow est 4 (jeudi), diff vaudra 3, ce qui signifie que pour atteindre le lundi, il faut soustraire 3 jours du jeudi. Et si dow est 0 (dimanche), diff vaudra 6, ce qui signifie que pour atteindre le lundi, il faut soustraire 6 jours du dimanche (ce qui revient à avancer d'un jour pour atteindre le lundi suivant). % 7 est utilisé pour s'assurer que le résultat reste dans la plage de 0 à 6, ce qui correspond aux jours de la semaine.

    // Crée une date pour le lundi de la semaine en cours
    let monday = new Date(tmp); // monday crée une nouvelle date qui est une copie de la date temporaire (tmp). Cette nouvelle date sera utilisée pour calculer le lundi de la semaine en cours en soustrayant le nombre de jours calculé dans diff. En utilisant une copie, on peut manipuler cette date pour trouver le lundi sans affecter la date temporaire (tmp) qui est utilisée pour d'autres calculs ou affichages dans le code.

    monday.setDate(tmp.getDate() - diff); // Utilise la méthode setDate() pour ajuster la date de monday en soustrayant diff du jour de la date temporaire (tmp). Cela permet de reculer la date de monday pour atteindre le lundi de la semaine en cours. Par exemple, si tmp représente le 26 février 2026 (jeudi) et que diff est 3, alors monday sera ajusté pour représenter le 23 février 2026 (lundi), qui est le début de la semaine en cours.

    // Crée une date pour le dimanche de la semaine en cours
    let end = new Date(monday); // end crée une nouvelle date qui est une copie de la date de monday. Cette nouvelle date sera utilisée pour calculer le dimanche de la semaine en cours en ajoutant 6 jours à la date de monday. En utilisant une copie, on peut manipuler cette date pour trouver le dimanche sans affecter la date de monday qui représente le lundi de la semaine en cours.

    end.setDate(monday.getDate() + 6); // Utilise la méthode setDate() pour ajuster la date de end en ajoutant 6 au jour de la date de monday. Cela permet d'avancer la date de end pour atteindre le dimanche de la semaine en cours. Par exemple, si monday représente le 23 février 2026 (lundi), alors end sera ajusté pour représenter le 29 février 2026 (dimanche), qui est la fin de la semaine en cours.

    // Affiche la plage de dates de la semaine au format français
    document.getElementById("currentMonth").innerText = // innertext met à jour le texte de l'élément HTML avec l'id "currentMonth" pour afficher la plage de dates de la semaine en cours. Le texte affiché est au format français, indiquant le début de la semaine (lundi) et la fin de la semaine (dimanche) avec les jours, les mois et les années correspondants. Par exemple, si monday représente le 23 février 2026 et end représente le 29 février 2026, le texte affiché sera : "Semaine du 23 février 2026 au 29 février 2026". Cela permet à l'utilisateur de voir clairement la période couverte par la vue hebdomadaire du calendrier.

        "Semaine du " + monday.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) +
        " au " + end.toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }); // Utilise la méthode toLocaleDateString() pour formater les dates de monday et end en français, affichant le jour, le mois et l'année. Cela permet d'afficher la plage de dates de la semaine de manière claire et compréhensible pour les utilisateurs francophones.

    // Crée un élément tableau pour afficher la semaine
    let table = document.createElement("table");

    // Tableau avec les jours de la semaine
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

    // Crée la ligne d'en-tête avec la colonne "Heure" + les 7 jours avec leur date
    let headerRow = document.createElement("tr"); // headerRow crée une nouvelle ligne d'en-tête pour le tableau de la vue hebdomadaire du calendrier. Cette ligne d'en-tête contiendra la colonne "Heure" ainsi que les 7 jours de la semaine avec leur date correspondante. En utilisant createElement("tr"), on crée un élément HTML de type "tr" (table row) qui servira de conteneur pour les cellules d'en-tête (th) qui seront ajoutées par la suite pour afficher les informations des jours de la semaine et les heures dans la vue hebdomadaire du calendrier.

    // Cellule d'en-tête pour la colonne heure
    let thHeure = document.createElement("th"); // thHeure crée une nouvelle cellule d'en-tête pour la colonne "Heure" dans la ligne d'en-tête du tableau de la vue hebdomadaire du calendrier. Cette cellule d'en-tête servira à indiquer que la première colonne du tableau correspond aux heures de la journée (par exemple, 07:00, 08:00, etc.). En utilisant createElement("th"), on crée un élément HTML de type "th" (table header) qui sera utilisé pour afficher le texte "Heure" dans la première colonne de la ligne d'en-tête du tableau, permettant ainsi aux utilisateurs de comprendre que les cellules en dessous de cette colonne correspondent aux heures de la journée dans la vue hebdomadaire du calendrier.
    thHeure.innerText = "Heure";
    thHeure.classList.add("col-heure"); // Ajoute la classe "col-heure" au CSS  à la cellule d'en-tête de la colonne "Heure" pour permettre de styliser cette colonne de manière spécifique (par exemple, en définissant une largeur fixe, une couleur de fond différente, etc.) dans la vue hebdomadaire du calendrier. En ajoutant cette classe, on peut cibler cette cellule d'en-tête dans le CSS pour appliquer des styles personnalisés qui différencient visuellement la colonne des heures des autres colonnes du tableau.

    headerRow.appendChild(thHeure); // Ajoute la cellule d'en-tête de la colonne "Heure" à la ligne d'en-tête du tableau en utilisant la méthode appendChild du DOM pour ajouter thHeure à headerRow. Cela construit la première partie de la ligne d'en-tête qui indique que la première colonne du tableau correspond aux heures de la journée dans la vue hebdomadaire du calendrier.

    // index de la colonne du jour actuel (utilisé pour colorer les cellules plus bas)
    let todayIndex = -1; // todayIndex initialise une variable pour stocker l'index de la colonne du jour actuel dans la vue hebdomadaire du calendrier. Cette variable sera utilisée plus tard pour appliquer une classe CSS spécifique aux cellules de cette colonne afin de les colorer différemment et ainsi mettre en évidence le jour actuel dans la vue hebdomadaire du calendrier. En initialisant todayIndex à -1, on indique que par défaut, il n'y a pas de jour actuel identifié, et cette variable sera mise à jour lors de la création des en-têtes des jours de la semaine pour identifier l'index correspondant au jour actuel.

    // Boucle sur les 7 jours pour créer les en-têtes avec le nom du jour et sa date
    for (let i = 0; i < 7; i++) {
        let d = new Date(monday);
        d.setDate(monday.getDate() + i);
        let th = document.createElement("th");
        th.innerText = days[i] + " " + d.getDate();
        // si c'est le jour réel d'aujourd'hui, on ajoute une classe et on mémorise l'index
        if (d.toDateString() === today.toDateString()) {
            th.classList.add("today");
            todayIndex = i;
        }
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
            // colorer la colonne du jour actuel
            if (i === todayIndex) {
                cell.classList.add("today");
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

// Fonction qui génère la vue journalière du calendrier
function generateDayView() {
    // Affiche la date sélectionnée (currentDate) dans l'entête
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
    // met en surbrillance uniquement si la date correspond à aujourd'hui réel
    if (currentDate.toDateString() === today.toDateString()) {
        thJour.classList.add("today");
    }
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
        // colonne actuelle (seulement si c'est aujourd'hui réel)
        if (currentDate.toDateString() === today.toDateString()) {
            tdJour.classList.add("today");
        }

        row.appendChild(tdHeure); // Ajoute la cellule de l'heure à la ligne du tableau
        row.appendChild(tdJour); // Ajoute la cellule du jour à la ligne du tableau
        table.appendChild(row); // Ajoute la ligne au tableau de la vue journalière du calendrier. row contient à la fois la cellule de l'heure et la cellule du jour, et en l'ajoutant au tableau, on construit progressivement la vue journalière du calendrier avec les heures de 7h à 19h affichées dans la première colonne et les cellules correspondantes pour le jour actuel dans la deuxième colonne. Si c'est un week-end, ces cellules seront stylisées différemment grâce à la classe CSS "weekend", et le jour actuel sera mis en évidence grâce à la classe "today".
    }

    calendar.appendChild(table); // Ajoute le tableau complet de la vue journalière du calendrier à l'élément HTML avec l'id "calendar" pour l'afficher sur la page web. Cela rend visible la vue journalière du calendrier, montrant les heures de 7h à 19h dans la première colonne et les cellules correspondantes pour le jour actuel dans la deuxième colonne, avec une différenciation visuelle pour les week-ends et le jour actuel grâce aux classes CSS "weekend" et "today".
}

// Ajoute un événement au bouton "précédent" pour naviguer en arrière
document.getElementById("prevMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        // va au mois précédent
        currentDate.setMonth(currentDate.getMonth() - 1); // En vue mensuelle, recule d'un mois en soustrayant 1 du mois de la date actuelle (currentDate) en utilisant la méthode setMonth() de l'objet Date. Cela permet de naviguer vers le mois précédent dans la vue mensuelle du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 26 janvier 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations du mois précédent dans la vue mensuelle du calendrier.

    } else if (currentView === 'week') {
        // Affiche une semaine
        currentDate.setDate(currentDate.getDate() - 7); // En vue hebdomadaire, recule de 7 jours en soustrayant 7 du jour de la date actuelle (currentDate) en utilisant la méthode setDate() de l'objet Date. Cela permet de naviguer vers la semaine précédente dans la vue hebdomadaire du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 19 février 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations de la semaine précédente dans la vue hebdomadaire du calendrier.

    } else if (currentView === 'day') {
        // Affiche 1 jour
        currentDate.setDate(currentDate.getDate() - 1); // En vue journalière, recule d'1 jour en soustrayant 1 du jour de la date actuelle (currentDate) en utilisant la méthode setDate() de l'objet Date. Cela permet de naviguer vers le jour précédent dans la vue journalière du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 25 février 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations du jour précédent dans la vue journalière du calendrier.
    }
    generateCalendar(); // Regénère le calendrier pour refléter la nouvelle date après avoir navigué en arrière. Cette fonction est appelée à chaque fois que l'utilisateur clique sur le bouton "précédent" pour mettre à jour l'affichage du calendrier en fonction de la date modifiée (mois précédent, semaine précédente ou jour précédent) selon la vue actuellement sélectionnée (mois, semaine ou jour).
});

// Ajoute un événement au bouton "suivant" pour naviguer en avant
document.getElementById("nextMonth").addEventListener("click", () => {
    if (currentView === 'month') {
        // En vue mensuelle, va au mois suivant
        currentDate.setMonth(currentDate.getMonth() + 1); // En vue mensuelle, avance d'un mois en ajoutant 1 au mois de la date actuelle (currentDate) en utilisant la méthode setMonth() de l'objet Date. Cela permet de naviguer vers le mois suivant dans la vue mensuelle du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 26 mars 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations du mois suivant dans la vue mensuelle du calendrier.

    } else if (currentView === 'week') {
        // En vue hebdomadaire, avance de 7 jours (une semaine)
        currentDate.setDate(currentDate.getDate() + 7); // En vue hebdomadaire, avance de 7 jours en ajoutant 7 au jour de la date actuelle (currentDate) en utilisant la méthode setDate() de l'objet Date. Cela permet de naviguer vers la semaine suivante dans la vue hebdomadaire du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 5 mars 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations de la semaine suivante dans la vue hebdomadaire du calendrier.

    } else if (currentView === 'day') {
        // En vue journalière, avance d'1 jour
        currentDate.setDate(currentDate.getDate() + 1); // En vue journalière, avance d'1 jour en ajoutant 1 au jour de la date actuelle (currentDate) en utilisant la méthode setDate() de l'objet Date. Cela permet de naviguer vers le jour suivant dans la vue journalière du calendrier. Par exemple, si currentDate représente le 26 février 2026, après cette opération, currentDate représentera le 27 février 2026, ce qui permettra à l'utilisateur de voir les événements ou les informations du jour suivant dans la vue journalière du calendrier.
    }
    generateCalendar(); // Regénère le calendrier pour refléter la nouvelle date après avoir navigué en avant. Cette fonction est appelée à chaque fois que l'utilisateur clique sur le bouton "suivant" pour mettre à jour l'affichage du calendrier en fonction de la date modifiée (mois suivant, semaine suivante ou jour suivant) selon la vue actuellement sélectionnée (mois, semaine ou jour).
});

// Sélectionne tous les boutons de changement de vue et ajoute des événements au clic
document.querySelectorAll('.view-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
        // Change la vue selon l'attribut data-view du bouton cliqué
        currentView = btn.dataset.view;

        // si on demande la vue jour, on veut s'assurer de retomber sur la date "réelle" du jour
        if (currentView === 'day') {
            currentDate = new Date();
        }

        generateCalendar(); // régénère avec la nouvelle vue (et éventuellement date restaurée)
    });
});

// Affiche le calendrier au chargement initial de la page
generateCalendar(); // Appelle la fonction generateCalendar() pour afficher le calendrier dès que la page est chargée. Cela permet à l'utilisateur de voir immédiatement la vue par défaut du calendrier (qui est généralement la vue mensuelle) avec les événements et les informations correspondantes sans avoir à cliquer sur un bouton pour générer le calendrier.