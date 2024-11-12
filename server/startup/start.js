Meteor.startup(function () {
    // code to run on server at startup

    // inicijalno kreiranje novih kolekcija
    // izrsiti ovu funkciju samo kada nema novih kolekcija u bazi!!!
    // nakon toga je komentarisati!!!!

//     initialMigrationFratello();
/*    var assetPath = 'private';
    console.log(Assets.absoluteFilePath(assetPath));*/
    var rose = JSON.parse(Assets.getText('companions/rose.json'));
    var martha = JSON.parse(Assets.getText('public/companions/martha.json'));
    var companions = [rose, martha];
    console.log(companions);
    const rd = process.env.PWD;
    console.log(rd);
    var fs = Npm.require('fs');
//    const obj = JSON.parse(fs.readFileSync('${rd}/private/file.json'));

/*    const release = fs.readFileSync(rd + '/.meteor/release', 'utf8');
    console.log(release.substring(7));*/
//    console.log(Assets.getText(rd + '/.meteor/release'));

/*    if (version.find().count() > 0){
        version.remove({});
    }*/
//    version.insert(JSON.parse(Assets.getText("version.json")));
    
    
//    var fs = require("fs");
/*    var fs = Npm.require('fs');
    var rootDir = process.cwd() + '/assets/app/';
    var fileName = new Date().getTime() + '.vcf';
    var filePath = rootDir + fileName;
    fs.writeFileSync(filePath, 'binary');
    var filePath = rootDir + fileName; // see above
    var data = fs.readFileSync(filePath);
    this.response.writeHead(200, {
 'Cache-Control': 'private, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0',
    'Content-Type': 'text/x-vcard',
    'Content-Disposition': 'attachment; fileName= “' + fileName + '”;'
});
    this.response.write(data);
    this.response.end();
    console.log (filepath);
    _.each(companions, function(companion) {
        // replace this with something like Companions.insert(companion);
        console.log(companion);
    });
    */
//**********************************************************************************************************************
    var Services ='';
    var ServicesId ='';
    var i = 0;
    var services_ = services.find();
    services_.forEach(function (post) {
        if (post.Servis === 'DA Fratello') {
            id  = post._id;
        }
        i++;
        if (i == 1) {
            Services += post.Servis;
            ServicesId += post._id;
        }
        else {
            Services += ',' + post.Servis;
            ServicesId += ',' + post._id;
        }
    });

    Services = Services.split(",");
    var length_S = Services.length;
    ServicesId = ServicesId.split(",");

    var users_ = Meteor.users.find();
    users_.forEach(function (post) {

        var id = post._id;
        var prof_Services = post.profile.Services.split(",");
        var length_U = prof_Services.length;
        var ServicesId_U ='';
        for (var i = 0; i < length_U; i++) {

            for (var j = 0; j < length_S; j++) {
                if (prof_Services[i] === Services[j])
                    if (i == 0) {
                        ServicesId_U += ServicesId[j];
                    }
                    else {
                        ServicesId_U += ',' + ServicesId[j];
                    }
            }
            Meteor.users.update(
                {'_id': id},
                {$set: {'profile.ServicesId': ServicesId_U}}
            );
        }
    });

//**********************************************************************************************************************
/*    var services_ = services.find();
    services_.forEach(function (post) {
        if (post.Servis === 'DA Fratello') {
                id  = post._id;
            }
    });
    console.log('id - '+ id);
    xx = tickets.find({ 'Servis': {$in: [null, false]}}).count();
    console.log('DA Fratello - Servis tiketa - '+ xx);
    aa = tickets.find({ 'Servis': {$in: [null, false]}});
    aa.forEach(function(row) {
//        console.log(row._id)
    tickets.update({_id:row._id}, { $set: { Servis: id} });
    });
    console.log ('=====================');

    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc76"}).count();
    console.log (xx);
    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc76"});
    xx.forEach(function(row) {
//        console.log(row._id)
        tickets.update({_id:row._id}, { $set: { Prioritet: "aokXW8csAYxKRvxfv"} });
    });

    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc77"}).count();
    console.log (xx);
    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc77"});
    xx.forEach(function(row) {
//        console.log(row._id)
        tickets.update({_id:row._id}, { $set: { Prioritet: "T5hD7twhKYGymzrER"} });
    });

    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc78"}).count();
    console.log (xx);
    xx = tickets.find({ "Servis" : "Rjbz3Dogj9fedDor7", "Prioritet" : "5269538f83a16aee67cffc78"});
    xx.forEach(function(row) {
//        console.log(row._id)
        tickets.update({_id:row._id}, { $set: { Prioritet: "ymE9eoxgbXnCxnjKx"} });
    });
    console.log ('=====================');
    
    var prioritet = ["aokXW8csAYxKRvxfv", "T5hD7twhKYGymzrER", "ymE9eoxgbXnCxnjKx"];
    xx = tickets.find({ $and: [{"Servis" : "Rjbz3Dogj9fedDor7"}, {"Prioritet" : {$nin:  prioritet}}]}).count();
    console.log (xx);
    xx = tickets.find({ $and: [{"Servis" : "Rjbz3Dogj9fedDor7"}, {"Prioritet" : {$nin:  prioritet}}]});
    xx.forEach(function(row) {
        console.log(row.Prioritet)
        tickets.update({_id:row._id}, { $set: { Prioritet: "aokXW8csAYxKRvxfv"} });
    });*/
    console.log ('=====================');

    console.log('Aktivnosti tiketa - '+ activities.find().count());
    console.log('Ovlascenja zaposlenih - '+ authorities.find().count());
    console.log('Vrste intervencija - '+ interventions.find().count());
    console.log('Prioriteti tiketa - '+ priorities.find().count());
    console.log('Zone - '+ zones.find().count());
    console.log('Zaposlenih - '+ Meteor.users.find().count());
    console.log('Korisnika - '+ clients.find().count());
    console.log('Tiketa - '+ tickets.find().count());
    console.log('Servisa - '+ services.find().count());

    if (Meteor.users.find().count() === 0) {
        var data = [
        {
            "_id" : "5269538f83a16aee67cffc73",
            "Ovlascenje" : "Admin"
        },
        {
            "_id" : "5269538f83a16aee67cffc74",
            "Ovlascenje" : "ClientSuperUser"
        },
        {
            "_id" : "5269538f83a16aee67cffc75",
            "Ovlascenje" : "User"
        }
        ];
        var timestamp = (new Date()).getTime();
        _.each(data, function(list) {

            authorities.insert({ _id: list._id, 'Ovlascenje': list.Ovlascenje});})


        var pass = 'fratello';
        var prof={
            Email : "n_ilija@yahoo.com",
            Ime : "Ilija",
            Prezime : "Nikolić",
            Ovlascenje : "5269538f83a16aee67cffc73",
            //ToDo : row.ToDo,
            zaZaduzen : " - Ilija Nikolić",
            ImePrezime : "Ilija Nikolić"
        };
        Accounts.createUser({
            username : "admin",
            password : "fratello",
            email : "n_ilija@yahoo.com",
            profile : prof
        });
    };

    // 1. Set up stmp
/*    var username = 'xxx';
    var password = 'xxx';
    var server = 'smtp.mailgun.org';
    var port = '25';

    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(username) + ':' +
        encodeURIComponent(password) + '@' +
        encodeURIComponent(server) + ':' + port;*/
    
    smtp = {
    username: 'fts.fratello@gmail.com',   // eg: server@gentlenode.com
    password: 'fzygoyiavcdvldjw',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
    }

    process.env.MAIL_URL = 'smtps://' +
        encodeURIComponent(smtp.username) + ':' + 
        encodeURIComponent(smtp.password) + '@' + 
        encodeURIComponent(smtp.server) + ':' + smtp.port;


/*
    smtp = {
        username: 'n_ilija@yahoo.com',   // eg: server@gentlenode.com
        password: 'nikolina123',   // eg: 3eeP1gtizk5eziohfervU
        server:   'smtp.mail.yahoo.com',  // eg: mail.gandi.net
        port: 587
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
*/

/*  User       fts@fratello.rs
    Pass       Fratello987
               Fratello456

    SMTP setting
    Server name: smtp.office365.com
    Port: 587
    Encryption method: STARTTLS

    POP setting

    Server name: outlook.office365.com
    Port: 995
    Encryption method: TLS*/

//    process.env.MAIL_URL = 'smtp://fts@fratello.rs:Fratello456@smtp.office365.com:587';  +++++++++++++++++++++++++++++++++++++ OFICE


//    process.env.MAIL_URL = 'smtp://fts@fratello.rs:Frat987@mail.fratello.rs:465';
//    process.env.MAIL_URL = 'smtp://n_ilija@yahoo.com:nikolina123@smtp.mail.yahoo.com:587 ';
//    process.env.MAIL_URL = 'smtp://your_username:your_password@smtp.sendgrid.net:587';
});

