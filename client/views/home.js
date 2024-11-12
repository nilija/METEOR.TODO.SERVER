Template.home.events({
    'submit #login-form' : function(e, tHome){
        e.preventDefault();
        // retrieve the input field values
        var username = tHome.find('#inputUsername').value;
        var password = tHome.find('#inputPassword').value;
        // Trim and validate your fields here....
        username = trimInput(username);
        console.log('tHome logovanje ?');
        console.log(username);
        console.log('____________');
        if (isValidPassword(password)) {
            Meteor.loginWithPassword(username, password, function(err){
                if (err) {
                    // The user might not have been found, or their passwword
                    // could be incorrect. Inform the user that their
                    // login attempt has failed.
                    tHome.find('#errorText').innerHTML = '<strong>Greška u prijavi!</strong>';
                } else {
                    Router.go('/dashboard');
                }
            });
        }
        return false;
    }
});

// trim helper
var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
}
// provera passworda na duzinu
var isValidPassword = function(val) {
    return val.length >= 3 ? true : false;
}
//
Template.home.rendered = function() {
    if (Meteor.userId()){
        Router.go('/dashboard');
    }
}