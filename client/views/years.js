/**
 * Created by ilija on 14.3.15..
 */
    Template.years.helpers({
        years: function () {
            return years.find({}, {sort: {createdAt: -1}});
        },
        checkedCount: function () {
            return years.find({checked: true}).count();
        }
    });

    Template.years.events({
        "submit .new-year": function (event) {
            // This function is called when the new year form is submitted
            var godina = event.target.godina.value;
            years.insert({
                Year: godina,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.godina.value = "";

            // Prevent default form submit
            return false;
        }
    });

    Template.year.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            years.update(this._id, {$set: {checked: ! this.checked}});
        },
        "click .delete": function () {
            years.remove(this._id);
        }
    });

