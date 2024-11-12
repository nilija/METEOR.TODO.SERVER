Meteor.methods({
    migracija: function() {
        var xx;
        activities.remove({});
        xx = activitiesOld.find();xx.forEach(function(row){activities.insert({ _id: row._id._str, 'Aktivnost': row.Aktivnost});});
        authorities.remove({});
        xx = authoritiesOld.find();xx.forEach(function(row){authorities.insert({ _id: row._id._str, 'Ovlascenje': row.Ovlascenje});});
        interventions.remove({});
        xx = interventionsOld.find();xx.forEach(function(row){interventions.insert({ _id: row._id._str, 'Intervencija': row.Intervencija});});
        priorities.remove({});
        xx = prioritiesOld.find();xx.forEach(function(row){priorities.insert({ _id: row._id._str, 'Prioritet': row.Prioritet});});
        zones.remove({});
        xx = zonesOld.find();xx.forEach(function(row){zones.insert({ _id: row._id._str, 'Zona': row.Zona});});
        clients.remove({});
        xx = clientsOld.find();
        xx.forEach(function(row){
            var zona = zonesOld.findOne({'Zona': row.Zona},{_id: 1});
            clients.insert({ _id: row._id._str, 'Adresa': row.Adresa, 'Email': row.Email, 'Komitent': row.Komitent, 'Lokacija': row.Lokacija, 'Mesto': row.Mesto, 'OdgovornoLice': row.OdgovornoLice, 'Telefon': row.Telefon, 'Zona': zona._id._str });
        });

        tickets.remove({});
        xx = ticketsOld.find();
        xx.forEach(function(row){
            var aktivnost = activitiesOld.findOne({'Aktivnost': row.Aktivnost},{_id: 1});
            var prioritet = prioritiesOld.findOne({'Prioritet': row.Prioritet},{_id: 1});
            var intervencija = [];
            if(row.Intervencija) {
                intervencija = Object.keys(row.Intervencija);
            }
            var zaposlenitodo = [];
            if(row.ZaposleniToDo) {
                zaposlenitodo = Object.keys(row.ZaposleniToDo);
            }
            tickets.insert({
                '_id' : row._id._str,
                'Aktivnost': aktivnost._id._str,
                'Prioritet': prioritet._id._str,
                'DatumOtvaranja' : row.DatumOtvaranja,
                'DatumToDo' : row.DatumToDo,
                'DatumZatvaranja' : row.DatumZatvaranja,
                'KomitentToDo' : row.KomitentToDo._id,
                'TiketOtvorio': row.TiketOtvorio._id,
                'ZaposleniToDo' : zaposlenitodo,
                'Komitent' : row.Komitent,
                'Zona' : row.Zona,
                'Napomena' : row.Napomena,
                'OpisProblema' : row.OpisProblema,
                'OpisResenja' : row.OpisResenja,
                'ProblemPrijavio' : row.ProblemPrijavio,
                'ToDo' : row.ToDo,
                'Zaduzen' : row.Zaduzen,
                Intervencija : intervencija
            });
        });
        console.log('- Aktivnosti tiketa - '+activities.find().count());
        console.log('- Ovlascenja zaposlenih - '+authorities.find().count());
        console.log('- Vrste intervencija - '+interventions.find().count());
        console.log('- Prioriteti tiketa - '+priorities.find().count());
        console.log('- Zone - '+zones.find().count());
        console.log('- Zaposlenih - '+Meteor.users.find().count());
        console.log('- Korisnika - '+clients.find().count());
        console.log('- Tiketa - '+tickets.find().count());


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
                ImePrezime : row.Ime+' '+row.Prezime
            };
            Accounts.createUser({
                _id: row._id,
                username : row.username,
                password : pass,
                email : row.Email,
                profile : prof
            });
        });



    }
});