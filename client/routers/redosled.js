Router.route('/redosled',
    function() {
        this.wait(

            Meteor.subscribe('activities'),
            Meteor.subscribe('services'),
//            Meteor.subscribe('zones'),
//            Meteor.subscribe('usersAll'),
            Meteor.subscribe('priorities'),
 //           Meteor.subscribe('interventions'),
 //           Meteor.subscribe('clients'),
 //           Meteor.subscribe('authorities'),
 //           Meteor.subscribe('tickets'),
            Meteor.subscribe('ticketsUR')

        );
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);