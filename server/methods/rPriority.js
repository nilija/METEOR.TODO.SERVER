Meteor.methods({
    "rPriorityChart1": function(Services, select, selectL, selectG) {
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

        var prioritiesAll = priorities.find({
            'Services': {$in: services_}
        }, {sort : {Services: 1, VremeOdziva: 1}});
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'},{_id: 1});
        var aktivnostP = activities.findOne({'Aktivnost': 'u postupku'},{_id: 1});
        var aktivnostO = activities.findOne({'Aktivnost': 'otvoren'},{_id: 1});
        var pZatvoreni,p2z,p3z,pOtvoreni,p2o,p3o,pUPostupku,p2p,p3p;
        var series_ = [];

        prioritiesAll.forEach(function (prioritet) {
            pZatvoreni = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id, "Aktivnost": aktivnostZ._id,'Komitent': {$regex: select}}).count();
            pUPostupku = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id, "Aktivnost": aktivnostP._id,'Komitent': {$regex: select}}).count();
            pOtvoreni = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id, "Aktivnost": aktivnostO._id,'Komitent': {$regex: select}}).count();
/*            series_.push(prioritet.Prioritet, prioritet.Services, selectG, select, selectL, pZatvoreni, pUPostupku, pOtvoreni);*/
            var service = services.find({_id: prioritet.Services}).fetch();
            var name = service[0].Servis + ' / ' + prioritet.Prioritet;
//            series_.push({'name': prioritet.Prioritet, 'data':  [pOtvoreni, pUPostupku, pZatvoreni]});
            series_.push({'name': name, 'data':  [pOtvoreni, pUPostupku, pZatvoreni]});
        });

        var ret = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Prioriteti po aktivnostima'
            },
            credits: {
                enabled: false
            },
            xAxis: {
 //               categories: ['P1 (4h / 8h)', 'P2 (Sledeci radni dan / 24h)', 'P3 (Ostalo)']
                categories: ['Otvoreni', 'U postupku', 'Zatvoreni']
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
                }//,
                //colors:
                //    ['0000ff', '#008000', '#ff0000']

            },
            series: series_
/*            series: [{
                name: 'P1 (4h / 8h)',
                data: [pOtvoreni, pUPostupku, pZatvoreni]
            }, {
                name: 'P2 (Sledeci radni dan / 24h)',
                data: [p2o, p2p, p2z]
            }, {
                name: 'P3 (Ostalo)',
                data: [p3o, p3p, p3z]
            }]*/
        };
        return ret;
    },
    "rPriorityChart2": function(Services, select, selectL, selectG) {
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

        var prioritiesAll = priorities.find({
            'Services': {$in: services_}
        }, {sort : {Services: 1, VremeOdziva: 1}});
        var pOtvoreni,p2o,p3o;
        var series_ = [];
        var data_ = [];
        prioritiesAll.forEach(function (prioritet) {
            pOtvoreni = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id,'Komitent': {$regex: select}}).count();
            var service = services.find({_id: prioritet.Services}).fetch();
            var name = service[0].Servis + ' / ' + prioritet.Prioritet;
//            series_.push({'name': prioritet.Prioritet, 'data':  [pOtvoreni, pUPostupku, pZatvoreni]});
//            series_.push({'name': name, 'data':  [pOtvoreni, pUPostupku, pZatvoreni]});
            data_.push([name, pOtvoreni]);
        });

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
                text: 'Odnos prioriteta ukupno'
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'//,
                        //style: {
                        //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        //}
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Od svih tiketa ',
                data : data_
/*                data: [
                    ['P1 (4h / 8h)',   p1],
                    ['P2 (Sledeci radni dan / 24h)',   p2],
                    ['P3 (Ostalo)',   p3]*/
/*                    {
                        name: 'P3 (Ostalo)',
                        y: p3,
                        sliced: true,
                        selected: true
                    }*/
 //               ]
            }]
        };
        return ret;
    },
    "rPriorityTabela": function(Services, select, selectL, selectG) {
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
        var prioritiesAll = priorities.find({
            'Services': {$in: services_}
        }, {sort : {Services: 1, VremeOdziva: 1}});

/*        var xxx = priorities.find().sort( { "Services": 1, "VremeOdziva": 1 } );
        console.log (xxx);*/
        var redovi = Spacebars.SafeString('');
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'},{_id: 1});
        var xx1 = 0;
        var xx2 = 0;

        prioritiesAll.forEach(function (prioritet) {
            var x1 = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id, "Aktivnost": aktivnostZ._id,'Komitent': {$regex: select}}).count();
            var x2 = tickets.find({'DatumOtvaranja' :{$regex: selectG}, 'Servis':{$in: services_}, "Prioritet": prioritet._id, "Aktivnost": { $ne: aktivnostZ._id },'Komitent': {$regex: select}}).count();
            xx1+=x1;
            xx2+=x2;
/*            var service = services.findOne({'_id': prioritet.Services});
            console.log (service.Servis);*/
            var service = services.find({_id: prioritet.Services}).fetch();
/*            console.log (service[0].Servis);*/
            redovi += Spacebars.SafeString( '<tr>'
                +'    <td style="text-align:left;">'+ service[0].Servis + ' / ' + prioritet.Prioritet+'</td>'
                +'    <td>'+x1+'</td>'
                +'    <td>'+x2+'</td>'
                +'    <td>'+(x1+x2)+'</td>'
                +'</tr>');
        });
        redovi += Spacebars.SafeString( '<tr>'
            +'    <td style="text-align:left;"><strong>Ukupno</strong></td>'
            +'    <td><strong>'+xx1+'</strong></td>'
            +'    <td><strong>'+xx2+'</strong></td>'
            +'    <td>'+(xx1+xx2)+'</td>'
            +'</tr>');
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




