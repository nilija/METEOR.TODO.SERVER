/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/zones.js
 * generated:     2014/11/27 14:03
 */

Router.route('/zones',
    function() {
        this.wait(Meteor.subscribe('zones'));
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);
// End of generated file