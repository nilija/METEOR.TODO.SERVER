Meteor.publish("activities", function () {
    return activities.find();
});
Meteor.publish("activitiesId", function (id) {
    return activities.find({'_id': id});
});
Meteor.publish("activitiesName", function (name) {
    return activities.find({'Aktivnost': name});
});