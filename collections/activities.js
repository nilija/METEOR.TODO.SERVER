activities = new Meteor.Collection("_activities");
activities.allow({
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
