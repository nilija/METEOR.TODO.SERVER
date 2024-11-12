/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/tickets.js
 * generated:     2014/11/27 14:50
 */

Router.route('/tickets',
    function() {
/*        var start = +new Date();*/
        this.wait(
            Meteor.subscribe('activities'),
            Meteor.subscribe('services'),
            Meteor.subscribe('usersAll'),
            Meteor.subscribe('priorities'),
            Meteor.subscribe('interventions'),
            Meteor.subscribe('clients'),
            Meteor.subscribe('authorities'),
            Meteor.subscribe('zones'),
            Meteor.subscribe('tickets', 
                Session.get('ServicesId'), 
                Session.get('ovlascenje'), 
                Session.get("zaZaduzen"), 
                Session.get('userID'),
                Session.get("Client"),
                Session.get("Clients")
            ),
            Meteor.subscribe('images')
        );
        if (this.ready()) {
//            var tickets_ = tickets.find().count();
//            var rbr_ = rbr.find().count();
/*            var tickets_ = tickets.find().count();
//            var zones_ = zones.find().count();
            var authorities_ = authorities.find().count();
            var clients_ = clients.find().count();
            var interventions_ = interventions.find().count();
            var priorities_ = priorities.find().count();
            var usersAll_ = usersAll.find().count();
            var services_ = services.find().count();
            var activities_ = activities.find().count();
            console.log(tickets_);*/
//            console.log('*********************************************');
/*            console.log(tickets_);
            console.log(zones_);
            console.log(authorities_);
            console.log(clients_);
            console.log(interventions_);
            console.log(priorities_);
            console.log(usersAll_);
            console.log(services_);
            console.log(activities_);*/
//            console.log(tickets_);
//            console.log(rbr_);

            this.render();
/*            var end = +new Date();
            console.log("all users subscribe " + (end-start) + " milliseconds");*/
        } else {
            this.render('loading');
        }
    }
);

// End of generated file