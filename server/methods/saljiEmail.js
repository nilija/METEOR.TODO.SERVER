Meteor.methods({
 
    saljiEmail: function(eTo, eSubject, eBody, attachments) {
//      this.unblock();
        if ((attachments) && (attachments.length)){
//            console.log (attachments.length);
            var fs = Npm.require('fs');
            var filePath = "/srv/uploads/fratello/";

            var attFile = attachments;
            var attachments = [];
            var eAttach = '';
            attFile.forEach(function (post) {
                var eAttach = filePath + "images-" + post;
                try {
                    if (fs.existsSync(eAttach)) {
                        //file exists
                        attachments.push(
                            {
                                /*                        fileName: eAttach.substr(eAttach.lastIndexOf('/') + 1),  ------------------  na verziji meteora METEOR@1.3
                                 filePath: eAttach*/
                                filename: eAttach.substr(eAttach.lastIndexOf('/') + 1),
                                path: eAttach
//                        contentType: 'pdf'
                            });
                    }
                } catch (err) {
                    console.error('err - attachments:')
                    console.error(err)
                }

            });

        }

        try {

            Email.send({
                //to: 'Sasa Tomljanovic' + ' <' + 'sasa.tomljanovic@gmail.com' + '>', //eTo
//                from: 'Fratello ticketing <n_ilija@yahoo.com>',
                from: 'Fratello ticketing <fts@fratello.rs>',
//    var eTo = 'service@fratello.rs';
//    var eTo = 'n_ilija@yahoo.com, service@fratello.rs';
//                to: 'service@fratello.rs',
                to: eTo,
                replyTo: 'Fratello ticketing <fts.fratello@gmail.com>',
//                replyTo: 'Fratello ticketing <info@fratello.rs>',
//                replyTo: 'Fratello ticketing <n_ilija@yahoo.com>',

                subject: eSubject,
                html: eBody,
                attachments: attachments

            });
        } catch(e) {
            console.log(e.message);
            throw new Meteor.Error(e.message);
        }
    },
    saljiEmail_RN: function(eTo, eSubject, eDodatak, eBody, eAttach) {
        try {
            Email.send({
                //to: 'Sasa Tomljanovic' + ' <' + 'sasa.tomljanovic@gmail.com' + '>', //eTo
                to: eTo,
                replyTo: 'Fratello ticketing <fts.fratello@gmail.com>',
                from: 'Fratello ticketing <fts@fratello.rs>',
//                replyTo: 'Fratello ticketing <n_ilija@yahoo.com>',
//                from: 'Fratello ticketing <n_ilija@yahoo.com>',
                subject: eSubject,
                html: eBody,
                attachments: [ {
                    // Each attachment conforms to mailcomposer's specs.
                        fileame: eAttach.substr(eAttach.lastIndexOf('/') + 1),
                        path: eAttach
                    //    contents: "this is a test attachment."
                    }
                ]
            });
        } catch(e) {
            console.log(e.message);
            throw new Meteor.Error(e.message);
        }
    }
});