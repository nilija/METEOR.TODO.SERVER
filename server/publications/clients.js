/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/clients.js
 * generated:     2014/11/27 14:49
 */

Meteor.publish('clients', function () {
    return clients.find();
});
Meteor.publish('clientsId', function (id) {
    return clients.find({'_id': id});
});
// End of generated file