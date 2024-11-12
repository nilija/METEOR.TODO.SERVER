if (Meteor.isServer) {
    var fs = Npm.require('fs');
/*    const fs = require('fs')
    Meteor.methods({
        if (Meteor.isServer)
    saveMyJson(jsonData) {
        fs.WriteFile('/path/to/file.json',JSON.stringify(jsonData,null,2) ,
            (err) => {
            if (err) throw err;
        console.log('Saved '+outfile);
    });
    }
})*/
    Meteor.methods({

        "buildVcard": function (content) {
            var filename = 'vcard-' + new Date().getTime() + '.vcf';
            var filePath = process.env.PWD + '/private/' + filename;
            fs.writeFileSync(filePath, content, 'binary');
            return '/download/' + filename;
        },
        "downloadPdf": function () {
//            console.log('xxxxxxxxxxxx');
//        var filename = this.params.filename;
            var filename = 'companions/xxx.txt';
            var filePath = process.env.PWD + '/private/' + filename;
//            var fs = Npm.require('fs');
            var data = fs.readFileSync(filePath, 'utf8');
            console.log(filePath);
            console.log(data);
//        var data = fs.readFileSync(process.cwd() + '/../web.browser/app/data/taxa.csv', 'utf8');
            /*        var data = Assets.getText(filename);
             console.log (data);*/
            /*        response.writeHead(200, {
             'Cache-Control': 'private, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0',
             'Content-Type': 'text/x-vcard',
             'Content-Disposition': 'attachment; filename= "' + filename + '";'
             });
             response.write(data);
             response.end();*/
            return data;
        }
    });
    /*Router.route('/download/:filename', function () {
     this.response.end('some file content\n');
     }, {where: 'server'});*/

    Router.route('/download/:filename', function () {
        // NodeJS request object
        var request = this.request;

        // NodeJS  response object
        var response = this.response;

        var fs = Npm.require('fs');


        var filename = this.params.filename;
//        console.log(filename);
        /*    if ('mimeType' in filename) {
         console.log (image.mimeType);
         } else {
         console.log ("Your browser doesn't support the mimeType property.");
         };*/
//    var filename = 'CV-en.pdf';
//    var filePath = process.env.PWD + '/private/' + filename;
        var filePath = '/srv/uploads/fratello/' + filename;
        var data = fs.readFileSync(filePath);
        this.response.writeHead(200, {

            /*                  "Content-Type": "application/pdf",
             "Content-Length": data.length*/

            'Cache-Control': 'private, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0',
            'Content-Type': 'application/octet-stream',
      //      'Content-Disposition': 'attachment; filename= "' + filename + '";'
            'Content-Disposition': 'attachment; filename= "' + encodeURIComponent(filename) + '";' // dozvoljava special chars u imenu
      //      'Content-Disposition': 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename)+'";'
        });
        this.response.write(data);
        this.response.end();


//    this.response.end('file download content\n');
    }, {where: 'server'});
}


/*
You can write in a file by the following code example:

    var data = [{'test': '123', 'test2': 'Lorem Ipsem '}];
fs.open(datapath + '/data/topplayers.json', 'wx', function(error, fileDescriptor){
    if(!error && fileDescriptor){
        var stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, function(error){
            if(!error){
                fs.close(fileDescriptor, function(error){
                    if(!error){
                        callback(false);
                    }else{
                        callback('Error in close file');
                    }
                });
            }else{
                callback('Error in writing file.');
            }
        });
    }
} */


/*
fs.open(path, 'w+', function(err, data) {
    if (err) {
        console.log("ERROR !! " + err);
    } else {
        fs.write(data, 'content', 0, 'content length', null, function(err) {
            if (err)
                console.log("ERROR !! " + err);
            fs.close(data, function() {
                console.log('written success');
            })
        });
    }
});*/
