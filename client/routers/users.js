/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/users.js
 * generated:     2014/12/17 13:31
 */

Router.route('/users',
    function() {
        this.wait(
            Meteor.subscribe('usersAll'),
            Meteor.subscribe('authorities'),
            Meteor.subscribe('clients'),
            Meteor.subscribe('services')
        );
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);
// End of generated file