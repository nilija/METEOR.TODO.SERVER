
Router.configure({
    notFoundTemplate: 'home',
    loadingTemplate: 'loading'
});

Router.onBeforeAction(function() {
    //console.log(Router.current().route.getName());

    if (! Meteor.userId()) {
        this.layout('preDashboardLayout');
        this.render('home');
    } else {
        if(!Session.get('userID')) {
            var usr = Meteor.user();
//            console.log(usr);
            if(usr) {
                
                Session.set('aktivnost', 'nista');
                Session.set('zaZaduzen', usr.profile.zaZaduzen);
                Session.set('ImePrezime', usr.profile.ImePrezime);
                Session.set('Services', usr.profile.Services);
                Session.set('ServicesId', usr.profile.ServicesId);
                Session.set('username', usr.username);
                Session.set('userID', usr._id);

                var lokacija = [];
                if (usr.profile.Komitent.length > 0)
                {
                    Session.set('Client', usr.profile.Komitent);
                    var fruits = usr.profile.Komitent.split(',');
                    Session.set('Clients', fruits);
                    var fruit = [];
                    for (var i = 0; i < fruits.length; i++) {
                        fruit.push(fruits[i].split('\\'));
                        if ((fruit[i][1]) != undefined)
                            lokacija.push(fruit[i][1].substr(1));
                        //                       lokacija.push(fruit[i][1].substr(1,fruit[i][1].length-2));
                    }
                }
                Session.set('Lokacije', lokacija);

                if(usr.profile.Ovlascenje == '5269538f83a16aee67cffc73') {
                    Session.set('isAdmin', true);
                    Session.set('ovlascenje', 'admin');
                }
                else
                if(usr.profile.Ovlascenje == '5269538f83a16aee67cffc74') {
                    Session.set('isClientSuperUser', true);
                    Session.set('ovlascenje', 'clientSuperUser');
                }
                else
                if(usr.profile.Ovlascenje == '5269538f83a16aee67cffc75') {
                    Session.set('isUser', true);
                    Session.set('ovlascenje', 'user');
                }
                else {
                    Session.set('isClientUser', true);
                    Session.set('ovlascenje', 'clientUser');
                }
                if(usr.profile.Zaduzenja) {
                    Session.set('isZaduzenja', true);
                }
                if(usr.profile.Izvestaji) {
                    Session.set('isIzvestaji', true);
                }
            }
        }
        this.layout('dashboardLayout');
        this.next();
    }
});
