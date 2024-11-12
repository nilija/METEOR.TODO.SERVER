//usersAll = new Meteor.Collection('users');
usersAll = Meteor.users;
usersAll.allow({
    'insert': function () {
        return true;
    },
    'remove': function () {
        return true;
    },
    'update': function () {
        return true;
    }
});