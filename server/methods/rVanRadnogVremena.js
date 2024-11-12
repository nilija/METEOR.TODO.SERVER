Meteor.methods({
    "rRadnoVremeCount": function(Services, select, selectL, selectG) {
        var services_ = Services;

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
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'}, {_id: 1});
/*        var aktivnostP = activities.findOne({'Aktivnost': 'u postupku'}, {_id: 1});
        var aktivnostO = activities.findOne({'Aktivnost': 'otvoren'}, {_id: 1});*/
        var p1z, p2z, p3z, p1o, p2o, p3o, p1p, p2p, p3p;

//        'Naplacen': {$eq:true}  --------------------------------------------> ne radi u Fratellu
//        'Naplacen': true,       --------------------------------------------> treba - OK

//  --------------------------------------------------------------------------------------------
        p1z = r_tickets.find({
            $and: [
                {'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Komitent': {$regex: select}},
                {$or: [{hoursDatumZatvaranja: {$gt: 16}}, {hoursDatumZatvaranja: {$lt: 8}}, {is_Weekend: 1}]}
            ]
        }).count();

        p2z = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Komitent': {$regex: select},
            hoursDatumZatvaranja: {$gt: 7, $lt: 17}, is_Weekend: 0
        }).count();

        p3z = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Komitent': {$regex: select}
        }).count();
// -------------------------------------------  van radnog vremena -----------------------------
        /*     p1p - naplacen
         p1o - nenaplacen
         */

        p1p = r_tickets.find({
            $and: [
                {'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': true, 'Komitent': {$regex: select}},
                {$or: [{hoursDatumZatvaranja: {$gt: 16}}, {hoursDatumZatvaranja: {$lt: 8}}, {is_Weekend: 1}]}
            ]
        }).count();

        p1o = r_tickets.find({
            $and: [
                {'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': {$in: [null, false]}, 'Komitent': {$regex: select}},
                {$or: [{hoursDatumZatvaranja: {$gt: 16}}, {hoursDatumZatvaranja: {$lt: 8}}, {is_Weekend: 1}]}
            ]
        }).count();

// -------------------------------------------  u radno vreme ----------------------------------
        /*      p2p - naplacen
         p2o - nenaplacen
         */

        p2p = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': true, 'Komitent': {$regex: select},
            hoursDatumZatvaranja: {$gt: 7, $lt: 17}, is_Weekend: 0
        }).count();

        p2o = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': {$in: [null, false]},'Komitent': {$regex: select},
            hoursDatumZatvaranja: {$gt: 7, $lt: 17}, is_Weekend: 0
        }).count();

// -------------------------------------------  ukupno ----------------------------------
        /*      p3p - naplacen
         p3o - nenaplacen
         */


        p3p = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': true, 'Komitent': {$regex: select}
        }).count();

        p3o = r_tickets.find({'DatumOtvaranja': {$regex: selectG}, 'Servis':{$in: services_}, "Aktivnost": aktivnostZ._id, 'Naplacen': {$in: [null, false]},'Komitent': {$regex: select}
        }).count();

/*        console.log ('p1p ' +p1p);
        console.log ('p2p ' +p2p);
        console.log ('p3p ' +p3p);
        console.log ('p1o ' +p1o);
        console.log ('p2o ' +p2o);
        console.log ('p3o ' +p3o);
        console.log ('p1z ' +p1z);
        console.log ('p2z ' +p2z);
        console.log ('p3z ' +p3z);*/
 /*       var p1z = 100;
        var p2z = 100;
        var p3z = 100;
        var p1o = 100;
        var p2o = 100;
        var p3o = 100;
        var p1p = 100;
        var p2p = 100;
        var p3p = 100;*/
        var data = {
            p1z: p1z,
            p2z: p2z,
            p3z: p3z,
            p1p: p1p,
            p2p: p2p,
            p3p: p3p,
            p1o: p1o,
            p2o: p2o,
            p3o: p3o
        };
//        console.log (data);
        return data;
