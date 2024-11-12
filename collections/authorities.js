/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      collections/authorities.js
 * generated:     2014/11/27 14:40
 */

authorities = new Meteor.Collection('_authorities');
authorities.allow({
    'insert': function() {
        return true;
    },
    'remove': function() {
        return true;
    },
    'update': function() {
        return true;
    }
});
// End of generated file