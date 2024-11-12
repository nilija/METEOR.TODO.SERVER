/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/interventions.js
 * generated:     2014/11/27 14:42
 */

Router.route('/interventions',
    function() {
        this.wait(Meteor.subscribe('interventions'));
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);
// End of generated file