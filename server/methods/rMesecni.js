Meteor.methods({
    "rMesecniChart1": function (Services, select, selectL, selectG) {
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
        var pZatvoreni, pOtvoreni;
        var series_ = [];
        var meseci = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var meseci_ = ['jan', 'feb', 'mart', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec', 'ukupno'];

        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'}, {_id: 1});
        var i = 0;
        var oData = [];
        var zData = [];
        var uOtvoreni = 0;
        var uZatvoreni = 0;
        meseci.forEach(function (mesec) {

            var string = selectG + '/' + mesec;
            var pOtvoreni = tickets.find({
                'DatumOtvaranja': {$regex: string},
                'Servis': {$in: services_},
                'Komitent': {$regex: select}
            }).count();
            var pZatvoreni = tickets.find({
                'DatumZatvaranja': {$regex: string},
                'Servis': {$in: services_},
                'Komitent': {$regex: select}
            }).count();
            i++;
            uOtvoreni += pOtvoreni;
            uZatvoreni += pZatvoreni;

            oData.push(pOtvoreni);
            zData.push(pZatvoreni);
        });
        oData.push(uOtvoreni);
        zData.push(uZatvoreni);

        series_.push({'name': 'otvoreni', 'data': oData}, {'name': 'zatvoreni', 'data': zData});

        var ret = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Odnos: otvoreni/zatvoreni po mesecima'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                //               categories: ['P1 (4h / 8h)', 'P2 (Sledeci radni dan / 24h)', 'P3 (Ostalo)']
                //               categories: ['Otvoreni', 'U postupku', 'Zatvoreni']
                categories: meseci_
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Ukupno tiketa (%)'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {


                    stacking: 'percent'


                    /*                  pointPadding: 0,
                     borderWidth: 0,
                     groupPadding: 0,
                     shadow: false
                     */
                }//,
                //colors:
                //    ['0000ff', '#008000', '#ff0000']

            },
            series: series_


//            series_
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
    "rMesecniChart2": function (Services, select, selectL, selectG) {
        var servis_id = [];
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
        });
        var pOtvoreni, pUkupno, p3o;
        var i = 0;
        var series_ = [];
        var data_ = [];
        var meseci = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var meseci_ = ['jan', 'feb', 'mart', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec', 'ukupno'];

        prioritiesAll.forEach(function (prioritet) {
            pUkupno = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services_},
                "Prioritet": prioritet._id,
                'Komitent': {$regex: select}
            }).count();
            /*            data_.push(pOtvoreni);*/

            var oData = [];
            meseci.forEach(function (mesec) {

                var string = selectG + '/' + mesec;
                var pOtvoreni = tickets.find({
                    'DatumOtvaranja': {$regex: string},
                    'Servis': {$in: services_},
                    "Prioritet": prioritet._id,
                    'Komitent': {$regex: select}
                }).count();
                oData.push(pOtvoreni);
            })
            oData.push(pUkupno);
            series_.push({'name': prioritet.Prioritet, 'data': oData});
        });

        /*        console.log (data_)
         console.log (series_);*/

        var ret = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Odnos: prioriteta po mesecima'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                //               categories: ['P1 (4h / 8h)', 'P2 (Sledeci radni dan / 24h)', 'P3 (Ostalo)']
                //               categories: ['Otvoreni', 'U postupku', 'Zatvoreni']
                categories: meseci_
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Ukupno tiketa (%)'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {


                    stacking: 'percent'


                    /*                  pointPadding: 0,
                     borderWidth: 0,
                     groupPadding: 0,
                     shadow: false
                     */
                }//,
                //colors:
                //    ['0000ff', '#008000', '#ff0000']

            },
            series: series_


