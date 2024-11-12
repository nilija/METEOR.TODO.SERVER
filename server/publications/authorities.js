/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/authorities.js
 * generated:     2014/11/27 14:40
 */

Meteor.publish('authorities', function () {
    return authorities.find();
});
Meteor.publish("authoritiesId", function (id) {
    return authorities.find({'_id': id});
});
Meteor.publish("authoritiesOvlascenje", function (name) {
    return authorities.find({'Ovlascenje': name});
});
// End of generated file