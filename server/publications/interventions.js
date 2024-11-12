/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/interventions.js
 * generated:     2014/11/27 14:42
 */

Meteor.publish('interventions', function () {
    return interventions.find();
});
Meteor.publish('interventionsName', function (name) {
    return interventions.find({'Intervencija': name});
});
// End of generated file