Router.route('/activities',
    function () {
        this.wait(Meteor.subscribe('activities'));
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);