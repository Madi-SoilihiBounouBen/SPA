// mise en cache de l'objet jQuery pour le conteneur du calendrier (utilisé à plusieurs endroits ci-dessous)
const $calendrier = $("#calendrier");
// initialisation de FullCalendar sur l'élément avec toutes les options souhaitées
$calendrier.fullCalendar({
            header: {
                left: ' today,prev,next,  title',
                right: 'month,agendaWeek,agendaDay '
            },
            weekends: true,
            allDaySlot: true,
            droppable: true, 
            eventAfterAllRender: function(view){
                // exécuté une fois que le calendrier a terminé de dessiner tous les événements ;
                // on l'utilise pour brancher des boutons personnalisés et gérer l'état de la vue agenda

                const $header = $calendrier.find(".fc-header");
                // déclencher la vue actuelle
                $header.find('.fc-header-right').find('.fc-button').off('mouseup').on('mouseup', function(){
                    if(!$(this).hasClass('fc-button-agendaView')){
                        $calendrier.data("view", '');
                    }
                });

                if( $calendrier.data("view") != 'agendaView' ){
                    $header.find(".fc-button-agendaView").removeClass('fc-state-active active');
                    $("#agendaView").remove();
                } else {
                    renderAgendaView();
                }
            },
            eventRender: function(event, e){
                // déclenché pour chaque événement lorsqu'il est inséré dans le DOM ;
                // ici on pourrait modifier l'élément ou capturer le nom de la vue actuelle
                let currentView = $calendrier.fullCalendar('getView').name;
            },
            dayClick: function(date, jsEvent, view) {
                // appelé lorsqu'une cellule de jour est cliquée ; les arguments fournissent la date et l'événement de clic
            },
            eventClick: function(calEvent, jsEvent, view) {
                // déclenché lorsqu'un événement est cliqué ; `calEvent` contient toutes les propriétés de l'événement
                console.log("===== eventClick =====");
                console.log(calEvent);
            }
});

const headerRight = $calendrier.find(".fc-header").find(".fc-header-right");

const agendaBtn = headerRight.find(".fc-corner-right").removeClass('fc-corner-right')
                .clone().addClass('fc-corner-right fc-button-agendaView').removeClass('fc-button-agendaDay').text("agenda");

agendaBtn.on('click', function(){
    renderAgendaView();
});

headerRight.find(".fc-header-space").before(agendaBtn);

// Test de données d'événement
const date = new Date();
const d = date.getDate();
const m = date.getMonth();
const y = date.getFullYear();

const newEvent = {
    title: 'NEW EVENT',
    start: new Date(y, m, d, 10),
    end: new Date(y, m, d, 15),
    editable: true
};

// ajout d'un événement au calendrier
const event = $calendrier.fullCalendar('renderEvent', newEvent, 'stick');


function renderAgendaView(){

    if($calendrier.fullCalendar('getView') != 'agendaView'){
        $calendrier.fullCalendar('changeView', 'month');
        const newView = $calendrier.fullCalendar('getView');
        newView.name = 'agendaView';
        $calendrier.fullCalendar('changeView', 'agendaView');
    }

    // mémoriser les événements actuels
    const events = $calendrier.fullCalendar('clientEvents');

    // obtenir la date actuelle
    const currentDate = $calendrier.fullCalendar('getDate');

    $calendrier.find(".fc-header").find(".fc-button-agendaView").siblings().removeClass('fc-state-active').end().addClass('fc-state-active');

    $calendrier.data("view", 'agendaView');

    const agendaViewHtml = document.createElement('div');
    agendaViewHtml.setAttribute("id", "agendaView");

    let contents = "<table>" + 
        "<thead><tr>" +
        "<th class='fc-widget-header fc-agendaView-event-start'>DateStart</th>" + 
        "<th class='fc-widget-header fc-agendaView-event-end'>DateEnd</th>" + 
        "<th class='fc-widget-header fc-agendaView-event-title'>Event</th>" +
        "</tr></thead>" + 
        "<tbody>";

    for (const key in events) {
        // détecter la plage de mois
        const monthRange = moment().range(moment(currentDate).startOf('month'), moment(currentDate).endOf('month'));
        const eventStart = moment(events[key].start).format("YYYY/MM/DD-H:mm:ss");
        const eventEnd = moment(events[key].end).format("YYYY/MM/DD-H:mm:ss");

        if(monthRange.contains(events[key].start) && monthRange.contains(events[key].end)){
            const eventTitle = events[key].title;
            contents += '<tr>' + 
                '<td class="fc-widget-content">' + eventStart + '</td>' + 
                '<td class="fc-widget-content">' + eventEnd + '</td>' + 
                '<td class="fc-widget-content">' + eventTitle + '</td>' + 
                '</tr>';
        }
    }

    contents += "</tbody></table>";
    agendaViewHtml.innerHTML = contents;
    $calendrier.find(".fc-content").html(agendaViewHtml);
}