//            series_
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
    "rMesecniChart3": function (Services, select, selectL, selectG) {
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
        });
        var pOtvoreni, p2o, p3o;
        var series_ = [];
        var data_ = [];
        prioritiesAll.forEach(function (prioritet) {
            pOtvoreni = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services_},
                "Prioritet": prioritet._id,
                'Komitent': {$regex: select}
            }).count();
            data_.push([prioritet.Prioritet, pOtvoreni]);
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
                data: data_
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
    "rMesecniTabela": function (Services, select, selectL, selectG) {
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
        var meseci = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var meseci_ = ['jan', 'feb', 'mart', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];

        /*        var xxx = priorities.find().sort( { "Services": 1, "VremeOdziva": 1 } );
         console.log (xxx);*/
        var redovi = Spacebars.SafeString('');
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'}, {_id: 1});
        var xx1 = 0;
        var xx2 = 0;
        var i = 0;

        meseci.forEach(function (mesec) {

            var string = selectG + '/' + mesec;
            var x1 = tickets.find({
                'DatumOtvaranja': {$regex: string},
                'Servis': {$in: services_},
                'Komitent': {$regex: select}
            }).count();
            var x2 = tickets.find({
                'DatumZatvaranja': {$regex: string},
                'Servis': {$in: services_},
                'Komitent': {$regex: select}
            }).count();
/*            console.log(string);*/
            xx1 += x1;
            xx2 += x2;

            redovi += Spacebars.SafeString('<tr>'
                /*              +'    <td style="text-align:left;">'+ mesec + ' / ' + prioritet.Prioritet+'</td>'*/
                + '    <td style="text-align:left;">' + meseci_[i] + '</td>'
                + '    <td>' + x1 + '</td>'
                + '    <td>' + x2 + '</td>'
                + '    <td>' + (x1 - x2) + '</td>'
                + '</tr>');
            i++;
        });
        redovi += Spacebars.SafeString('<tr>'
            + '    <td style="text-align:left;"><strong>Ukupno</strong></td>'
            + '    <td><strong>' + xx1 + '</strong></td>'
            + '    <td><strong>' + xx2 + '</strong></td>'
            + '    <td>' + (xx1 - xx2) + '</td>'
            + '</tr>');
        /*
         var xx3 = xx1+xx2;
         redovi += Spacebars.SafeString( '<tr>'
         +'    <td style="text-align:left;"><strong>Ukupno tiketa</strong></td>'
         +'    <td colspan="2" style="text-align:center;"><strong>'+xx3+'</strong></td>'
         +'</tr>');
         */
        return redovi;
    },
    "rProsekZatvaranja": function (Services, select, selectL, selectG) {
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
        var aktivnostZ = activities.findOne({'Aktivnost': 'zatvoren'},{_id: 1});
        var aktivnostP = activities.findOne({'Aktivnost': 'u postupku'},{_id: 1});
        var aktivnostO = activities.findOne({'Aktivnost': 'otvoren'},{_id: 1});
        var pZatvoreni,p2z,p3z,pOtvoreni,p2o,p3o,pUPostupku,p2p,p3p;
        var xx1 = 0;
        var xx2 = 0;
        var xx3 = 0;
        var sumS = 0;
        var ii = 0;
        var prosek = 0;
        var prioritiesAll = priorities.find({
            'Services': {$in: services_}
        });

        var redovi = Spacebars.SafeString('');
        prioritiesAll.forEach(function (prioritet) {

            pOtvoreni = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services_},
                "Prioritet": prioritet._id,
                "Aktivnost": aktivnostO._id,
                'Komitent': {$regex: select}
            }).count();
            pUPostupku = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services_},
                "Prioritet": prioritet._id,
                "Aktivnost": aktivnostP._id,
                'Komitent': {$regex: select}
            }).count();
            pZatvoreni = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                'Servis': {$in: services_},
                "Prioritet": prioritet._id,
                "Aktivnost": aktivnostZ._id,
                'Komitent': {$regex: select}
            }).count();

            var result = tickets.find({
                'DatumOtvaranja': {$regex: selectG},
                "Servis": {$in: services_},
                "Prioritet": prioritet._id,
                "Aktivnost": aktivnostZ._id,
                "Komitent": {$regex: select}

            });
            var today = new Date(Date.now());
            var minut_ms = (1000 * 60);
            var sat_ms = (1000 * 60 * 60);
            var sum = 0;
            var i = 0;

            result.forEach(function (result) {
//                var beforeDays = new Date(Date.now() - 1000 * 3600 * 24 * 7);

                var is_Weekend = 0;
                var hours = 0;
                if (result.DatumZatvaranja > ' ') {

                    var datum = result.DatumOtvaranja.split(",");
                    var from = datum[0].split("/");
                    var vreme = datum[1].split(":");
                    hours = parseInt(vreme[0]);
                    var minutes = vreme[1];
//                                                                              if date is in 28-08-2012 format
                    var fDatumOtvaranja = new Date(from[0], from[1] - 1, from[2]).getTime();
                    fDatumOtvaranja += (minutes) * minut_ms + (hours) * sat_ms;
                    /*            fDatumOtvaranja = new Date(fDatumZatvaranja);*/

                    var datum = result.DatumZatvaranja.split(",");

                    var from = datum[0].split("/");
                    var vreme = datum[1].split(":");
                    hours = parseInt(vreme[0]);
                    var minutes = vreme[1];

//                                                                              if date is in 28-08-2012 format
                    var fDatumZatvaranja = new Date(from[0], from[1] - 1, from[2]).getTime();
                    fDatumZatvaranja += (minutes) * minut_ms + (hours) * sat_ms;
                    /*            fDatumZatvaranja = new Date(fDatumZatvaranja);*/
                    var vremeZatvaranja = fDatumZatvaranja - fDatumOtvaranja;
                    sum += vremeZatvaranja;
                    i++;
                    ii++;
                }

            })
            if (sum > 0) {
                var prosek_ = (sum / i);
 /*
                var d = new Date();
                var d = new Date(milliseconds);
                var d = new Date(dateString);
                var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
*/
                prosek = destructMS(prosek_)
/*                $.each(ids, function(index, value) {
                    alert(index + ': ' + value);
                });*/
/*                    + dateStr.getMinutes() + 'Minutes '
                    + dateStr.getSeconds() + 'Seconds'*/
                sumS += sum;
            }
            else
                prosek = '--';
