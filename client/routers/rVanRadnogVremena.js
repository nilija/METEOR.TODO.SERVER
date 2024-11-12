Router.route('/rVanRadnogVremena',
    function() {
        this.wait(
            //Meteor.subscribe('zones'),
            //Meteor.subscribe('users'),
            //Meteor.subscribe('priorities'),
            //Meteor.subscribe('interventions'),
            Meteor.subscribe('clients'),
            Meteor.subscribe('services'),
            //Meteor.subscribe('authorities'),
            //Meteor.subscribe('activities'),
            Meteor.subscribe('years'),
            Meteor.subscribe('r_tickets', Session.get('Services'))
            //Meteor.call("tiketaP1", function (error, result) {
            //    console.log("err ", error);
            //    console.log("res ", result);
            //})
        );
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);