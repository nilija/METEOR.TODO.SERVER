/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/routers/authorities.js
 * generated:     2014/11/27 14:40
 */

Router.route('/authorities',
    function() {
        this.wait(Meteor.subscribe('authorities'));
        if (this.ready()) {
            this.render();
        } else {
            this.render('loading');
        }
    }
);
// End of generated file