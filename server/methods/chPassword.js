Meteor.methods({
    chPassword: function(userID, password) {
        //console.log(userID+' '+password);
        //var err =  Accounts.setPassword(userID, password);
        //console.log(err);
        //if(){
        //    return 'ok';
        //} else {
        //    return 'no';
        //}
        Accounts.setPassword(userID, password);
    }
});