function initialMigrationFratelloxxxxx(){
    console.log('+-----------------------------------------------------------------------------+');
    console.log('+   Start migracije.                                                          +');
    console.log('+        Priprema za migraciju                                                +');
    Meteor.users.remove({});
    var xx;
    //var id;
    console.log('+             Migracija - years (2013, 2014, 2015)                            +');
    years.remove({});
    years.insert({ Year: "2013", createdAt: new Date()});
    years.insert({ Year: "2014", createdAt: new Date()});
    years.insert({ Year: "2015", createdAt: new Date()});
    console.log('+             Migracija - activities                                          +');
    activities.remove({});
    xx = activitiesOld.find();xx.forEach(function(row){activities.insert({ _id: row._id._str, 'Aktivnost': row.Aktivnost});});
    console.log('+             Migracija - authorities                                         +');
    authorities.remove({});
    xx = authoritiesOld.find();xx.forEach(function(row){authorities.insert({ _id: row._id._str, 'Ovlascenje': row.Ovlascenje});});
    console.log('+             authorities: ovlascenje ClientUser                              +');
    authorities.insert({"Ovlascenje" : "ClientUser"});
    console.log('+             Migracija - interventions                                       +');
    interventions.remove({});
    xx = interventionsOld.find();xx.forEach(function(row){interventions.insert({ _id: row._id._str, 'Intervencija': row.Intervencija});});
    console.log('+             Migracija - priorities                                          +');
    priorities.remove({});
    xx = prioritiesOld.find();xx.forEach(function(row){priorities.insert({ _id: row._id._str, 'Prioritet': row.Prioritet});});
    console.log('+             Migracija - zones                                               +');
    zones.remove({});
    xx = zonesOld.find();xx.forEach(function(row){zones.insert({ _id: row._id._str, 'Zona': row.Zona});});
    console.log('+             Migracija - clients                                             +');
    clients.remove({});
    xx = clientsOld.find();
    xx.forEach(function(row){
        var zona = zonesOld.findOne({'Zona': row.Zona},{_id: 1});
        clients.insert({ _id: row._id._str, 'Adresa': row.Adresa, 'Email': row.Email, 'Komitent': row.Komitent, 'Lokacija': row.Lokacija, 'Mesto': row.Mesto, 'OdgovornoLice': row.OdgovornoLice, 'Telefon': row.Telefon, 'Zona': zona._id._str });
    });
    console.log('+             Migracija - users                                               +');
    Meteor.users.remove({});
    xx = users_fratellosOld.find();
    xx.forEach(function(row){
        var ovlast = authoritiesOld.findOne({'Ovlascenje': row.Ovlascenje},{_id: 1});
        var pass = 'fratello';
        var prof={
            Email : row.Email,
            Ime : row.Ime,
            Prezime : row.Prezime,
            Ovlascenje : ovlast._id._str,
            //ToDo : row.ToDo,
            zaZaduzen : ' - '+row.Ime+' '+row.Prezime,
            ImePrezime : row.Ime+' '+row.Prezime,
            _idOld: new Meteor.Collection.ObjectID(row._id._str)._str
        };
        //id=new Meteor.Collection.ObjectID(row._id._str)._str;
        Accounts.createUser({
            //_id: new Meteor.Collection.ObjectID(row._id._str),
            //_id: id,
            username : row.username,
            password : pass,
            email : row.Email,
            profile : prof
        });
    });
    console.log('+             Migracija - tickets                                             +');
    tickets.remove({});
    var rbr = 0;
    xx = ticketsOld.find();
    xx.forEach(function(row){
        rbr++;
        var aktivnost = activitiesOld.findOne({'Aktivnost': row.Aktivnost},{_id: 1});
        var prioritet = prioritiesOld.findOne({'Prioritet': row.Prioritet},{_id: 1});
        var intervencija = [];
        if(row.Intervencija) {
            intervencija = Object.keys(row.Intervencija);
        }
        var zaposlenitodo = [];
        var zaposlenitodoNew = [];
        if(row.ZaposleniToDo) {
            zaposlenitodo = Object.keys(row.ZaposleniToDo);
        }
        for(var i=0;i<zaposlenitodo.length;i++) {
            var to = usersAll.find({ "profile._idOld" : zaposlenitodo[i]}).fetch();
            zaposlenitodoNew.push(to[0]._id);
        }
        var tiketotvorio = usersAll.find({ "profile._idOld" : row.TiketOtvorio._id}).fetch();
        //console.log(tiketotvorio[0]._id);
        tickets.insert({
            '_id' : row._id._str,
            'RBR': rbr,
            'Aktivnost': aktivnost._id._str,
            'Prioritet': prioritet._id._str,
            'Year': row.DatumOtvaranja.substr(0,4),
            'DatumOtvaranja' : row.DatumOtvaranja,
            'DatumToDo' : row.DatumToDo,
            'DatumZatvaranja' : row.DatumZatvaranja,
            'KomitentToDo' : row.KomitentToDo._id,
            'TiketOtvorio': tiketotvorio[0]._id, //row.TiketOtvorio._id,
            'ZaposleniToDo' : zaposlenitodoNew,
            'Komitent' : row.Komitent,
            'Zona' : row.Zona,
            'Napomena' : row.Napomena,
            'OpisProblema' : row.OpisProblema,
            'OpisResenja' : row.OpisResenja,
            'ProblemPrijavio' : row.ProblemPrijavio,
            'ToDo' : 0,
            'Zaduzen' : row.Zaduzen,
            Intervencija : intervencija
        });
    });
    xx = tickets.find({ 'Aktivnost': {$ne:'5269538f83a16aee67cffc72'}}, {'DatumOtvaranja':1});
    var i = 1;
    xx.forEach(function(row) {
//        console.log(row._id)
        tickets.update({_id:row._id}, { $set: { ToDo: i++} });
    });
    console.log('+   Kraj migracije.                                                           +');
    console.log('+-----------------------------------------------------------------------------+');
    console.log('+         Obavezno u fajlu server/startup/start.js                            +');
    console.log('+         komentarisati red poziva funkcije:                                  +');
    console.log('+              initialMigrationFratello();                                    +');
    console.log('+-----------------------------------------------------------------------------+');
}
