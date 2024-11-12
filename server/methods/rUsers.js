Meteor.methods({
    "rUsersChart1": function(Services, select, selectL, selectG) {
//        var services = Services.split(",");
//        var Services = Services;

        var services_ = [];
        Services.forEach(function (service) {
            var service_ = services.find({'Servis': service}).fetch();
            services_.push (service_[0]._id);
        });

        /*        if(select=='all')
         select = ' ';
         if(selectG=='all')
         selectG = '/';*/

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
        var username = ['admin', 'nilija', 'ftsmonitor'];
        var ovlascenje = [];
        var ovlascenjeCU = authorities.find({'Ovlascenje': 'ClientUser'}).fetch();
        ovlascenje.push (ovlascenjeCU[0]._id);
        var ovlascenjeCSU = authorities.find({'Ovlascenje': 'ClientSuperUser'}).fetch();
        ovlascenje.push (ovlascenjeCSU[0]._id);
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}} ] });
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {"profile.Ovlascenje":{$ne: ovlascenjeCU[0]._id}}, {"profile.Ovlascenje":{$ne: ovlascenjeCSU[0]._id}} ] });
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
/*        console.log (services);
        console.log (users);*/
        users.forEach(function (user) {

            for (i = 0; i < Services.length; i++) {
                if (user.profile.Services.indexOf(Services[i]) > -1) {

                    cat.push(user.profile.ImePrezime);
                    datTelefon.push(tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iTelefon._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datTeren.push(tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iTeren._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datRemote.push(tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iRemote._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    datServis.push(tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        "Intervencija": {$in: [iServis._id]},
                        'Komitent': {$regex: select}
                    }).count());
                    i = Services.length;
                    // aktivnost
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
    "rUsersChart2": function(Services, select, selectL, selectG) {
        /*        if(select=='all')
         select = ' ';
         if(selectG=='all')
         selectG = '/';*/
//        var services = Services;

        var services_ = [];
        Services.forEach(function (service) {
            var service_ = services.find({'Servis': service}).fetch();
            services_.push (service_[0]._id);
        });

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
        var username = ['admin', 'nilija', 'ftsmonitor'];
        var ovlascenje = [];
        var ovlascenjeCU = authorities.find({'Ovlascenje': 'ClientUser'}).fetch();
        ovlascenje.push (ovlascenjeCU[0]._id);
        var ovlascenjeCSU = authorities.find({'Ovlascenje': 'ClientSuperUser'}).fetch();
        ovlascenje.push (ovlascenjeCSU[0]._id);
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}} ] });
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {"profile.Ovlascenje":{$ne: ovlascenjeCU[0]._id}}, {"profile.Ovlascenje":{$ne: ovlascenjeCSU[0]._id}} ] });
        var users = usersAll.find({ $and: [ {username:{$nin: username}}, {"profile.Ovlascenje":{$nin:  ovlascenje}} ] });
        var dat = [];
        users.forEach(function (user) {
            for (i = 0; i < Services.length; i++) {
                if (user.profile.Services.indexOf(Services[i]) > -1) {
//                    console.log (user.profile.ImePrezime);
                    dat.push([user.profile.ImePrezime, tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        'Zaduzen': {$regex: user.profile.ImePrezime},
                        'Komitent': {$regex: select}
                    }).count()]);
                    i = Services.length;
                }
            }
        })
        return dat;
    },
    "rUsersTabela": function(Services, select, selectL, selectG) {
        /*        if(select=='all')
         select = ' ';
         if(selectG=='all')
         selectG = '/';*/
//        var services = Services;

        var services_ = [];
        Services.forEach(function (service) {
            var service_ = services.find({'Servis': service}).fetch();
            services_.push (service_[0]._id);
        });

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
        var username = ['admin', 'nilija', 'ftsmonitor'];
        var ovlascenje = [];
        var ovlascenjeCU = authorities.find({'Ovlascenje': 'ClientUser'}).fetch();
        ovlascenje.push (ovlascenjeCU[0]._id);
        var ovlascenjeCSU = authorities.find({'Ovlascenje': 'ClientSuperUser'}).fetch();
        ovlascenje.push (ovlascenjeCSU[0]._id);
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}} ] });
//        var users = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {"profile.Ovlascenje":{$ne: ovlascenjeCU[0]._id}}, {"profile.Ovlascenje":{$ne: ovlascenjeCSU[0]._id}} ] });
        var users = usersAll.find({ $and: [ {username:{$nin: username}}, {"profile.Ovlascenje":{$nin:  ovlascenje}} ] });
        var redovi = Spacebars.SafeString('');
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'},{_id: 1});
        var xx1 = 0;
        var xx2 = 0;
        var xx3 = 0;
        users.forEach(function (user) {
            for (i = 0; i < Services.length; i++) {
                if (user.profile.Services.indexOf(Services[i]) > -1) {
                    var x1 = tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        "Zaduzen": user.profile.zaZaduzen,
                        "Aktivnost": aktivnostZ._id,
                        'Komitent': {$regex: select}
                    }).count();
                    var x2 = tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        "Zaduzen": {$regex: user.profile.zaZaduzen},
                        "Aktivnost": aktivnostZ._id,
                        'Komitent': {$regex: select}
                    }).count();
                    var x21 = x2 - x1;
                    var x3 = tickets.find({
                        'Servis':{$in: services_},
                        'DatumOtvaranja': {$regex: selectG},
                        "Zaduzen": {$regex: user.profile.zaZaduzen},
                        "Aktivnost": {$ne: aktivnostZ._id},
                        'Komitent': {$regex: select}
                    }).count();
                    xx1 += x1;
                    xx2 += x21;
                    xx3 += x3;
                    redovi += Spacebars.SafeString('<tr>'
                        + '    <td style="text-align:left;">' + user.profile.ImePrezime + '</td>'
                        + '    <td>' + x1 + '</td>'
                        + '    <td>' + x21 + '</td>'
                        + '    <td>' + x3 + '</td>'
                        + '    <td>' + (x1 + x21 + x3) + '</td>'
                        + '</tr>');
                    i = Services.length;
                }
            }
        });
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;"><strong>Ukupno</strong></td>'
        +'    <td><strong>'+xx1+'</strong></td>'
        +'    <td><strong>'+xx2+'</strong></td>'
        +'    <td><strong>'+xx3+'</strong></td>'
        +'    <td><strong>'+(xx1+xx2+xx3)+'</strong></td>'
        +'</tr>');
  /*      var xx4 = tickets.find().count();
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;"><strong>Ukupno tiketa</strong></td>'
        +'    <td colspan="3" style="text-align:center;"><strong>'+xx4+'</strong></td>'
        +'</tr>');*/
        return redovi;
    }

});




