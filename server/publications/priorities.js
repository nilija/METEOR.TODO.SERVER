/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/priorities.js
 * generated:     2014/11/27 14:45
 */

Meteor.publish('priorities', function () {
    return priorities.find();
});
Meteor.publish('prioritiesServicesId', function (servicesId) {
    var myDocument = priorities.find({'Services': servicesId});
    return myDocument;
});
Meteor.publish('prioritiesId', function (id) {
    var myDocument = priorities.find({'_id': id});
    return myDocument;
});
// End of generated file