/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/priorities.js
 * generated:     2014/11/27 14:45
 */

Router.route('/services',
    function() {
        this.wait(Meteor.subscribe('services'));
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);
// End of generated file