/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      server/publications/years.js
 * generated:     2014/11/27 14:03
 */

Meteor.publish('images', function () {
    return images.find();
});
// End of generated file