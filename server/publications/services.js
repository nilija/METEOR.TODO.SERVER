/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/priorities.js
 * generated:     2014/11/27 14:45
 */

Meteor.publish('services', function () {
    return services.find();
});
// End of generated file