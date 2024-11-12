//Meteor.publish('thisNameDoesNotMatter', function () {
//    var self = this;
//    var handle = Meteor.users.find({}, {
//        fields: {username: 1, emails: 1, profile: 1}
//    }).observeChanges({
//        added: function (id, fields) {
//            self.added('users', id, fields);
//        },
//        changed: function (id, fields) {
//            self.changed('users', id, fields);
//        },
//        removed: function (id) {
//            self.removed('users', id);
//        }
//    });
//
//    self.ready();
//
//    self.onStop(function () {
//        handle.stop();
//    });
//
//});

Meteor.publish("usersAll", function () {
    // Publikacija samo za logovane korisnike
    if (this.userId) {
        //return Meteor.users.find({_id: this.userId});
        // ako se zele svi useri na client strani
        return Meteor.users.find();
    } else {
        this.ready();
    }
});
