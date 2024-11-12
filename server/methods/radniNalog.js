Meteor.methods({
    "praviRadniNalog": function(servis, izvrsilacBroj, radniNalogBroj, datumNaloga, problemNaloga, komitent, lokacija, mesto, adresa, resenje, izvrsilac, materijal, kol) {

        //
        // ULAZNI PODACI!!!!
        //
        //var izvrsilacBroj = '1';
        //var radniNalogBroj = '458';
        //var datumNaloga = '1015/11/02, 16:56';
        //var problemNaloga = 'Opis problema radnog naloga je malo duži šđžčć   ŠĐŽČĆ! i jo[ je malo duzi i duuuuuuzi.';
        //var komitent = 'Komitent koji narucuje uslugu';
        //var lokacija = 'Lokacija objekta koji se popravlja ili ima delove.';
        //var mesto = 'Kragujevac';
        //var adresa = 'Cerska 8.';
        //var resenje = 'Opis resenja koji moze biti zaista jako dugacak opis koji ima nekoliko redova teksta bl, bla, bla... etc. i jos samo da dodam ovo!';
        //var izvrsilac = 'Sasa Tomljanovic';

        // VRACA!!!!!
        //
        // putanju do fajla radnog naloga i taj file ide u attachment maila
        var filePath =  "/srv/radniNalozi/";
        if ((servis == 'DA Fratello') || (servis == 'MOOD Media')){
            var nalogFile = filePath + 'Fratello_RN_' + radniNalogBroj + '.pdf';
        } else {
            var nalogFile = filePath + servis + '_' + radniNalogBroj + '.pdf';
        }

        // pozicije kolona
        var left = 30;
        var right = 575;
        var prva = 198;
        var druga = 260;
        var treca = 380;
        var cetvrta = 497;
        var first = 70;
        //var step = 13;
        // start
        var doc = new PDFDocument({size: 'A4'});
        // BOLDOVANO!!!
        var filePath =  "/srv/public/assets/fonts/";
        doc.font(filePath + 'OpenSans-Bold.ttf');
        doc.fontSize(10);
        if ((servis == 'DA Fratello') || (servis == 'MOOD Media')){
            doc.text('DA FRATELLO d.o.o. Beograd,', left + 5, first);
            doc.fontSize(10);
            doc.text('Braće Ribnikara 37,', left + 5, first + 10);
        }
        else {
            doc.text('McD Service, Beograd,', left + 5, first);
            doc.fontSize(10);
            doc.text('Pozeska 98a,', left + 5, first + 10);
        };
        doc.fontSize(11);
        doc.text('Radni Nalog br.', left+5, first+36);
        doc.fontSize(9);
        doc.text(komitent, left+3, 154+50);
        // normalna slova
        doc.font(filePath + 'OpenSans-Regular.ttf');
        doc.fontSize(9);
        if ((servis == 'DA Fratello') || (servis == 'MOOD Media')){
            doc.text('Tel. 011/30.86.024  Fax. 011/30.86.025', left + 5, 92);
        } else {
            doc.text('Tel. +381 11 355 98 64', left + 5, 92);
        };
        doc.text('Uređaj', prva+3, 70);
        doc.text('Tip', treca+3, 70);
        doc.text('Fabrički broj', prva+3, 83);
        doc.text('Inv. broj', prva+3, 95);
        doc.text('Datum', prva+3, 107);
        doc.text(datumNaloga, druga+3, 107);
        doc.text(izvrsilacBroj+'/'+radniNalogBroj, left+5, 118+2);
        doc.text('Problem:', prva+3, 118);
        doc.text(problemNaloga, druga+3, 118);
        doc.text('Neopozivo naručujem popravku, naručilac:', left+3, 142+50);
        doc.text('Objekat: '+lokacija, treca+3, 142+50);
        doc.text('Mesto: '+mesto, left+3, 166+50);
        doc.text('Ulica i broj: '+adresa, prva+3, 166+50);
        doc.text('OPIS OSNOVNIH RADOVA', left+3, 190+50);
        doc.text('                  J. Cena', druga+3, 190+50);
        doc.text('                Količina', treca+3, 190+50);
        doc.text('Iznos', cetvrta+3, 190+50);
        doc.text(' 1 '+resenje, left+3, 203+50, {width :240, height: 52});
        doc.text(' 2 ', left+3, 229+76);
        doc.text(' 3 ', left+3, 242+76);
        doc.text(' 4 ', left+3, 255+76);
        doc.text(' 5 ', left+3, 268+76);
        doc.text(' 6 ', left+3, 281+76);
        doc.text(' 7 ', left+3, 294+76);
        doc.text(' 8 ', left+3, 307+76);
        doc.text(' 9 ', left+3, 320+76);
        doc.text('10 ', left+3, 333+76);
        doc.text('                                  SVEGA:', treca+3, 346+76);
        doc.text('MATERIJAL - REZERVNI DELOVI', left+3, 359+76);
        if (!materijal)
            var materijal = [];
        if (!kol)
            var kol = [];
        for (i = 0; i < 10; i++) {
            if (!materijal[i])
                materijal.push('');
            if (!kol[i])
                kol.push('');
        };
//        console.log (materijal);
        
        doc.text(' 1. '+ materijal [0], left+3, 372+76);
        doc.text(kol [0], treca+50, 372+76);
        doc.text(' 2. '+ materijal [1], left+3, 385+76);
        doc.text(kol [1], treca+50, 385+76);
        doc.text(' 3. '+ materijal [2], left+3, 398+76);
        doc.text(kol [2], treca+50, 398+76);
        doc.text(' 4. '+ materijal [3], left+3, 411+76);
        doc.text(kol [3], treca+50, 411+76);
        doc.text(' 5. '+ materijal [4], left+3, 424+76);
        doc.text(kol [4], treca+50, 424+76);
        doc.text(' 6. '+ materijal [5], left+3, 437+76);
        doc.text(kol [5], treca+50, 437+76);
        doc.text(' 7. '+ materijal [6], left+3, 450+76);
        doc.text(kol [6], treca+50, 450+76);
        doc.text(' 8. '+ materijal [7], left+3, 463+76);
        doc.text(kol [7], treca+50, 463+76);
        doc.text(' 9. '+ materijal [8], left+3, 476+76);
        doc.text(kol [8], treca+50, 476+76);
        doc.text('10. '+ materijal [9], left+3, 489+76);
        doc.text(kol [9], treca+50, 489+76);
        doc.text('                                  SVEGA:', treca+3, 502+76);
        doc.text('SPECIFIKACIJA OSTALIH TROŠKOVA', left+3, 515+76);
        doc.text('Putni troškovi', druga+3, 528+76);
        doc.text('Vreme u vožnji', druga+3, 541+76);
        doc.text('Putarina', druga+3, 554+76);
        doc.text('Ostali troškovi', druga+3, 567+76);
        doc.text('                              UKUPNO:', treca+3, 580+76);
        doc.text('Opšta stopa PDV', druga+3, 593+76);
        doc.text('      UKUPNO ZA NAPLATU:', treca+3, 606+76);
        doc.text('Radove izvršio:', left+3, 619+76);
        doc.text('Da su radovi izvršeni, materijal ugradjen', druga+3, 619+76);
        doc.text(izvrsilac, left+3, 632+76);
        doc.text('i uredjaj ispravan, overava:', druga+3, 632+76);
        doc.text('Potpis ______________________________________________________', druga+3, 650+76);
        doc.text('Datum ______________________________________________________', druga+3, 665+76);
        // LINIJE
        doc.lineWidth(.2);
        // vertikale
        doc.moveTo(left, first) .lineTo(left, 681+76) .stroke();
        doc.moveTo(prva, first) .lineTo(prva, 142+50) .stroke();
        doc.moveTo(prva, 166+50) .lineTo(prva, 190+50) .stroke();
        doc.moveTo(druga, first) .lineTo(druga, 142+50) .stroke();
        doc.moveTo(druga, 190+50) .lineTo(druga, 346+76) .stroke();
        doc.moveTo(druga, 372+76) .lineTo(druga, 502+76) .stroke();
        doc.moveTo(druga, 528+76) .lineTo(druga, 580+76) .stroke();
        doc.moveTo(druga, 593+76) .lineTo(druga, 606+76) .stroke();
        doc.moveTo(druga, 619+76) .lineTo(druga, 681+76) .stroke();
        doc.moveTo(treca, first) .lineTo(treca, 82) .stroke();
        doc.moveTo(treca, 142+50) .lineTo(treca, 166+50) .stroke();
        doc.moveTo(treca, 190+50) .lineTo(treca, 346+76) .stroke();
        doc.moveTo(treca, 372+76) .lineTo(treca, 502+76) .stroke();
        doc.moveTo(cetvrta, first) .lineTo(cetvrta, 82) .stroke();
        doc.moveTo(cetvrta, 190+50) .lineTo(cetvrta, 359+76) .stroke();
        doc.moveTo(cetvrta, 372+76) .lineTo(cetvrta, 515+76) .stroke();
        doc.moveTo(cetvrta, 528+76) .lineTo(cetvrta, 619+76) .stroke();
        doc.moveTo(right, first) .lineTo(right, 681+76) .stroke();
        // horizontale
        doc.moveTo(left, first) .lineTo(right, first) .stroke();
        doc.moveTo(prva, 83) .lineTo(right, 83) .stroke();
        doc.moveTo(prva, 95) .lineTo(right, 95) .stroke();
        doc.moveTo(left, 107) .lineTo(right, 107) .stroke();
        doc.moveTo(prva, 118) .lineTo(right, 118) .stroke();
        doc.moveTo(left, 142+50) .lineTo(right, 142+50) .stroke();
        doc.moveTo(left, 166+50) .lineTo(right, 166+50) .stroke();
        doc.moveTo(left, 190+50) .lineTo(right, 190+50) .stroke();
        doc.moveTo(left, 203+50) .lineTo(right, 203+50) .stroke();
        doc.moveTo(left, 229+76) .lineTo(right, 229+76) .stroke();
        doc.moveTo(left, 242+76) .lineTo(right, 242+76) .stroke();
        doc.moveTo(left, 255+76) .lineTo(right, 255+76) .stroke();
        doc.moveTo(left, 268+76) .lineTo(right, 268+76) .stroke();
        doc.moveTo(left, 281+76) .lineTo(right, 281+76) .stroke();
        doc.moveTo(left, 294+76) .lineTo(right, 294+76) .stroke();
        doc.moveTo(left, 307+76) .lineTo(right, 307+76) .stroke();
        doc.moveTo(left, 320+76) .lineTo(right, 320+76) .stroke();
        doc.moveTo(left, 333+76) .lineTo(right, 333+76) .stroke();
        doc.moveTo(left, 346+76) .lineTo(right, 346+76) .stroke();
        doc.moveTo(left, 359+76) .lineTo(right, 359+76) .stroke();
        doc.moveTo(left, 372+76) .lineTo(right, 372+76) .stroke();
        doc.moveTo(left, 385+76) .lineTo(right, 385+76) .stroke();
        doc.moveTo(left, 398+76) .lineTo(right, 398+76) .stroke();
        doc.moveTo(left, 411+76) .lineTo(right, 411+76) .stroke();
        doc.moveTo(left, 424+76) .lineTo(right, 424+76) .stroke();
        doc.moveTo(left, 437+76) .lineTo(right, 437+76) .stroke();
        doc.moveTo(left, 450+76) .lineTo(right, 450+76) .stroke();
        doc.moveTo(left, 463+76) .lineTo(right, 463+76) .stroke();
        doc.moveTo(left, 476+76) .lineTo(right, 476+76) .stroke();
        doc.moveTo(left, 489+76) .lineTo(right, 489+76) .stroke();
        doc.moveTo(left, 502+76) .lineTo(right, 502+76) .stroke();
        doc.moveTo(left, 515+76) .lineTo(right, 515+76) .stroke();
        doc.moveTo(left, 528+76) .lineTo(right, 528+76) .stroke();
        doc.moveTo(left, 541+76) .lineTo(right, 541+76) .stroke();
        doc.moveTo(left, 554+76) .lineTo(right, 554+76) .stroke();
        doc.moveTo(left, 567+76) .lineTo(right, 567+76) .stroke();
        doc.moveTo(left, 580+76) .lineTo(right, 580+76) .stroke();
        doc.moveTo(left, 593+76) .lineTo(right, 593+76) .stroke();
        doc.moveTo(left, 606+76) .lineTo(right, 606+76) .stroke();
        doc.moveTo(left, 619+76) .lineTo(right, 619+76) .stroke();
        doc.moveTo(left, 681+76) .lineTo(right, 681+76) .stroke();
        // SAVE
        doc.writeSync(nalogFile);
        return nalogFile;
    }
});