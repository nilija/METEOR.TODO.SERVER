/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/tickets.js
 * generated:     2014/11/27 14:50
 */

Meteor.publish('tickets', function (ServicesID, ovlascenje, zaduzen, userID, client, clients) {
/*    console.log (typeof Services);
    console.log (ovlascenje);
    var start = +new Date();*/
    var servicesID = ServicesID;
    var ovlascenje = ovlascenje;
    var length = 0;
//    if (typeof Services != 'undefined' && Services) {
    if (ovlascenje && servicesID) {

/*        var Services = Services.split(",");
        length = Services.length;

        var services_ = services.find();
        var arr_services = [];
        services_.forEach(function (post) {
            var found = false;
            for (var i = 0; i < length; i++) {
                if (post.Servis === Services[i]) {
                    arr_services.push(post._id)
                }
            }
        })
        var servicesID = servicesID;*/

        var servicesID = servicesID.split(",");
        var godine_ = years.find({checked: true});
        var godine = [];
        godine_.forEach(function (e) {
            godine.push(e.Year);
        });
        console.log('godine: ' + godine);
//        console.log(servicesID);
        aktivnost = [];
        var x = activities.find({'Aktivnost': 'otvoren'}).fetch();
        aktivnost.push(x[0]._id);
        x = activities.find({'Aktivnost': 'u postupku'}).fetch();
        aktivnost.push(x[0]._id);
        /*
         console.log (tickets.find({ $or: [ {"Year" :{$in: godine}}, {"Aktivnost": {$in: aktivnost}} ] }).count());
         console.log (tickets.find({ "Servis": {$in: servicesID}, $or: [ {"Year" :{$in: godine}}, {"Aktivnost": {$in: aktivnost}} ] }).count());
         */

/*        var tisketst = tickets.find({
            "Servis": {$in: servicesID},
            $or: [{"Year": {$in: godine}},
                {"Aktivnost": {$in: aktivnost}}]
        });*/

        if (ovlascenje == 'admin')
            return tickets.find({"Servis": {$in: servicesID},
                $or: [{"Year": {$in: godine}},
                     {"Aktivnost": {$in: aktivnost}}]
        });

        if (ovlascenje == 'user') {
            var zaduzen = zaduzen;
            return tickets.find({
                "Servis": {$in: servicesID},
                $and: [
                    {
                        $or: [{"Year": {$in: godine}},
                            {"Aktivnost": {$in: aktivnost}}]
                    },
                    {
                        $or: [{"Zaduzen": {$regex: zaduzen}},
                            {"Zaduzen": {$regex: "---"}}]
                    }
                ]
            });
        }

        if (ovlascenje == 'clientUser') {
            var userID = userID;
            var client = client;
            return tickets.find({
                "Servis": {$in: servicesID},
                $and: [
                    {
                        $or: [{"Year": {$in: godine}},
                            {"Aktivnost": {$in: aktivnost}}]
                    },
                    {
                        $or: [{"TiketOtvorio": userID},
                            {"Komitent": client}]
                    }
                ]
            });
        }

        if (ovlascenje == 'clientSuperUser') {
            var userID = userID;
            var clients = clients;
            return tickets.find({
                "Servis": {$in: servicesID},
                $and: [
                    {
                        $or: [{"Year": {$in: godine}},
                            {"Aktivnost": {$in: aktivnost}}]
                    },
                    {

                        $or: [{"TiketOtvorio": userID},
                            {"Komitent": {$in: clients}}]
                    }
                ]
            });
        }

/*        var end = +new Date();
        console.log("all users saved in " + (end - start) + " milliseconds");*/
    }
});

Meteor.publish('ticketsG', function (godina) {
    console.log (godina);
    return tickets.find({"DatumOtvaranja" :{$regex: godina}}, {});
});

Meteor.publish('ticketsUR', function () {
    aktivnost = [];
    var x = activities.find({'Aktivnost':'otvoren'}).fetch();
    aktivnost.push(x[0]._id);
    x = activities.find({'Aktivnost':'u postupku'}).fetch();
    aktivnost.push(x[0]._id);
    //    console.log(akt);
    return tickets.find({"Aktivnost": {$in: aktivnost}}, {sort: {ToDo: 1}});
});

Meteor.publish('ticketsZ', function () {
    aktivnost = [];
    var x = activities.find({'Aktivnost':'zatvoren'}).fetch();
    aktivnost.push(x[0]._id);

    return tickets.find({"Aktivnost": aktivnost}, {sort: {RBR: 1}});
});

Meteor.publish("userData", function () {
    return tickets.find({TicketOtvorio: this.userId});
});
Meteor.publish("rbr", function () {
    return tickets.find();
});
// End of generated file
