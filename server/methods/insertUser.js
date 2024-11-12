Meteor.methods({
    insertUser: function(username, email, prof) {
        var pass = 'fratello';
        Accounts.createUser({
            username : username,
            password : pass,
            email : email,
            profile : prof
        });
    }
});