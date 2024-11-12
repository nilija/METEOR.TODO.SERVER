Template.rInterventions.helpers({
    clients: function() {
        return clients.find().fetch();
    },
    imaS: function () {
        var komitent = Session.get("selected");
//        console.log (komitent);
//        console.log (Session.get('Services'));
        var Services = Session.get("Services")
        var services = Services.split(",");
//        console.log (services.length);
        if (services.length > 1)
//        if (komitent == "Nicefood's Restorani d.o.o.")
            return true;
        else
            return false;
    },
    imaL: function () {
        var komitent = Session.get("selected");
        var count = clients.find({"Komitent":komitent}).count();
        if (count > 1)
//        if (komitent == "Nicefood's Restorani d.o.o.")
            return true;
        else
            return false;
    },
    modalIzbor: function() {
        return Spacebars.SafeString(
           "<table id='tableAdd' style='width: 100%'>" +
            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+selectClientsFirst()+"</td>" +
            "</tr>" +
            "</table>"+
            "<br style='clear: both;' />");
        },
    modalIzborL: function() {
        return Spacebars.SafeString(
            "<table id='tableAdd' style='width: 100%'>" +
            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Lokacije'>Lokacija:</label>"+selectLokacijeFirst()+"</td>" +
            "</tr>" +
            "</table>"+
            "<br style='clear: both;' />");
    },
    modalIzborG: function() {
        return Spacebars.SafeString(
            "<table id='tableAdd' style='width: 100%'>" +
            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Godina'>Godina:</label>"+selectGodineFirst()+"</td>" +
            "</tr>" +
            "</table>"+
            "<br style='clear: both;' />");
    },
    modalIzborS: function() {
        return Spacebars.SafeString(
            "<table id='tableAdd' style='width: 100%'>" +
            "<tr><td style='width: 10%;text-align: left;padding-top: -5px;'><label for='m_Services'>Servis:</label>" + selectServicesFirst() + "</td>" +
            "</tr>" +
            "</table>"+
            "<br style='clear: both;' />");
    }
});

Template.rInterventions.events({

    'change select':function() {
        //console.log($('#m_KorisniciX1').val());
        //console.log('Komitent '+$('#m_KorisniciX1>option:selected').html());
        //Session.set("selected", $('#m_KorisniciX1>option:selected').html());
        Session.set("selectedS", $('#m_Services').val());
        Session.set("selected", $('#m_KorisniciX1').val());
        Session.set("selectedL", $('#m_Lokacija').val());
        Session.set("selectedG", $('#m_GodineX1').val());
//        console.log ($('#m_Services').val());
        reRenderReport();
    }

});
Template.rInterventions.rendered = function() {
    Session.set("selectedS", ' ');
    Session.set("selected", ' ');
    Session.set("selectedL", ' ');
    Session.set("selectedG", '/');
    reRenderReport();
}

function reRenderReport() {
    // Tabela
    var Services = '';
    if (Session.get("selectedS") && (Session.get("selectedS").length > 1 ))
        Services = Session.get("selectedS")
    else
        Services = Session.get("Services");
    var services = Services.split(",");
    var Services_id = [];
    services.forEach(function (services) {
        var service_id = getService(services);
        Services_id.push (service_id);
    })
    Meteor.call("rInterventionsTabela", Services_id, Session.get("selected"), Session.get("selectedL"), Session.get("selectedG"), function (error, result) {
        $('#tabelica').html(result);
    });
    // Chart 1
    Meteor.call("rInterventionsChart1", Session.get("Services"), Session.get("selected"), Session.get("selectedL"), Session.get("selectedG"), function (error, result) {
        //console.log(error);
        //console.log(result);
        $('#chart1Container').highcharts(result);
    });
    // Chart 2
    Meteor.call("rInterventionsChart2", Services_id, Session.get("selected"), Session.get("selectedL"), Session.get("selectedG"), function (error, result) {
        //console.log(error);
        //console.log(result);
        $('#chart2Container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 1,//null,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Završeni tiketi po tipu intervencije'
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Od svih tiketa ',
                data: result
            }]
        });
    });
}

function selectClientsFirst() {
    //console.log('selectClientsFirst');
    if (Session.get('Lokacije').length == 0)
//    if (!Session.get('isClientUser') && !Session.get('isClientSuperUser'))
        var client = clients.find({},{sort: { "Komitent": 1 }});
    else {
//    if (Session.get('isClientSuperUser')){
//        console.log (Session.get('Lokacije'));
        var client = clients.find({Lokacija: { $in: Session.get('Lokacije')}},{sort: {"Komitent": 1 }});
    }

    var s = '<select id="m_KorisniciX1" class="form-control selectpicker show-tick" style="">';
    s += '<option value="' + " " + '" selected="selected">' + "Ukupno" + '</option>';
    var r = [];

    client.forEach(function(e) {
        r.push(e.Komitent);
    });
    //console.log(r.length);
    for (i = 0; i < r.length; ++i) {

        if (r [i]!== r[i-1])
        {
            s += '<option value="' + r[i] + '">' + r[i] + '</option>';
        }

    }
    s += '</select>';
//    console.log(s+xx+sEnd);
    return s;
}

function selectLokacijeFirst() {
    var komitent = Session.get("selected");
//    var komitent = "Nicefood's Restorani d.o.o.";
    if (typeof komitent != 'undefined' && komitent && komitent > ' ') {

        var client = clients.find({"Komitent": komitent}, {sort: {"Komitent": 1, "Lokacija": 1}});
        var count = 1;
        var s = '<select id="m_Lokacija" class="form-control selectpicker show-tick" style="height: 28px;">';
        var sEnd = '</select>';
//    if (!Session.get('isClientUser')){
        client.forEach(function (post) {
            if (count == 1) {
                s += '<option value="' + " " + '" selected="selected">' + "Ukupno" + '</option>';
                count++;
            }
            else
                s += '<option value="' + post.Komitent + ' \\\\ ' + post.Lokacija + '">' + post.Komitent + ' \\ ' + post.Lokacija + '</option>';
        });

        return s + sEnd;
    }
}

function selectGodineFirst() {
    //console.log('selectClientsFirst');
    var datum = years.find({},{sort: { "Year": 1 }});
    var r = [];
    god = [];
    datum.forEach(function(e) {
//        r.push(e.DatumOtvaranja.substr(0,4));
        r.push(e.Year);
    });
//    console.log(r.length);
    for (i = 0; i < r.length; ++i) {
        if (r [i]!== r[i-1])
        {
            god.push(r[i]);
        }
    }
    var s = '<select id="m_GodineX1" class="form-control selectpicker show-tick" style="">';
    s += '<option value="' + "/" + '" selected="selected">' + "Ukupno" + '</option>';

    for (i = 0; i < god.length; ++i) {
        s += '<option value="' + god[i] + '">' + god[i] + '</option>';
    }
    s += '</select>';
//
    return s;
}

function selectServicesFirst() {
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
        length = Services.length;
    }

    var services_ = services.find();

    /*    var services_ = [
     {_id:"DQxBAvHGSvaXBrNfp", Servis:"DA Fratello"},
     {_id:"faZekZ7ZrsTTieKkR", Servis:"MOOD Media"}
     ]*/
    var count = 0;
    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="">';
    s += '<option value="' + "/" + '" selected="selected">' + "Ukupno" + '</option>';
    var sEnd = '</select>';

    services_.forEach(function (post) {
        s += '<option value="' + post.Servis + '">' + post.Servis + '</option>';
    });
    return s+sEnd;
}

function getService(name) {
    var service = services.find({'Servis': name}).fetch();
    return service[0]._id;
}