/*
            var milliseconds = 1000000000000;
            var dateStr = new Date(milliseconds);
            var humanreadableStr = dateStr.getDay() +'Days '+dateStr.getHours() +'Hours '+dateStr.getMinutes() +'Minutes '+dateStr.getSeconds() +'Seconds';
*/
            var service = services.find({_id: prioritet.Services}).fetch();
            redovi += Spacebars.SafeString('<tr>'
                /*              +'    <td style="text-align:left;">'+ mesec + ' / ' + prioritet.Prioritet+'</td>'*/
                +'    <td style="text-align:left;">'+ service[0].Servis + ' / ' + prioritet.Prioritet+'</td>'
                + '    <td>' + pOtvoreni + '</td>'
                + '    <td>' + pZatvoreni + '</td>'
                + '    <td>' + pUPostupku + '</td>'
                + '    <td>' + prosek + '</td>'
                + '</tr>');
            i++;
/*            console.log (redovi);*/
            xx1+=pOtvoreni;
            xx2+=pZatvoreni;
            xx3+=pUPostupku;


        })
        var prosek_ = (sumS / ii);
        prosek = destructMS(prosek_)

        redovi += Spacebars.SafeString('<tr>'
            + '    <td style="text-align:left;"><strong>Ukupnoo</strong></td>'
            + '    <td>' + xx1 + '</td>'
            + '    <td>' + xx2 + '</td>'
            + '    <td>' + xx3 + '</td>'
            + '    <td>' + prosek + '</td>'
            + '</tr>');
        return redovi;
    }
})

function destructMS(milli) {
    if (isNaN(milli) || milli < 0) {
        return null;
    }
    var prosek = '';
    var d, h, m, s, ms;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    ms = Math.floor((milli % 1000) * 1000) / 1000;
    prosek +=  d + ' : ' + h + ' : ' + m;
    return prosek;
/*
    return { d: d, h: h, m: m, s: s, ms: ms };
*/
}

/*·       Na mesecnom nivou komparacija otvorenih I zatvorenih tiketa – mesecno  I kumulativno Ako su to dve “ pitice” onda je ok.
·         Odnos prioriteta – mesecno I kumulativno “Opet pitice”
·
·         Prosecno vreme zatvaranja tiketa  (prosecno vreme izmedju zatvaranja I otvaranja tiketa) – po prioritetima */
