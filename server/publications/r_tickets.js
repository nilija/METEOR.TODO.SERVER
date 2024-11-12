Meteor.publish('r_tickets', function (Services) {
/*    aktivnost = [];
    var x = activities.find({'Aktivnost': 'otvoren'}).fetch();
    aktivnost.push(x[0]._id);
    x = activities.find({'Aktivnost': 'u postupku'}).fetch();
    aktivnost.push(x[0]._id);
    x = activities.find({'Aktivnost':'zatvoren'}).fetch();
    aktivnost.push(x[0]._id);
    //    console.log(akt);
    var result = tickets.find({"Aktivnost": {$in: aktivnost}}, {sort: {ToDo: 1}});*/
//    var Services = services;

    var length = 0;
    if (typeof Services != 'undefined' && Services) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        var Services = Services.split(",");
        length = Services.length;
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
//    var servis_id = ['DQxBAvHGSvaXBrNfp', 'Rjbz3Dogj9fedDor7', 'faZekZ7ZrsTTieKkR'];

    var count = tickets.find({"Servis": {$in: arr_services}}).count();
    console.log ('count' + count);
    var result = tickets.find({"Servis": {$in: arr_services}});

//     Radni dan je od 08 – 17h

    r_tickets.remove({}) // remove every tickets

    var today = new Date(Date.now());
    var minut_ms = (1000 * 60);
    var sat_ms = (1000 * 60 * 60);

    result.forEach(function(result) {
//                var beforeDays = new Date(Date.now() - 1000 * 3600 * 24 * 7);

        var is_Weekend = 0;
        var hoursDatumZatvaranja = 0;
        if (result.DatumZatvaranja > ' ') {
            var datum = result.DatumZatvaranja.split(",");
            var from = datum[0].split("/");
            var vreme = datum[1].split(":");
            hoursDatumZatvaranja = parseInt(vreme[0]);
            var minutes = vreme[1];

//                                                                              if date is in 28-08-2012 format
            var fDatumZatvaranja = new Date(from[0], from[1] - 1, from[2]).getTime();
            fDatumZatvaranja += (minutes) * minut_ms + (hoursDatumZatvaranja) * sat_ms;
            fDatumZatvaranja = new Date(fDatumZatvaranja);

            var noofWeekend = isWeekend(fDatumZatvaranja);
            if (noofWeekend > 0)
                is_Weekend = 1;
        }
/*            var naplacen = false;
            if (result.Naplacen)
                naplacen = result.Naplacen;*/

            var data = {
                Aktivnost: result.Aktivnost,
                Servis: result.Servis,
                Prioritet: result.Prioritet,
                Komitent: result.Komitent,
                OpisProblema: result.OpisProblema,
                ProblemPrijavio: result.ProblemPrijavio,
                DatumOtvaranja: result.DatumOtvaranja,
                TiketOtvorio: result.TiketOtvorio,
                ZaposleniToDo: result.ZaposleniToDo,
                Napomena: result.Napomena,
                DatumToDo: result.DatumToDo,
                Zaduzen: result.Zaduzen,
                Intervencija: result.Intervencija,
                Naplacen: result.Naplacen,
                hoursDatumZatvaranja : hoursDatumZatvaranja,
                is_Weekend : is_Weekend
            };
            r_tickets.insert(data);
//        }

    })
    return r_tickets.find();
});
function currentDateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var hh = today.getHours(); // => 9
    var min = today.getMinutes(); // =>  30
//    var n = today.getTime();
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} if(hh<10){hh='0'+hh} if(min<10){min='0'+min}
    //return dd+'/'+mm+'/'+yyyy+', '+hh+':'+min;
    return yyyy+'/'+mm+'/'+dd+', '+hh+':'+min;
}

function isWeekend(date1) {
    var d1 = new Date(date1),
    ii = 0;
    var day = d1.getDay();
    if ((day == 6) || (day == 0)) {
            ii++;  //  increments the value of a variable by one.
    }
    return ii;
}
