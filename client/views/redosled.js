Template.redosled_.helpers({
    isAdmin: function() {
        if(Session.get('isAdmin'))
            return true;
        },
    isToDo: function() {
        if(Session.get('isClientSuperUser') && Session.get('isZaduzenja'))
            return true;
    },
    readTickets: function() {
//        Meteor.subscribe('ticketsUR');
//        console.log (tickets.find().count());
        var servis_id = selectServices();
//        console.log (servis_id);
        if (Session.get('fOtvoreni') || Session.get('fPostupak')) {
            var akt = [];
            if (Session.get('fOtvoreni')) akt.push(Session.get('IdOtvoreni'));
            if (Session.get('fPostupak')) akt.push(Session.get('IdPostupak'));

//            var ticketi = tickets.find({$and: [ {"Aktivnost": {$in: akt}}, {ToDo: {$ne: 0}}]}, {sort: {ToDo: 1}});
//            var ticketi = tickets.find();

            var ticketi = tickets.find({"Aktivnost": {$in: akt}, "Servis": {$in: servis_id}}, {sort: {ToDo: 1}}).fetch();
            var r = [];

            ticketi.forEach(function (e) {
                e.Prioritet = getPrioritet(e.Prioritet);
                e.Aktivnost = getAktivnost(e.Aktivnost);
            r.push(e);
            });

            return r;

        }
    }
});
Template.redosled.events({
    'click #fOtvoreni': function(event){
        //console.log ("onda ovde click fotvoreni");
        getActivitiesIDs();
        Session.set('fOtvoreni', !Session.get('fOtvoreni'));
        $('#cb1').prop("checked", !$('#cb1').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fPostupak': function(event){
        getActivitiesIDs();
        Session.set('fPostupak', !Session.get('fPostupak'));
        $('#cb2').prop("checked", !$('#cb2').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb2').toggle('this.checked');
    }
});

Template.redosled.rendered = function() {

    Session.set('fOtvoreni', false);
    Session.set('fPostupak', false);
    //$('#cb1').prop("checked", !$('#cb1').prop("checked"));
    $('#fOtvoreni').click();
    $('#fPostupak').click();
    reRenderRedosled_();
}

function reRenderRedosled_() {
    this.$('#red').sortable({
        stop: function(e, ui) {

            //console.log(ui.red);
            // get the dragged html element and the one before
            //   and after it
            el = ui.item.get(0);
            before = ui.item.prev().get(0);
            after = ui.item.next().get(0);

            // Here is the part that blew my mind!
            //  Blaze.getData takes as a parameter an html element
            //    and will return the data context that was bound when
            //    that html element was rendered!
            if(!before) {
                //if it was dragged into the first position grab the
                // next element's data context and subtract one from the rank
                newRank = Blaze.getData(after).ToDo - 1;
            } else if(!after) {
                //if it was dragged into the last position grab the
                //  previous element's data context and add one to the rank
                newRank = Blaze.getData(before).ToDo + 1;
            }
            else
            //else take the average of the two ranks of the previous
            // and next elements
                newRank = (Blaze.getData(after).ToDo + Blaze.getData(before).ToDo)/2;

            //update the dragged Item's rank
            tickets.update({_id: Blaze.getData(el)._id}, {$set: {ToDo: newRank}});
        }
    });
}

Template.redosled.destroyed = function(){
}
Template.redosled_.destroyed = function(){
}

function getPrioritet(id) {
    var prioritet = priorities.find({'_id': id}).fetch();
    return prioritet[0].Prioritet;
}
function getAktivnost(id) {
    var aktivnost = activities.find({'_id': id}).fetch();
    return aktivnost[0].Aktivnost;
}
function getAktivnostId(name) {
    var aktivnost = activities.find({'Aktivnost': name}).fetch();
    return aktivnost[0]._id;
}
function getActivitiesIDs(){
    if(!Session.get('IdOtvoreni')){
        Session.set('IdOtvoreni', getAktivnostId('otvoren'));
        Session.set('IdPostupak', getAktivnostId('u postupku'));
    }
}
function selectServices() {
    var Services = Session.get('Services');
    var length = 0;
    if (typeof Services != 'undefined' && Services) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        Services = Services.split(",");
//        console.log (Services);
        if(Session.get('isClientSuperUser') && Session.get('isZaduzenja'))

            var Services = Services.filter(function (elem) {
                return elem != 'DA Fratello';
            });
        length = Services.length;
//        console.log ('Services');
//        console.log (Services);
    }
    var services_ = services.find();

    /*    var services_ = [
     {_id:"DQxBAvHGSvaXBrNfp", Servis:"DA Fratello"},
     {_id:"faZekZ7ZrsTTieKkR", Servis:"MOOD Media"}
     ]*/

    var arr_services = [];
    services_.forEach(function (post) {

        var found = false;
        for (var i = 0; i < length; i++) {
            if (post.Servis === Services[i]) {
                arr_services.push(post._id)
            }
        }

    })
    return arr_services;
}
// End of generated file