Meteor.methods({
    "rLokacijeChart1": function(Services, lokacije, select, selectL, selectG) {

        if (typeof selectL != 'undefined' && selectL && selectL > ' ') {
            /*  will evaluate to true if value is not:
             null
             undefined
             NaN
             empty string ("")
             0
             false*/

            select = selectL;
        }

        var services = Services.split(",");
        var username = ['admin', 'nilija', 'ftsmonitor'];
        var ovlascenje = [];
        var ovlascenjeCU = authorities.find({'Ovlascenje': 'ClientUser'}).fetch();
        ovlascenje.push (ovlascenjeCU[0]._id);
        var ovlascenjeCSU = authorities.find({'Ovlascenje': 'ClientSuperUser'}).fetch();
        ovlascenje.push (ovlascenjeCSU[0]._id);
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}} ] });
//        var users = usersAll.find({ $and:  [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {"profile.Ovlascenje":{$ne: ovlascenjeCU[0]._id}}, {"profile.Ovlascenje":{$ne: ovlascenjeCSU[0]._id}} ] });
        var users = usersAll.find({ $and: [ {username:{$nin: username}}, {"profile.Ovlascenje":{$nin:  ovlascenje}} ] });

        var iTelefon = interventions.findOne({'Intervencija': 'telefon'},{_id: 1});
        var iTeren = interventions.findOne({'Intervencija': 'teren'},{_id: 1});
        var iRemote = interventions.findOne({'Intervencija': 'remote'},{_id: 1});
        var iServis = interventions.findOne({'Intervencija': 'servis'},{_id: 1});
        var cat = [];
        var datTelefon = [];
        var datTeren = [];
        var datRemote = [];
        var datServis = [];

        users.forEach(function (user) {

            for (i = 0; i < services.length; i++) {
                if (user.profile.Services.indexOf(services[i]) > -1) {

                    cat.push(user.profile.ImePrezime);
                    datTelefon.push(tickets.find({
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iTelefon._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datTeren.push(tickets.find({
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iTeren._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datRemote.push(tickets.find({
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iRemote._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datServis.push(tickets.find({
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iServis._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    i = services.length;
                }
            }
        });
        var ret = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tip intervencije po radnicima'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: cat
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Ukupno tiketa'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: 'Telefon',
                data: datTelefon
            }, {
                name: 'Teren',
                data: datTeren
            }, {
                name: 'Remote',
                data: datRemote
            }, {
                name: 'Servis',
                data: datServis
            }]
        };
        return ret;
    },
    "rLokacijeChart2": function(Services, lokacije, select, selectL, selectG) {
        var services = Services;
        if (typeof selectL != 'undefined' && selectL && selectL > ' ') {
            /*  will evaluate to true if value is not:
             null
             undefined
             NaN
             empty string ("")
             0
             false*/

            select = selectL;
        }
        var intervencije = interventions.find();
        var dat = [];
        intervencije.forEach(function (intervencija) {
            dat.push([intervencija.Intervencija, tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services},
                "Intervencija": intervencija._id,
                'Komitent': {$regex: select}
            }).count()]);
        });
        dat.push(['Kombinovane intervencije', tickets.find({
            'DatumOtvaranja': {$regex: selectG},
            'Servis': {$in: services},
            "Intervencija.1": {$exists: true},
            'Komitent': {$regex: select}
        }).count()]);
        dat.push(['Nedodeljen tip', tickets.find({
            'DatumOtvaranja': {$regex: selectG},
            'Servis': {$in: services},
            "Intervencija.0": {$exists: false},
            'Komitent': {$regex: select}
        }).count()]);

        return dat;
    },
    "rLokacijeTabela": function(Services, lokacije, select, selectL, selectG) {

        var services = Services;

        var r = [];
        if (typeof selectL != 'undefined' && selectL && selectL > ' ') {
            /*  will evaluate to true if value is not:
             null
             undefined
             NaN
             empty string ("")
             0
             false*/

            r.push(selectL);
        }
        else {
            var komitenti = [];
            if (select.length > 1)
                komitenti = clients.find({Komitent: select}, {sort: {"Komitent": 1}});
            else if (lokacije.length == 0)
                komitenti = clients.find({}, {sort: {"Komitent": 1}});
            else
                komitenti = clients.find({Lokacija: {$in: lokacije}}, {sort: {"Komitent": 1}});
            if (select.length < 2)
                komitenti.forEach(function (e) {
                    r.push(e.Komitent);
                });
            else
                komitenti.forEach(function (e) {
                    r.push(e.Lokacija);
                });
        }
        var redovi = Spacebars.SafeString('');
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'}, {_id: 1});
        var xx1 = 0;
        var xx2 = 0;
        var xx3 = 0;

        for (i = 0; i < r.length; ++i) {

            if (r [i] !== r[i - 1]) {
                komitent = r[i];

//                console.log(komitent);
//                console.log(komitent.Lokacija);
                var x1 = '';
                var x2 = '';
                //{'Komitent': {$regex: select}
                //var x1 = tickets.find({ "Aktivnost": aktivnostZ._id, "Intervencija": { $in: [intervencija._id]}}).count();
                var x1 = tickets.find({
                    'DatumOtvaranja': {$regex: selectG},
                    'Servis': {$in: services},
                    "Aktivnost": aktivnostZ._id,
                    'Komitent': {$regex: komitent}
                }).count();
                var x2 = tickets.find({
                    'DatumOtvaranja': {$regex: selectG},
                    'Servis': {$in: services},
                    "Aktivnost": {$ne: aktivnostZ._id},
                    'Komitent': {$regex: komitent}
                }).count();
                xx1 += x1;
                xx2 += x2;
                redovi += Spacebars.SafeString('<tr>'
                    + '    <td style="text-align:left;">' + komitent + '</td>'
                    + '    <td>' + x1 + '</td>'
                    + '    <td>' + x2 + '</td>'
                    + '    <td>' + (x1 + x2) + '</td>'
                    + '</tr>');
            }
        };

        redovi += Spacebars.SafeString('<tr>'
            + '    <td style="text-align:left;"><strong>Ukupno</strong></td>'
            + '    <td><strong>' + xx1 + '</strong></td>'
            + '    <td><strong>' + xx2 + '</strong></td>'
            + '    <td><strong>' + (xx1 + xx2) + '</strong></td>'
            + '</tr>');
        /*        var xx4 = tickets.find().count();
         redovi += Spacebars.SafeString( '<tr>'
         +'    <td style="text-align:left;"><strong>Ukupno tiketa</strong></td>'
         +'    <td colspan="2" style="text-align:center;"><strong>'+xx4+'</strong></td>'
         +'</tr>');*/
        return redovi;
    }
});