//       return p1z, p2z, p3z, p1o, p2o, p3o, p1p, p2p, p3p;
    },

        "rVanRadnogVremenaChart1": function(select, selectL, selectG, result) {
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
            var p1z = result.p1z;
            var p2z = result.p2z;
            var p1o = result.p1o;
            var p2o = result.p2o;
            var p3o = result.p3o;
            var p1p = result.p1p;
            var p2p = result.p2p;
            var p3p = result.p3p;

    var ret = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Po vremenu izvršenja'
            },
            credits: {
                enabled: false
            },
            xAxis: {
 //               categories: ['P1 (4h / 8h)', 'P2 (Sledeci radni dan / 24h)', 'P3 (Ostalo)']
                categories: ['Van radnog vremena', 'U radnom vremenu', 'Sve / Ukupno', 'Zatvoreni/Ukupno']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Ukupno tiketa'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.1f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                },
                colors:
                    ['#008000', '#ff0000', '#ff8800', '#ff0000']

            },
            series: [{
                name: 'naplaceni',
                color: '#02fc6a',
                data: [p1p, p2p, p3p,   ]
            }, {
                name: 'nenaplaceni ',
                color: '#7a7a79',
                data: [p1o, p2o, p3o,   ]
            }, {
                name: 'izvrseni van radnog vremena',
                color: '#f70202',
                data: [   ,   , p1z, p1z]
            }, {
                name: 'izvrseni u radnom vremenu',
                color: '#5697b7',
                data: [   ,   , p2z, p2z]
            }]
        };
        return ret;
    },
/*    name: 'izvrseni van radnog vremena',
    data: [p1z, p1z, p1z, p1z]
}, {
    name: 'izvrseni u radnom vremenu',
    data: [p2z, p2z, p2z, p2z]*/

    "rVanRadnogVremenaChart2": function(select, selectL, selectG, result) {
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
        var p1z = result.p1z;
        var p2z = result.p2z;
        var p1o = result.p1o;
        var p2o = result.p2o;
        var p1p = result.p1p;
        var p2p = result.p2p;
        var p1 = p1z + p1o + p1p;
        var p2 = p2z + p2o + p2p;

        var ret = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,//null,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Odnos radno vreme / van radnog vremena ukupno'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<span style="color:{series.color}"><b>{point.name}</b>: {point.percentage:.1f} %'
                        /*,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }*/
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Od svih tiketa ',
                color: '#5697b7',
                data: [
                    ['van radnog vremena', p1],
                    {
                        name: 'radno vreme',
                        color: '#f70202',
                        y: p2,
                        sliced: true,
                        selected: true
                    }
                ]
            }]
        };
        return ret;
    },
    "rVanRadnogVremenaTabela": function(select, selectL, selectG, result) {
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
        var p1z = result.p1z;
        var p2z = result.p2z;

        var xx1 = 0;
        var xx2 = 0;
        var redovi = '';

        xx1+=p1z;
        xx2+=p2z;
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;">'+'Zatvoreni'+'</td>'
        +'    <td>'+p1z+'</td>'
        +'    <td>'+p2z+'</td>'
        +'    <td>'+(p1z+p2z)+'</td>'
        +'</tr>');

/*        redovi += Spacebars.SafeString( '<tr>'
            +'    <td style="text-align:left;"><strong>Ukupno</strong></td>'
            +'    <td><strong>'+xx1+'</strong></td>'
            +'    <td><strong>'+xx2+'</strong></td>'
            +'    <td>'+(xx1+xx2)+'</td>'
            +'</tr>');*/
/*
        var xx3 = xx1+xx2;
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;"><strong>Ukupno tiketa</strong></td>'
        +'    <td colspan="2" style="text-align:center;"><strong>'+xx3+'</strong></td>'
        +'</tr>');
*/
        return redovi;
    },
    "rNaplata": function(select, selectL, selectG, result) {

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
        var p1z = result.p1z;
        var p2z = result.p2z;
        var p1o = result.p1o;
        var p2o = result.p2o;
        var p1p = result.p1p;
        var p2p = result.p2p;

        var xx1 = 0;
        var xx2 = 0;
        var redovi = '';

        xx1+=p1o;
        xx2+=p2o;
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;">'+'Ne'+'</td>'
        +'    <td>'+p1o+'</td>'
        +'    <td>'+p2o+'</td>'
        +'    <td>'+(p1o+p2o)+'</td>'
        +'</tr>');
        xx1+=p1p;
        xx2+=p2p;
        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;">'+'Naplaceni'+'</td>'
        +'    <td>'+p1p+'</td>'
        +'    <td>'+p2p+'</td>'
        +'    <td>'+(p1p+p2p)+'</td>'
        +'</tr>');
        xx1+=p1z;
        xx2+=p2z;

/*        redovi += Spacebars.SafeString( '<tr>'
        +'    <td style="text-align:left;"><strong>Ukupno</strong></td>'
        +'    <td><strong>'+xx1+'</strong></td>'
        +'    <td><strong>'+xx2+'</strong></td>'
        +'    <td>'+(xx1+xx2)+'</td>'
        +'</tr>');*/
        /*
         var xx3 = xx1+xx2;
         redovi += Spacebars.SafeString( '<tr>'
         +'    <td style="text-align:left;"><strong>Ukupno tiketa</strong></td>'
         +'    <td colspan="2" style="text-align:center;"><strong>'+xx3+'</strong></td>'
         +'</tr>');
         */
        return redovi;
    }
});




