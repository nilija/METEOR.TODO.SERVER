/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/tickets.js
 * generated:     2014/11/27 14:50
 */

Template.tickets.helpers({
    myWhatever: function () {
        var whatever = Session.get('ticketsCount');

        if (whatever) return whatever;

        return 'Loading whatever...';
    },
 /*   isAdmin: function() {
        if(Session.get('isAdmin'))
            return true;
    },
    isUser: function() {
        if(Session.get('isUser'))
            return true;
    },
    isClientUser: function() {
        if(Session.get('isClientUser'))
            return true;
    },*/
    isZatvoreni: function() {
        if (Session.get('fZatvoreni') &&
                (!Session.get('fOtvoreni') && !Session.get('fPostupak')))
            return true;
    },
    tickets: function() {
        if(!Session.get('IdOtvoreni')) {
            getActivitiesIDs();
        }

        var servis_id = [];
        if (Session.get('fCbs0') || Session.get('fCbs1') || Session.get('fCbs2') || Session.get('fCbs3')) {
            if (Session.get('fCbs0'))
                servis_id.push ($("#cbs0").val());
            if (Session.get('fCbs1'))
                servis_id.push ($("#cbs1").val());
            if (Session.get('fCbs2'))
                servis_id.push ($("#cbs2").val());
            if (Session.get('fCbs3'))
                servis_id.push ($("#cbs3").val());
        }

        if ((!Session.get('fZatvoreni') && !Session.get('fOtvoreni') && !Session.get('fPostupak'))
            && Session.get('fHold')) {
            var name = 'hold';
            var intervencija_id = [];
            intervencija_id.push (getInterventionsId(name));

//            var akt_ = [];
//            akt_.push(Session.get('IdZatvoreni'));

            return tickets.find({"Servis": {$in: servis_id}, "Intervencija": {$in: intervencija_id}, "Aktivnost": {$ne: Session.get('IdZatvoreni')}},
                {sort: {ToDo: 1}}).fetch();
        }

        var akt = [];
        if(Session.get('fOtvoreni'))
            akt.push(Session.get('IdOtvoreni'));
        if(Session.get('fPostupak'))
            akt.push(Session.get('IdPostupak'));
        if (Session.get('fZatvoreni'))
            akt.push(Session.get('IdZatvoreni'));

        if(!Session.get('fZatvoreni') &&
            (Session.get('fOtvoreni') || Session.get('fPostupak'))) {
//  ...................................................................         otvoreni i/ili u postupku
            if(Session.get('isAdmin')) {
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt}},
                    {sort: {ToDo: 1}}).fetch();
            }
            if(Session.get('isUser')) {
                return tickets.find({
                        "Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"Zaduzen": {$regex: Session.get("zaZaduzen")}},
                            {"Zaduzen": {$regex: "---"}}]
                    },
                    {sort: {ToDo: 1}}).fetch();
            }

            if(Session.get('isClientUser'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                    $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": Session.get("Client")}]},
                    {sort: {ToDo: 1}}).fetch();

            if(Session.get('isClientSuperUser'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                    $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": {$in: Session.get("Clients")}}]},
                    {sort: {ToDo: 1}}).fetch();
        }

        if (Session.get('fZatvoreni') &&
                (!Session.get('fOtvoreni') && !Session.get('fPostupak'))) {
//  .........................................................................       zatvoreni

                if (Session.get('isAdmin'))
                    return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt}},
                        {sort: {RBR: -1}}).fetch();

                if (Session.get('isUser'))
                    return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"Zaduzen": {$regex: Session.get("zaZaduzen")}},
                            {"Zaduzen": {$regex: "---"}}]},
                        {sort: {RBR: -1}}).fetch();

                if (Session.get('isClientUser'))
                    return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": Session.get("Client")}]},
                        {sort: {RBR: -1}}).fetch();

                if (Session.get('isClientSuperUser'))
                    return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                            $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": {$in: Session.get("Clients")}}]},
                        {sort: {RBR: -1}}).fetch();
            }

//  ..............................................................................   zatvoreni i (otvoreni i/ili u postupku)

            if (Session.get('isAdmin'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt}}).fetch();

            if (Session.get('isUser'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"Zaduzen": {$regex: Session.get("zaZaduzen")}},
                        {"Zaduzen": {$regex: "---"}}]}).fetch();

            if (Session.get('isClientUser'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": Session.get("Client")}]}).fetch();

            if (Session.get('isClientSuperUser'))
                return tickets.find({"Servis": {$in: servis_id}, "Aktivnost": {$in: akt},
                        $or: [{"TiketOtvorio": Session.get('userID')}, {"Komitent": {$in: Session.get("Clients")}}]}).fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('tickets.modalTitleAdd');
            case 'groupAdd':
                return i18n('tickets.modalTitleGroupAdd');
            case 'viewAtt':
            case 'view':
                return i18n('tickets.modalTitleView');
            case 'view_':
                return i18n('tickets.modalTitleView_');
            case 'edit':
                if (!Session.get('isClientUser') && !Session.get('isClientSuperUser')) {
                    if (Session.get('aktivnost') == 'otvoren') {
                        return i18n('tickets.modalTitleEdit');
                    }
                    else {
                        return i18n('tickets.modalTitleEditZ');
                    }
                }
                else
                {
                    return "Pregled / napomena"
                }
            case 'delete':
                return i18n('tickets.modalTitleDelete');
            case 'email':
                return 'Slanje emaila klijentu';
        }
    },
    modalService: function() {
        switch (Session.get("activity")) {
            case 'add':
            case 'groupAdd':
                return Spacebars.SafeString(
                    "<table id='tableAdd' style='width: 100%'>" +
                    "<tr><td style='width: 10%;text-align: left;padding-top: -15px;'><label for='m_Services'>Servis:</label></td><td style='width: 20%;text-align: left;padding-top: -15px;'>" + selectServices() + "</td></tr>");

            case 'edit':
                var service_Id = Session.get('service_Id');
                return Spacebars.SafeString(
                    "<table id='tableAdd' style='width: 100%'>" +
                    "<tr><td style='width: 10%;text-align: left;padding-top: -15px;'><label for='m_Services'>Servis:</label></td><td style='width: 20%;text-align: left;padding-top: -15px;'>" + selectServicesSelected(service_Id) + "</td></tr>");
            case 'view':
            case 'viewAtt':
            case 'delete':
                var service_Id = Session.get('service_Id');
                var service_Name = getService(service_Id);
                if (Session.get('service_Id') != undefined)
                    return Spacebars.SafeString(
                         "<table id='tableAdd' style='width: 100%'>" +
                         "<tr><td style='width: 10%;text-align: left;padding-top: -15px;'><label for='m_Services'>Servis:</label></td><td style='width: 20%;text-align: left;padding-top: -15px;'>" + service_Name + "</td></tr>");
                else
                    return Spacebars.SafeString(
                        "<table id='tableAdd' style='width: 100%'>" +
                        "<tr><td style='width: 10%;text-align: left;padding-top: -15px;'><label for='m_Services'>Servis:</label></td><td style='width: 20%;text-align: left;padding-top: -15px;'>" + 'nedodeljen' + "</td></tr>");
        }
    },
    modalBody: function() {

        var tHeader = '<table style="width: 100%;"><tbody>';
        var tdLeft1 = '<tr><td style="width: 20%; text-align: right; padding-top: 5px;"><label>';
        var tdLeft2 = '</label></td><td style="width: 2%;"></td>';
        var tdRight1 = '<td style="width: 78%;"><input type="text" style="height: 23px; width: 100%;" class="form-control" id="';
        var tdRight2Add = '" /></td></tr>';
        var tdRight2View = '" value="';
        var tdRight2ViewEnd = '" disabled=""/></td></tr>';
        var tdRight2ViewEnd_ = '" enabled=""/></td></tr>';
        var tFooter ='</tbody></table>';
        switch(Session.get("activity")){
            case 'add':
                return Spacebars.SafeString(
                    "<table id='tableAdd' style='width: 100%'>" +
                    "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+selectClientsFirst()+"</td>" +
                    "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:</label>"+selectPriorities()+"</td></tr>" +
                    "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus'></textarea></td>" +
                    "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus'></textarea></td></tr>" +
                    "<tr><td colspan='2' style='width: 80%'><hr></td></tr>"+
                    "<tr><td  style='width: 100%;text-align: center;padding-top: 5px;'>Napomena" +
                    "<textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus'></textarea></td>" +
                    "<td><input type='file' multiple id='files' name='files' style='padding-top: 20px; padding-left: 15px;' class='myFileInput' value = ''></td></tr>" +
                    "<tr><td colspan='2'><table style='width: 100%;'><tr>" +
                    "<td style='width: 30%;text-align: center;padding-top: 5px;'>Datum i vreme<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_DatumOtvaranja' value='"+Session.get('currentDateTime')+"' disabled></td>" +
                    "<td style='width: 40%;text-align: center;padding-top: 5px;'>Tiket otvorio<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_TiketOtvorioF' value='"+Session.get('ImePrezime')+"' disabled>" +
                    "<td style='width: 30%;text-align: center;padding-top: 5px;'>Status       <input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_Aktivnost' value='"+Session.get('aktivnostNew')+"' disabled></td></tr>" +
                    "</table></td></tr>" +
                    "</table>"+
                    "<br style='clear: both;' />");
            case 'groupAdd':
                return Spacebars.SafeString(
                    "<table id='tableGroupAdd' style='width: 100%'>" +
                    "<tr><td colspan='2' style='width: 100%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitenti:</label><span id='DodajKorisnika' data-tooltip='Dodaj korisnika' class='btn btn-success btn-xs tooltip-left pull-right'><i class='text-success glyphicon glyphicon-plus'></i></span>"+selectClientsFirst()+"</td></tr>" +
                    "<tr><table style='width: 100%' id='grupniKomitenti'></table></tr>"+
                    "<td colspan='2' style='width: 100%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'  >Prioritet tiketa:</label>"+selectPriorities()+"</td></tr>" +
                    "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus'></textarea></td>" +
                    "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus'></textarea></td></tr>" +
                    "<tr><td colspan='2' style='width: 80%'><hr></td></tr>"+
                    "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus'></textarea></td></tr>" +
                    "<tr><td colspan='2'><table style='width: 100%;'><tr>" +
                    "<td style='width: 30%;text-align: center;padding-top: 5px;'>Datum i vreme<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_DatumOtvaranja' value='"+Session.get('currentDateTime')+"' disabled></td>" +
                    "<td style='width: 40%;text-align: center;padding-top: 5px;'>Tiket otvorio<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_TiketOtvorioF' value='"+Session.get('ImePrezime')+"' disabled>" +
                    "<td style='width: 30%;text-align: center;padding-top: 5px;'>Status       <input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_Aktivnost' value='"+Session.get('aktivnostNew')+"' disabled></td></tr>" +
                    "</table></td></tr>" +
                    "</table>"+
                    "<br style='clear: both;' />");

            case 'view':
            case 'viewAtt':
            case 'delete':
                var attFile = [];
                var href = "";
                if (Session.get('AttFile') > "") {
                    attFile = Session.get('AttFile');

//                console.log (attFile);
                    var filePath = "/download/";
                    /*                var href__ = "<a href='#' class='js-download-pdf'>Download PDF</a>";
                     var href_ = "<a href='/download/CV-en.pdf' target='_blank'>Download File</a>";*/
                    href = "<tr><td colspan='2' style='width: 80%;margin-top: -15px;'><hr></td>Attachment:</tr>";
                    href += "<ul>";
                    attFile.forEach(function (post) {
                        var eAttach = filePath + "images-" + post;
                        var file = post.substr(post.lastIndexOf('-') + 1);
//                    console.log (file);
                        /*  <a href="newsletter_01.pdf" target="_blank">Read more</a>*/
                        href += "<li><a href=" + "'" + eAttach + "'" + "target='_blank'" + ">" + "'" + file + "'" + "</a></li>"
                    });
                    href += "</ul>";
                }
                if(Session.get('aktivnost')=='otvoren')
                    return Spacebars.SafeString(
                        "<table id='tableAdd' style='width: 100%'>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>"+Session.get('Komitent')+"</td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>"+ Session.get('prioritet') +"</td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>"+Session.get('ProblemPrijavio')+"</textarea></td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>"+Session.get('OpisProblema')+"</textarea></td></tr>" +
                        "<tr><td colspan='2' style='width: 80%;margin-top: -15px;'><hr></td></tr>"+
                        href +
                        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>"+Session.get('Napomena')+"</textarea></td></tr>" +
                        "<tr><td colspan='2'><table style='width: 100%;'><tr>" +
                        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Datum i vreme<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_DatumOtvaranja' value='"+Session.get('DatumOtvaranja')+"' disabled></td>" +
                        "<td style='width: 40%;text-align: center;padding-top: 5px;'>Tiket otvorio<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_TiketOtvorioF' value='"+ Session.get('tiketOtvorio') +"' disabled>" +
                        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Status       <input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_Aktivnost' value='"+ Session.get('aktivnost') +"' disabled></td></tr>" +
                        "</table></td></tr>" +
                        "</table>"+
                        "<br style='clear: both;' />");
                if(Session.get('aktivnost')=="u postupku")
                    return Spacebars.SafeString(
                        "<table id='tableAdd' style='width: 100%'>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>"+Session.get('Komitent')+"</td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>"+ Session.get('prioritet') +"</td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>"+Session.get('ProblemPrijavio')+"</textarea></td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>"+Session.get('OpisProblema')+"</textarea></td></tr>" +
                        href +
                        "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>"+
                        checkBoxToDoUsersView()+
                        "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>"+
                        checkBoxIntervenionsView()+
                        "</td></tr>"+
                        "<tr><td colspan='2' style='width: 80%;'><hr></td></tr>"+
                        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>"+Session.get('Napomena')+"</textarea></td></tr>" +
                        "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
                        "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja' value='"+Session.get('DatumOtvaranja')+"' disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='"+ Session.get('tiketOtvorio') +"' disabled></td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo'      value='"+Session.get('DatumToDo')     +"' disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='"+ Session.get('aktivnost') +"' disabled></td></tr>" +
                        "</table></td></tr>" +
                        "</table>"+
                        "<br style='clear: both;' />");
                else
                    return Spacebars.SafeString(
                        "<table id='tableAdd' style='width: 100%'>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>"+Session.get('Komitent')+"</td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>"+ Session.get('prioritet') +"</td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>"+Session.get('ProblemPrijavio')+"</textarea></td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>"+Session.get('OpisProblema')+"</textarea></td></tr>" +
                        href +
                        "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>"+
                        checkBoxToDoUsersView()+
                        "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>"+
                        checkBoxIntervenionsView()+
                        "</td></tr>"+
                        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Opis resenja<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_OpisResenja' placeholder='Opis rešenja' autofocus='autofocus' disabled>"+Session.get('OpisResenja')+"</textarea></td></tr>" +
                        "<tr><td colspan='2' style='width: 80%;'><hr></td></tr>"+
                        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>"+Session.get('Napomena')+"</textarea></td></tr>" +
                        "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
                        "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja'  value='"+datePicker(Session.get('DatumOtvaranja'))  +"' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='"+ Session.get('tiketOtvorio') +"' disabled></td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo'       value='"+datePicker(Session.get('DatumToDo'))       +"' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='"+ Session.get('aktivnost') +"' disabled></td></tr>" +
                        "<tr><td style='width: 50%;text-align: left;'>Tiket zatvoren      <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumZatvaranja' value='"+datePicker(Session.get('DatumZatvaranja')) +"' enabled></td>  <td style='width: 50%;text-align: left;'>" +
                        "&nbsp;Naplacen  -------------> &nbsp;<input type='checkbox' name='naplacen' "+chkPicker(Session.get('Naplacen')) +"><br></td></tr>" +
                        "</table></td></tr>" +
                        "</table>"+
                        "<br style='clear: both;' />");
            case 'edit':
                if (!Session.get('isClientUser') && !Session.get('isClientSuperUser')) {
                    var problem = "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus'>" + Session.get('OpisProblema') + "</textarea></td></tr>";
                    if(!Session.get("isAdmin"))
                        problem = "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>" + Session.get('OpisProblema') + "</textarea></td></tr>";

                    if(Session.get('aktivnost') == 'otvoren')
                        return Spacebars.SafeString(
                            "<table id='tableAdd' style='width: 100%'>" +
                            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>" + Session.get('Komitent') + "</td>" +
//                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>" + Session.get('prioritet') + "</td></tr>" +
                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:</label>"+selectPriorities_()+"</td></tr>" +
                            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus'>" + Session.get('ProblemPrijavio') + "</textarea></td>" +
                            problem +
                            "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>" +
                            checkBoxToDoUsersEdit() +
                            "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>" +
                            checkBoxIntervenionsEdit() +
                            "</td></tr>" +
                            "<tr><td colspan='2' style='width: 80%'><hr></td></tr>" +
                            "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus'>" + Session.get('Napomena') + "</textarea></td></tr>" +
                            "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
                            "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja' value='" + Session.get('DatumOtvaranja') + "' disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='" + Session.get('tiketOtvorio') + "' disabled></td></tr>" +
                            "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo' value='" + " " + "'                           disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='" + Session.get('aktivnost') + "' disabled></td></tr>" +
                            "</table></td></tr>" +
                            "</table>" +
                            "<br style='clear: both;' />");
                    else
                    var materijal = "";
                    if (getService(Session.get('service_Id')) != 'DA Fratello')
                        materijal =
                            "<table id='materijal' width='520px' border='0'>"+
                            "<tr>" +
                            "<td style='width: 60%;text-align: left;padding-top: 5px;'>"+
                            "<button id='addRow' type='button' class='btn btn-primary btn-xs'>Add Row</button>"+
                            "&nbsp;&nbsp;" +
                            "<strong>Materijal / rez delovi:</strong>" +
                            "</td>"+
                            "<td style='width: 20%;text-align: left;padding-top: 5px;'>"+
                            "<strong>kol:</strong>"+
                            "</td>"+
                            "<td style='width: 20%;text-align: left;padding-top: 5px;'>"+
                            "<button id='deleteRow' type='button' class='btn btn-warning btn-xs'>Delete Row</button>"+
                            "</td>"+
                            "</tr>"+
                            getMaterijal()+
                            /*                        "<tr>"+
                             "<td style='text-align: left;padding-top: 5px;'><input type='text' name='materijal[]' size="35"></td>"+
                             "<td style='text-align: left;padding-top: 5px;'><input type='text' name='kol[]' size="5"></td>"+
                             "<td style='text-align: left;padding-top: 5px;'><input type='checkbox' name='chkbox[]' size="5"></td>"+
                             "</tr>"+*/
                            "</table>"+
                            "<br style='clear: both;' />";
//                console.log (materijal);
                        return Spacebars.SafeString(
                            "<table id='tableAdd' style='width: 100%'>" +
                            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>" + Session.get('Komitent') + "</td>" +
//                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>" + Session.get('prioritet') + "</td></tr>" +
                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:</label>"+selectPriorities_()+"</td></tr>" +
                            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus'>" + Session.get('ProblemPrijavio') + "</textarea></td>" +
                            problem +
                            "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>" +
                            checkBoxToDoUsersEdit() +
                            "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>" +
                            checkBoxIntervenionsEdit() +
                            "</td></tr>" +
                            "</table>"+
                            materijal +
                            "<table id='tableAdd' style='width: 100%'>" +
                            "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisResenja'>Opis rešenja:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisResenja' placeholder='Opis rešenja' autofocus='autofocus'>" + Session.get('OpisResenja') + "</textarea></td>" +
                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Napomena'>Napomena:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus'>" + Session.get('Napomena') + "</textarea></td></tr>" +
                            "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
                            "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja' value='" + Session.get('DatumOtvaranja') + "' disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='" + Session.get('tiketOtvorio') + "' disabled></td></tr>" +
                            "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo' value='" + Session.get('DatumToDo') + "' disabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='" + Session.get('aktivnost') + "' disabled></td></tr>" +
                            "<tr><td style='width: 50%;text-align: left;'>Tiket zatvoren      <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumZatvaranja' value='" + Session.get('DatumZatvaranja') + "' disabled></td>  <td style='width: 50%;text-align: left;'>" +
                            "&nbsp;Zatvori ticket  --------> &nbsp;<input type='checkbox' name='zatvaranje' value='zatvaranje'><br></td></tr>" +
                            "</table></td></tr>" +
                            "</table>" +
                            "<br style='clear: both;' />");
                } else {
                    var checkBox = '';
                    if (Session.get('isClientSuperUser') && Session.get('isZaduzenja')) {
                        var checkBoxToDoUsersEdit_ = checkBoxToDoUsersEdit();
                        if (checkBoxToDoUsersEdit_.length)
                            checkBox = "<tr><td style='width: 30%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>" +
                            checkBoxToDoUsersEdit_ +
                            "</td><td style='width: 30%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>" +
                            checkBoxIntervenionsEdit() +
                            "</td></tr>";
                    }
                    var prioritet =
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>" + Session.get('prioritet') + "</td></tr>";
                    if (Session.get('isClientSuperUser') && Session.get('isZaduzenja')) {
                        prioritet =
                            "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:</label>"+selectPriorities_()+"</td></tr>";
                    }
                    return Spacebars.SafeString(
                        "<table id='tableAdd' style='width: 100%'>" +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>" + Session.get('Komitent') + "</td>" +
                        prioritet +
                        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>" + Session.get('ProblemPrijavio') + "</textarea></td>" +
                        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>" + Session.get('OpisProblema') + "</textarea></td></tr>" +
                        "<tr><td colspan='2' style='width: 80%;margin-top: -15px;'><hr></td></tr>" +
                        checkBox +
                        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' enabled>" + Session.get('Napomena') + "</textarea></td></tr>" +
                        "<tr><td colspan='2'><table style='width: 100%;'><tr>" +
                        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Datum i vreme<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_DatumOtvaranja' value='" + Session.get('DatumOtvaranja') + "' disabled></td>" +
                        "<td style='width: 40%;text-align: center;padding-top: 5px;'>Tiket otvorio<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_TiketOtvorioF' value='" + Session.get('tiketOtvorio') + "' disabled>" +
                        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Status       <input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_Aktivnost' value='" + Session.get('aktivnost') + "' disabled></td></tr>" +
                        "</table></td></tr>" +
                        "</table>" +
                        "<br style='clear: both;' />");

                }
            case 'view_':
                return Spacebars.SafeString(
                    "<table id='tableAdd' style='width: 100%'>" +
                    "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>"+Session.get('Komitent')+"</td>" +
                    "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>"+ Session.get('prioritet') +"</td></tr>" +
                    "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>"+Session.get('ProblemPrijavio')+"</textarea></td>" +
                    "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>"+Session.get('OpisProblema')+"</textarea></td></tr>" +
                    "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>"+
                    checkBoxToDoUsersView()+
                    "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>"+
                    checkBoxIntervenionsView()+
                    "</td></tr>"+
                    "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Opis resenja<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_OpisResenja' placeholder='Opis rešenja' autofocus='autofocus' disabled>"+Session.get('OpisResenja')+"</textarea></td></tr>" +
                    "<tr><td colspan='2' style='width: 80%;'><hr></td></tr>"+
                    "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>"+Session.get('Napomena')+"</textarea></td></tr>" +
                    "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
                    "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja'  value='"+datePicker(Session.get('DatumOtvaranja'))  +"' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='"+ Session.get('tiketOtvorio') +"' disabled></td></tr>" +
                    "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo'       value='"+datePicker(Session.get('DatumToDo'))       +"' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='"+ Session.get('aktivnost') +"' disabled></td></tr>" +
                    "<tr><td style='width: 50%;text-align: left;'>Tiket zatvoren      <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumZatvaranja' value='"+datePicker(Session.get('DatumZatvaranja')) +"' enabled></td>  <td style='width: 50%;text-align: left;'>" +
                    "&nbsp;Naplacen  -------------> &nbsp;<input type='checkbox' name='naplacen' "+chkPicker(Session.get('Naplacen')) +"><br></td></tr>" +
                    "</table></td></tr>" +
                    "</table>"+
                    "<br style='clear: both;' />");
            case 'email':
                var to = clients.find({_id: Session.get('KomitentToDo')}).fetch()[0].Email;
                if(!to) to = '';
                if (Session.get('Zatvorio'))
                    var radove_izvrsio = Session.get('Zatvorio')
                else
                    var radove_izvrsio = Session.get('ImePrezime');
                var servis = getService(Session.get('service_Id'));
                if ((servis == 'DA Fratello') || (servis == 'MOOD Media')){
                    var subject ='Radni nalog Fratello d.o.o.';
                    var body = '<div>Poštovani,<br />' +
                        'U prilogu ove poruke se nalazi radni nalog.<br />' +
                        'Molim Vas da dokument potpišete i time potvrdite izvršene radove i eventualno utrošeni materijal. <br />' +
                        '<br />' +
                        '<strong>Radove izvršio: ' + radove_izvrsio + '</strong><br /><br />' +
                        '<p style="text-align: left"><strong>DaFratello D.O.O.</strong><br/>' +
                        'Braće Ribnikara 37<br/>' +
                        '11000 Belgrade. Serbia<br/>' +
                        'Phone : +381.11.30.86.024<br/>' +
                        'Fax : +381.11.30.86.025<br/>' +
                        'Visit us: <a href="http://www.fratello.rs">www.fratello.rs</a>' +
                        '</p>' +
                        '</div>' +
                        '<hr>' +
                        '<div class="hero-unit" style="text-align: center">' +
                        '<h6><em>Copyright &copy; ' + '2017' + ' by DA Fratello.</em><br/>All Rights Reserved.</h6>' +
                        '</div>';
                } else {
                    var subject ='Radni nalog McD Service';
                    var body = '<div>Poštovani,<br />' +
                        'U prilogu ove poruke se nalazi radni nalog.<br />' +
                        'Molim Vas da dokument potpišete i time potvrdite izvršene radove i eventualno utrošeni materijal. <br />' +
                        '<br />' +
                        '<strong>Radove izvršio: ' + radove_izvrsio + '</strong><br /><br />' +
                        '<p style="text-align: left"><strong>McD Service</strong><br/>' +
                        'Pozeska 98a<br/>' +
                        '11000 Belgrade. Serbia<br/>' +
                        'Phone : +381 11 355 98 64<br/>' +
                        'Fax : +381 11 355 98 64<br/>' +
                        'Visit us: <a href="http://www.mcdonalds.rs/">www.mcdonalds.rs/</a>' +
                        '</p>' +
                        '</div>' +
                        '<hr>' +
                        '<div class="hero-unit" style="text-align: center">' +
                        '<h6><em>Copyright &copy; ' + '2017' + ' by DA Fratello.</em><br/>All Rights Reserved.</h6>' +
                        '</div>';
                }
                Session.set('bodyRN', body);
                return Spacebars.SafeString(
                        "<table style='width: 100%'>" +
                        "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_to'>Za:</label></td><td style='width: 80%'><input type='text' style='height:22px;width:100%' class='form-control' id='m_to' value='"+to+"' ></td></tr>" +
                        "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_subject'>Naslov:</label></td><td style='width: 80%'><input type='text' style='height:22px;width:100%' class='form-control' id='m_subject' value='" + subject + "' /></td></tr>" +
                        "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label>Poruka:</label></td><td style='width: 80%;background-color: #dddddd' >"+body+"</td></tr>" +
                        "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_message'>Dodatak poruci:</label></td><td style='width: 80%'><textarea rows='3' style='height:42px;width:100%; resize: none;' class='form-control' id='m_message'></textarea></td></tr>" +
                        "</table>"
                );
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")) {
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterCancel') + '</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">' + i18n('tickets.modalFooterAdd') + '</button>');
            case 'groupAdd':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterCancel') + '</button>'
                + '<button id="bGroupAdd" type="button" class="btn btn-success btn-xs">' + i18n('tickets.modalFooterAdd') + '</button>');
            case 'view':
            case 'viewAtt':
                if ((Session.get('aktivnost') == 'otvoren') || (Session.get('aktivnost') == 'u postupku'))
                    return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterClose') + '</button>');
                else
                    return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterCancel') + '</button>'
                    + '<button id="bEdit_" type="button" class="btn btn-primary btn-xs">' + i18n('tickets.modalFooterChange') + '</button>'
                    + '<button id="bReOpen" type="button" class="btn btn-success btn-xs">' + i18n('tickets.modalFooterReOpen') + '</button>');

            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterCancel') + '</button>'
                + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">' + i18n('tickets.modalFooterChange') + '</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterNo') + '</button>'
                + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">' + i18n('tickets.modalFooterYes') + '</button>');
            case 'email':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Odustani</button>'
                + '<button id="bEmail" type="button" class="btn btn-warning btn-xs">Slanje emaila</button>');

            case 'view_':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">' + i18n('tickets.modalFooterCancel') + '</button>'
                + '<button id="bEdit__" type="button" class="btn btn-primary btn-xs">' + i18n('tickets.modalFooterChange') + '</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Actions', sortable: true,
                    fn: function (value, object) {
                        var view =
                            '<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipView') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view'" + ');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                        if (object.AttFile > '')
                            view =
                                '<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipView') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','viewAtt'" + ');" class="label label-info tooltip-right"><i class="glyphicon glyphicon-file"></i></a>';
                        var edit =
                            '<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipEdit') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','edit'" + ');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                        var delete_ =
                            '<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipDelete') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','delete'" + ');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        var e_mail =
                            '<a data-toggle="modal" data-tooltip="email" data-target="#modalTickets" onclick="Session.set(' + "'activity','email'" + ');" class="label label-warning tooltip-right"><i class="glyphicon glyphicon-envelope"></i></a>'

//                        getActivitiesIDs();
                        if(object.Aktivnost == Session.get('IdZatvoreni')){

                            if(Session.get("username") != 'nilija') {
                                delete_ = '';
                            }
                            if (!object.Naplacen) {
//                            var xx = '✅';
//                            return xx;
                                return new Spacebars.SafeString(
                                view
                                + e_mail
                                +'<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipNaplata') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view_'" + ');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-check"></i></a>'
                                + delete_
                                );
                            }
                            else {
                                return new Spacebars.SafeString(
                                view
                                + e_mail
                                +'<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipNaplaceno') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view_'" + ');" class="label label-success tooltip-right"><i class="glyphicon glyphicon-ok"></i></a>'
                                + delete_
                                );
                            }
/*
                            return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipView') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view'" + ');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                + '<a data-toggle="modal" data-tooltip="email" data-target="#modalTickets" onclick="Session.set(' + "'activity','email'" + ');" class="label label-warning tooltip-right"><i class="glyphicon glyphicon-envelope"></i></a>'
                            );
*/
                        }

                        if(!Session.get("isAdmin")) {
                            return new Spacebars.SafeString(
                                view
                                + edit
                            );
                        } else {
                            return new Spacebars.SafeString(
                                view
                                + edit
                                + delete_
                            );
                        }
                    }
                },
                //{ key: 'ToDo', label: 'ToDo'},
//                { key: 'ageRange', label: Template.ageRangeColumnLabel, labelData: {ageFrom: 18, ageTo: 50}}
/*                { key: 'Naplacen', label: 'N',
                    fn: function(value, object){
//                        var prioritet = getPrioritet(object.Prioritet);
                        if (getAktivnost(object.Aktivnost) == 'zatvoren')
                        {
                            if (!object.Naplacen) {
//                            var xx = '✅';
//                            return xx;
                                return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipDelete') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view_'" + ');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-check"></i></a>');
                            }
                            else {
                                return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="' + i18n('tickets.tooltipDelete') + '" data-target="#modalTickets" onclick="Session.set(' + "'activity','view_'" + ');" class="label label-success tooltip-right"><i class="glyphicon glyphicon-ok"></i></a>');
                            }
                        }
                        else
                        return null;
                    }*//*,
                    hidden: function () {
                        if (object.Naplacen)
                            return false;
                        else
                        return true;
                    }*//*
                },*/
                { key: 'RBR', label: 'RBR', hidden: true },
                { key: 'Komitent', label: 'Komitent'},
                { key: 'DatumOtvaranja', label: 'Otvoren', sortable: true},
                { key: 'Zaduzen', label: 'Zadužen'},
                { key: 'OpisProblema', label: 'Problem'},
                { key: 'Prioritet', label: 'Prioritet',
                    fn: function(value, object){
                        var prioritet = getPrioritet(object.Prioritet);
                        return prioritet;
                    }
                },
                { key: 'Napomena', label: 'Napomena'},
                { key: 'OpisResenja', label: 'Rešenje'},
                { key: 'Aktivnost', label: i18n('tickets.fieldAktivnostGridLabel'),
                    fn: function(value, object){
                        var aktivnost = getAktivnost(object.Aktivnost);
                        return aktivnost;
                    }
                },
                { key: 'Servis', label: 'Servis',
                    fn: function(value, object) {
                        var service = getService(object.Servis);
                        return service;
                    }
                },
                { key: 'Poreklo', label: 'Poreklo', hidden: true },
                { key: 'PorekloZ', label: 'PorekloZ', hidden: true },
                { key: 'DatumZatvaranja', label: 'DatumZatvaranja', hidden: true }
            ],


            filters: ['myFilter'],


//            rowClass: function(item) {},
            rowClass: function(item) {
                var aktivnost = getAktivnost(item.Aktivnost);
                //
                switch (aktivnost) {
                    case 'otvoren':
                        return 'success';
                    case 'zatvoren':
                        return 'danger';
                    default:
                        return '';
                }
            },
            responsive: true,  // Responsive support https://github.com/aldeed/meteor-tabular/issues/201
            autoWidth: false,  // Responsive support. prevent width:px
//            showFilter: true,
            rowsPerPage:50,
            showNavigation:'always', //  always never auto
            useFontAwesome: true,
            showNavigationRowsPerPage: true,
            showColumnToggles:true,
            class: "table table-striped table-bordered table-hover table-condensed display table-responsive no-wrap"

//            class: "table table-striped table-hover" // table table-striped table-bordered table-hover table-condensed
        }
    }
});

Template.tickets.events({
    'change #m_Services': function(event, template) {  // ------------------> SUPER menja i zaposlene --------------
//        event.preventDefault();

        var servis = $("#m_Services option:selected").val();
        Session.set('service_Id', servis);
        var prioritet = selectPriorities();
        document.getElementById("me").innerHTML = "<br>" + prioritet;

//        $(servis).appendTo('#me');
//        $( "me" ).text( servis );
//        $("#me").append("You selected: " + servis);
//        $("<tr id='"+trNo+"'><td style='width: 100%;text-align: left;padding-top: 5px;'>"+selectClients()+"</td><td style='width: 100%;text-align: left;padding-top: 5px;'><span id='ObrisiKorisnika' to-remove='"+trNo+"' to-remove-select='"+trNoSelect+"' data-tooltip='Obriši korisnika' class='btn btn-danger btn-xs tooltip-left pull-right'><i class='glyphicon glyphicon-minus'></i></span></td></tr>").appendTo('#grupniKomitenti');
//        $("#results").append(field.name + ":" + field.value + ", ");
//        $( "div" ).text( str );
//             document.getElementById("demo").innerHTML = "You selected: " + x;
    },

    'click .js-download-pdf': function () {
//        event.preventDefault();
        alert ('click');
        Meteor.call('downloadPdf', function(error, pdf) {
            alert (pdf);
            window.open(pdf);
//            window.open("data:application/pdf;base64, " + pdf);
        });
    },
    'change .myFileInput': function(event, template) {

/*        var files = event.target.files;
        console.log (event.target.files);
        var fi = document.getElementById('files'); // GET THE FILE INPUT AS VARIABLE.
        console.log (fi.files);*/
        Session.set('images', undefined);
        var ln = event.target.files.length;
        if  (ln < 4) {
            var fruits = [];

            FS.Utility.eachFile(event, function (file) {
            if (file.size <= 5242880 && /avi|doc|docx|mp3|mp4|mpeg|msg|pdf|rtf|tif|tiff|txt|text|xls|xlsx|png|jpg|jpeg|zip/i.test(file.name)) {

                //               if (!fileInput.files[0].name.match(/.(jpg|jpeg|png|gif)$/i))

                images.insert(file, function (err, fileObj) {
//                    alert (fileObj.extension());
                    /*                    console.log(fileObj.url);
                     console.log(fileObj);*/
                    if (err) {
                        // handle error
                        console.log ('err - images.insert:');
                        console.log(err);
//                        alert (err);
                    } else {
                        // handle success depending what you need to do
// *******************                                                                  ovo me skupo kostalo:
//                         https://stackoverflow.com/questions/46231030/uploading-fails-for-some-files-client-refreshes-multiple-times-cfs
//                         https://www.keycdn.com/support/413-request-entity-too-large

                         var liveQuery = images.find(fileObj._id).observe({
                            changed: function(newImage, oldImage) {
                            if (newImage.url() != null) {
                                liveQuery.stop();
                                    // Here the image is uploaded successfully.
                                fruits.push(fileObj._id + "-" + fileObj.name());
//                    Meteor.users.update(userId, {$set: imagesURL});

                                Session.set('images', fruits);
                                }
                            }
                         });
// *******************
//                        console.log (Session.get('images'));
                    }
                });
            }
                else {
                    alert('*** tip ili velicina (<5MB) fajla           nisu odgovarajuci: ' + file.name) ;
                    console.log('*** tip ili velicina (<5MB) fajla nisu odgovarajuci: ' + file.name) ;
                    console.log(file);
                };

            })
        }
        else
            alert ('mozete uneti do 3 fajla');
    },
    'click #ObrisiKorisnika': function(event, object){
        //console.log(event.currentTarget.attributes[1].value);
        var id = event.currentTarget.attributes[1].value;
        var idSelect = event.currentTarget.attributes[2].value;
        $('#'+id).remove();
        var kor = Session.get("KorisniciArr");
        var index = kor.indexOf(id);
        kor.splice(index, 1);
        Session.set('KorisniciArr', kor);
        var korSelect = Session.get("KorisniciArrSelect");
        var indexSelect = korSelect.indexOf(idSelect);
        korSelect.splice(indexSelect, 1);
        Session.set('KorisniciArrSelect', korSelect);
        //console.log('afterRemove '+id+'  '+Session.get("KorisniciArr"));
    },
    'click #DodajKorisnika': function(event){
        Session.set('KorisnikNo', Session.get('KorisnikNo')+1);
        var trNo = "trNo"+Session.get('KorisnikNo');
        var trNoSelect = "m_KorisniciX"+Session.get('KorisnikNo');
        var kor = Session.get('KorisniciArr');
        if(kor.length==0)
            kor.push('trNo1');
        kor.push(trNo);
        Session.set('KorisniciArr', kor);
        var korSelect = Session.get('KorisniciArrSelect');
        if(korSelect.length==0)
            korSelect.push('m_KorisniciX1');
        korSelect.push(trNoSelect);
        Session.set('KorisniciArrSelect', korSelect);
        //Session.set('KorisniciArr', Session.get('KorisniciArr').push(trNo));
        //console.log('Arr '+Session.get('KorisniciArr'));
        $("<tr id='"+trNo+"'><td style='width: 100%;text-align: left;padding-top: 5px;'>"+selectClients()+"</td><td style='width: 100%;text-align: left;padding-top: 5px;'><span id='ObrisiKorisnika' to-remove='"+trNo+"' to-remove-select='"+trNoSelect+"' data-tooltip='Obriši korisnika' class='btn btn-danger btn-xs tooltip-left pull-right'><i class='glyphicon glyphicon-minus'></i></span></td></tr>").appendTo('#grupniKomitenti');
    },
    'click #bPrint': function(event){
        //console.log(Session.get('fOtvoreni')+' '+Session.get('fPostupak')+' '+Session.get('fZatvoreni'));
    },
    'click #bEmail': function(event){
        var eTo = $('#m_to').val();
        var eSubject = $('#m_subject').val();
        var eDodatak = $('#m_message').val();
        var eBody = Session.get('bodyRN');
        if(eDodatak.length > 1){
            eBody += '<br /><br /><strong>Napomena:<br /></strong>'+eDodatak+'<br />';
        }

        var to = clients.find({_id: Session.get('KomitentToDo')}).fetch();
        
        var servis = getService(Session.get('service_Id'));
        if (Session.get('ZatvorioUsername'))
            var izvrsilacBroj = Session.get('ZatvorioUsername')
        else
            var izvrsilacBroj = Session.get('username');
//        var izvrsilacBroj = Session.get('username');
        var radniNalogBroj = Session.get('RBR');
        var datumNaloga = Session.get('DatumZatvaranja');
        var problemNaloga = Session.get('OpisProblema');
        var komitent = to[0].Komitent;
        var lokacija = to[0].Lokacija;
        var mesto = to[0].Mesto;
        var adresa = to[0].Adresa;
        var resenje = Session.get('OpisResenja');
        if (Session.get('Zatvorio'))
            var izvrsilac = Session.get('Zatvorio')
        else
            var izvrsilac = Session.get('ImePrezime');
//        var izvrsilac = Session.get('ImePrezime');
        var materijal = Session.get('Materijal');
        var kol = Session.get('Kol');
//        alert ('servis ' + servis);
        try {
            Meteor.call('praviRadniNalog', servis, izvrsilacBroj, radniNalogBroj, datumNaloga, problemNaloga, komitent, lokacija, mesto, adresa, resenje, izvrsilac, materijal, kol,  function(error, t) {
                if(!error) {
//                    console.log(t);
                    Meteor.call('saljiEmail_RN', eTo, eSubject, eDodatak, eBody, t,  function(error, result){


                    });




                    $.growl('<strong>Uspešno poslat Email klijentu!</strong>', {
                        type: 'success', z_index: 99999, allow_dismiss: false
                    });
                } else {
                    $.growl('<strong>Neuspešno!!</strong><br />'+error, {
                        type: 'danger', z_index: 99999, allow_dismiss: false
                    });
                }
            });
        }
        catch(err) {
            $.growl('<strong>Neuspešno!!</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }

        $('#modalTickets').modal('hide');
    },
    'click #fCbs0': function(event){
        //console.log ("onda ovde click fotvoreni");
//        getActivitiesIDs();
        Session.set('fCbs0', !Session.get('fCbs0'));
        $('#cbs0').prop("checked", !$('#cbs0').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fCbs1': function(event){
        //console.log ("onda ovde click fotvoreni");
//        getActivitiesIDs();
        Session.set('fCbs1', !Session.get('fCbs1'));
        $('#cbs1').prop("checked", !$('#cbs1').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fCbs2': function(event){
        //console.log ("onda ovde click fotvoreni");
//        getActivitiesIDs();
        Session.set('fCbs2', !Session.get('fCbs2'));
        $('#cbs2').prop("checked", !$('#cbs2').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fCbs3': function(event){
        //console.log ("onda ovde click fotvoreni");
//        getActivitiesIDs();
        Session.set('fCbs3', !Session.get('fCbs3'));
        $('#cbs3').prop("checked", !$('#cbs3').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fOtvoreni': function(event){
        //console.log ("onda ovde click fotvoreni");
//        getActivitiesIDs();
        Session.set('fOtvoreni', !Session.get('fOtvoreni'));
        $('#cb1').prop("checked", !$('#cb1').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb1').toggle('this.checked');
    },
    'click #fPostupak': function(event){
//        getActivitiesIDs();
        Session.set('fPostupak', !Session.get('fPostupak'));
        $('#cb2').prop("checked", !$('#cb2').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb2').toggle('this.checked');
    },
    'click #fZatvoreni': function(event){
//        getActivitiesIDs();
        Session.set('fZatvoreni', !Session.get('fZatvoreni'));
        $('#cb3').prop("checked", !$('#cb3').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb3').toggle('this.checked');
    },
   'click #fHold': function(event){
//        getActivitiesIDs();
        Session.set('fHold', !Session.get('fHold'));
        $('#cb4').prop("checked", !$('#cb4').prop("checked"));
        // sklanjanje checkbox polja - postaje nevidljivo
        //$('#cb4').toggle('this.checked');
    },
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            var prioritetT  = getPrioritet(this.Prioritet);
            var imePrezimeT = getImePrezime(this.TiketOtvorio);
            var aktivnostT  = getAktivnost(this.Aktivnost);
            Session.set('prioritet', prioritetT);
            Session.set('tiketOtvorio', imePrezimeT);
            Session.set('aktivnost', aktivnostT);

            Session.set('_id', this._id);
            Session.set('Aktivnost', this.Aktivnost);
            Session.set('service_Id', this.Servis);
            Session.set('Naplacen', this.Naplacen);
            Session.set('Prioritet', this.Prioritet);
            Session.set('DatumOtvaranja', this.DatumOtvaranja);
            Session.set('DatumToDo', this.DatumToDo);
            Session.set('DatumZatvaranja', this.DatumZatvaranja);
            Session.set('KomitentToDo', this.KomitentToDo);
            Session.set('TiketOtvorio', this.TiketOtvorio);
            Session.set('ZaposleniToDo', this.ZaposleniToDo);
            Session.set('Komitent', this.Komitent);
            Session.set('Zona', this.Zona);
            Session.set('Napomena', this.Napomena);
            Session.set('OpisProblema', this.OpisProblema);
            Session.set('OpisResenja', this.OpisResenja);
            Session.set('ProblemPrijavio', this.ProblemPrijavio);
            Session.set('ToDo', this.ToDo);
            Session.set('Zaduzen', this.Zaduzen);
            Session.set('Intervencija', this.Intervencija);
            Session.set('Zatvorio', this.Zatvorio),
            Session.set('ZatvorioUsername', this.ZatvorioUsername),
            Session.set('AttFile', this.AttFile);
            Session.set('Materijal', this.Materijal);
            Session.set('Kol', this.Kol);
            Session.set('RBR', this.RBR);
        }
    },

    'click #bAdd': function(event) {
/*        alert (document.getElementById("files"));
        alert ($('#files').val());*/
        var err = validateInput_TicketsOtvaranje();
        if(err == 0) {

            var attFile = [];
            if (Session.get('images')) {
                attFile = Session.get('images');
            }
            var x = [];

            ticket = {
                'Aktivnost': Session.get('IdOtvoreni'),
                'Servis': $("#m_Services option:selected").val(),
                'Prioritet': $('#m_Prioritet').val(),
                'Year': currentDateTime().substr(0, 4),
                'DatumOtvaranja': currentDateTime(),
                'DatumToDo': '',
                'DatumZatvaranja': '',
                'KomitentToDo': $('#m_KorisniciX1').val(),
                'TiketOtvorio': Session.get('userID'),
                'ZaposleniToDo': x,
                'Komitent': $('#m_KorisniciX1>option:selected').html(),
                'Zona': '100',
                'Napomena': $('#m_Napomena').val(),
                'OpisProblema': $('#m_OpisProblema').val(),
                'OpisResenja': '',
                'ProblemPrijavio': $('#m_ProblemPrijavio').val(),
                'ToDo': tickets.find({"Aktivnost": {$ne: Session.get('IdZatvoreni')}}).count() + 1,
                'Zaduzen': '---',
                'AttFile' : attFile,
                'Intervencija': x,
                'Poreklo': '0'
            };

            bAdd_insert (ticket);

            $('#modalTickets').modal('hide');
        }
    },
    'click #bGroupAdd': function(event) {
        var err = validateInput_TicketsOtvaranje();
        if(err == 0) {
            var x = [];

            var korSelect = Session.get("KorisniciArrSelect");
            if (korSelect.length == 0) {
                //console.log('KomitentToDo '+$('#m_KorisniciX1').val());
                //console.log('Komitent '+$('#m_KorisniciX1>option:selected').html());
                //console.log('Prioritet '+$('#m_Prioritet').val());
                //console.log('ProblemPrijavio '+$('#m_ProblemPrijavio').val());
                //console.log('OpisProblema '+$('#m_OpisProblema').val());
                //console.log('Napomena '+$('#m_Napomena').val());
                //console.log('DatumOtvaranja '+currentDateTime());
                //console.log('TiketOtvorio '+Session.get('userID'));
                //console.log('Aktivnost '+Session.get('IdOtvoreni'));
                ticket = {

                    'Aktivnost': Session.get('IdOtvoreni'),
                    'Servis': $("#m_Services option:selected").val(),
                    'Prioritet': $('#m_Prioritet').val(),
                    'Year': currentDateTime().substr(0, 4),
                    'DatumOtvaranja': currentDateTime(),
                    'DatumToDo': '',
                    'DatumZatvaranja': '',
                    'KomitentToDo': $('#m_KorisniciX1').val(),
                    'TiketOtvorio': Session.get('userID'),
                    'ZaposleniToDo': x,
                    'Komitent': $('#m_KorisniciX1>option:selected').html(),
                    'Zona': '100',
                    'Napomena': $('#m_Napomena').val(),
                    'OpisProblema': $('#m_OpisProblema').val(),
                    'OpisResenja': '',
                    'ProblemPrijavio': $('#m_ProblemPrijavio').val(),
                    'ToDo': tickets.find({"Aktivnost": {$ne: Session.get('IdZatvoreni')}}).count() + 1,
                    'Zaduzen': '---',
                    'Intervencija': x,
                    'Poreklo': '0'
                };

                bAdd_insert (ticket);

            } else {
                for (var arrayIndex in korSelect) {
                    //console.log($('#'+korSelect[arrayIndex]).val());
                    //console.log($('#'+korSelect[arrayIndex]+'>option:selected').html());
                    ticket = {
//                          'KomitentToDo': $('#'+korSelect[arrayIndex]).val(),
//                          'Komitent': $('#'+korSelect[arrayIndex]+'>option:selected').html(),

                        'Aktivnost': Session.get('IdOtvoreni'),
                        'Servis': $("#m_Services option:selected").val(),
                        'Prioritet': $('#m_Prioritet').val(),
                        'Year': currentDateTime().substr(0, 4),
                        'DatumOtvaranja': currentDateTime(),
                        'DatumToDo': '',
                        'DatumZatvaranja': '',
                        'KomitentToDo': $('#' + korSelect[arrayIndex]).val(),
                        'TiketOtvorio': Session.get('userID'),
                        'ZaposleniToDo': x,
                        'Komitent': $('#' + korSelect[arrayIndex] + '>option:selected').html(),
                        'Zona': '100',
                        'Napomena': $('#m_Napomena').val(),
                        'OpisProblema': $('#m_OpisProblema').val(),
                        'OpisResenja': '',
                        'ProblemPrijavio': $('#m_ProblemPrijavio').val(),
                        'ToDo': tickets.find({"Aktivnost": {$ne: Session.get('IdZatvoreni')}}).count() + 1,
                        'Zaduzen': '---',
                        'Intervencija': x,
                        'Poreklo': '0'
                    };

                    bAdd_insert (ticket, arrayIndex);
                }
            }

            $('#modalTickets').modal('hide');
            $('#grupniKomitenti').html('');
        }
    },
    'click #bReOpen': function(event) {
//        var err = validateInput_TicketsOtvaranje();
        var err = 0;
        if(err == 0) {
            var x = [];
            ticket = {

                'Aktivnost': Session.get('IdOtvoreni'),
                'Servis': Session.get('service_Id'),
                'Prioritet': Session.get('Prioritet'),
                'Year': currentDateTime().substr(0, 4),
                'DatumOtvaranja': currentDateTime(),
                'DatumToDo': '',
                'DatumZatvaranja': '',
                'KomitentToDo': Session.get('KomitentToDo'),
                'TiketOtvorio': Session.get('userID'),
                'ZaposleniToDo': x,
                'Komitent': Session.get('Komitent'),
                'Zona': '100',
                'Napomena': $('#m_Napomena').val(),
                'OpisProblema': $('#m_OpisProblema').val(),
                'OpisResenja': '',
                'ProblemPrijavio': $('#m_ProblemPrijavio').val(),
                'ToDo': tickets.find({"Aktivnost": {$ne: Session.get('IdZatvoreni')}}).count() + 1,
                'Zaduzen': '---',
                'AttFile' : Session.get('AttFile'),
                'Intervencija': x,
                'Poreklo': '0'
            };

            Session.set('images', Session.get('AttFile'));
            bAdd_insert (ticket);

            $('#modalTickets').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        event.preventDefault();
        var zaduzen = '';
        var userToDo = [];
        i = 0;
        $('input[name=user]:checked').each(function () {
            userToDo.push($(this).val());
            zaduzen += ' - ' + usersAll.findOne({_id: $(this).val()}).profile.ImePrezime;
//            zaduzen += '- ' + usersAll.findOne({_id: $(this).val()}).profile.ImePrezime + ' ';

            i++;
        });
        var intervencija = [];
        $('input[name=intervencija]:checked').each(function () {
            intervencija.push($(this).val());
//            i++;  ----------- ako treba može da se validira ------
        });
        /*            console.log( $('#materijal[]').val());*/
        var materijal = [];
        $("input[name^='materijal']").each(function () {
            materijal.push($(this).val());
//                console.log(materijal);
        });
        var kol = [];
        $("input[name^='kol']").each(function () {
            kol.push($(this).val());
//                console.log(kol);
        });

        /*            var materijal_ = [];
         for (i = 0; i < kol.length; i++) {
         materijal_.push(materijal[i]);
         materijal_.push(kol[i]);
         }*/
        Session.set('zatvaranje', false);
        if ($('input[name="zatvaranje"]').is(':checked'))
        {
            Session.set('zatvaranje', true);
        }
/*
        if ($('input.checkbox_check').prop('checked'))
        if ($('#checkbox').attr('checked')) {
        if($("#zatvaranje").is(':checked')) {
        console.log("checkeddddddddddddd");
        }
        else
        {
        console.log("nijeeeeeeeeeeeeeee");};
*/

        var err = validateInput_TicketsOtvoren(i);
        if (err == 0) {
            var aktivnost = '';
            if ((Session.get('aktivnost') == 'otvoren') || (Session.get('aktivnost') == 'u postupku')) {
                if (!Session.get('zatvaranje')) {
//                    console.log(userToDo.length);
                    if(userToDo.length > 0)
                         aktivnost = Session.get('IdPostupak');
                    else {
                        aktivnost = Session.get('IdOtvoreni');
                        zaduzen = '---';
                    }
                    var properties = {
                        Aktivnost: aktivnost,
                       'Servis': $("#m_Services option:selected").val(),
                       'Prioritet': $('#m_Prioritet').val(),
                        ProblemPrijavio: $('#m_ProblemPrijavio').val(),
                        OpisProblema: $('#m_OpisProblema').val(),
                        OpisResenja: $('#m_OpisResenja').val(),
                        Napomena: $('#m_Napomena').val(),
                        ZaposleniToDo: userToDo,
                        Zaduzen: zaduzen,
                        Intervencija: intervencija,
                        DatumToDo: currentDateTime()
                    };
                }
                else
//                        ********************    zatvaranje
                {
                    aktivnost = Session.get('IdZatvoreni');
                    var properties = {
                        Aktivnost: aktivnost,
                       'Servis': $("#m_Services option:selected").val(),
                        ProblemPrijavio: $('#m_ProblemPrijavio').val(),
                        OpisProblema: $('#m_OpisProblema').val(),
                        OpisResenja: $('#m_OpisResenja').val(),
                        Napomena: $('#m_Napomena').val(),
                        ZaposleniToDo: userToDo,
                        Zaduzen: zaduzen,
                        Intervencija: intervencija,
                        Zatvorio: Session.get('ImePrezime'),
                        ZatvorioUsername: Session.get('username'),
                        DatumZatvaranja: currentDateTime()
                    }
                };
                if (getService(Session.get('service_Id')) != 'DA Fratello') {
                    properties.Materijal = materijal;
                    properties.Kol = kol;
                }
                properties.PorekloZ = '0';
//            console.log (properties);

                try {
                    tickets.update({'_id': Session.get('_id')}, {$set: properties});

                    // ******************************************************************* za e_mail_to_service
                    if (Session.get('zatvaranje')) {
//                    console.log('2 ' + Session.get('_id'));
                        properties.Postupak = 'Zatvaranje';
                        properties.RBR = Session.get('RBR');
                        properties.Komitent = Session.get('Komitent');
                        properties.Aktivnost = aktivnost;
                        properties.TiketOtvorio = Session.get('TiketOtvorio');
                        properties.Prioritet = $('#m_Prioritet').val();
                        properties.DatumOtvaranja = Session.get('DatumOtvaranja');
                        properties.DatumToDo = Session.get('DatumToDo');

                        e_mail_to_service(properties, Session.get('_id'));
                    }
                    $.growl('<strong>' + i18n('tickets.growlSuccessEdit') + '</strong>', {
                        type: 'success', z_index: 99999, allow_dismiss: false
                    });
                }
                catch (err) {
                    $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />' + err.message, {
                        type: 'danger', z_index: 99999, allow_dismiss: false
                    });
                };

                $('#modalTickets').modal('hide');
            }
        }
    },
    'click #bEdit_': function(event) {
        event.preventDefault();

        if($('input[name="naplacen"]').is(':checked'))
        {
            var properties = {
                Naplacen:         true,
                DatumOtvaranja:   $('#m_DatumOtvaranja').val(),
                DatumToDo:        $('#m_DatumToDo').val(),
                DatumZatvaranja:  $('#m_DatumZatvaranja').val()
            }
        }else
        {
            var properties = {
                Naplacen:         false,
                DatumOtvaranja:   $('#m_DatumOtvaranja').val(),
                DatumToDo:        $('#m_DatumToDo').val(),
                DatumZatvaranja:  $('#m_DatumZatvaranja').val()
            }
        }

        try {
            tickets.update({'_id': Session.get('_id')}, {$set: properties});
            $.growl('<strong>' + i18n('tickets.growlSuccessEdit') + '</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch (err) {
            $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />' + err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalTickets').modal('hide');
    },
    'click #bEdit__': function(event) {
        event.preventDefault();

        if($('input[name="naplacen"]').is(':checked'))
        {
            var properties = {
                Naplacen:         true,
                DatumOtvaranja:   $('#m_DatumOtvaranja').val(),
                DatumToDo:        $('#m_DatumToDo').val(),
                DatumZatvaranja:  $('#m_DatumZatvaranja').val()
            }
        }else
        {
            var properties = {
                Naplacen:         false,
                DatumOtvaranja:   $('#m_DatumOtvaranja').val(),
                DatumToDo:        $('#m_DatumToDo').val(),
                DatumZatvaranja:  $('#m_DatumZatvaranja').val()
            }
        }

        try {
            tickets.update({'_id': Session.get('_id')}, {$set: properties});
            $.growl('<strong>' + i18n('tickets.growlSuccessEdit') + '</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch (err) {
            $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />' + err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalTickets').modal('hide');
    },
    'click #bDelete': function(event) {
        event.preventDefault();
        try {
            tickets.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('tickets.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('tickets.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalTickets').modal('hide');
    },
    'click #bMaterijal': function(event){
        event.preventDefault();
        var x = $("form").serializeArray();
        $.each(x, function(i, field){
            $("#results").append(field.name + ":" + field.value + ", ");
        });
    },
    'click #bClear': function(event){
        event.preventDefault();

        $("#results").append("xx");

    },
    'click #addRow': function(event) {

        var table = document.getElementById('materijal');

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);


        /*    var cell2 = row.insertCell(1);
         cell2.innerHTML = rowCount + 1;*/

        var cell3 = row.insertCell(0);
        var element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "materijal[]";
        element2.size = "38";
//    element2.length="38";
        element2.maxlength="38";
        element2.class='form-control';
        cell3.appendChild(element2);

        var cell3 = row.insertCell(1);
        var element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "kol[]";
        element2.size = "5";
        element2.class='form-control';
        cell3.appendChild(element2);

        var cell1 = row.insertCell(2);
        var element1 = document.createElement("input");
        element1.type = "checkbox";
        element1.name="chkbox[]";
        cell1.appendChild(element1);

    },
    'click #deleteRow': function(event) {

        try {
            var table = document.getElementById('materijal');
            var rowCount = table.rows.length;

            for(var i=0; i<rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[2].childNodes[0];
                if(null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }


            }
        }catch(e) {
            alert(e);
        }
    }
});

Template.tickets.rendered = function() {

    $('#modalTickets').on('shown.bs.modal', function (e) {
        //console.log(Session.get('Aktivnost'));
        if(Session.get('activity')=='add'||Session.get('activity')=='groupAdd') {

//            $('#m_Services').val('xx');
            $('#m_KorisniciX1').val('');
//            $('#m_Prioritet').val('');
/*            var Services = selectServices();
            $('#m_ProblemPrijavio').val(Services);*/
            $('#m_ProblemPrijavio').val('');
            $('#m_OpisProblema').val('');
            $('#m_Napomena').val('');
            //$('#m_DatumOtvaranja').val('');
            //$('#m_TiketOtvorio').val('');
            //$('#m_Aktivnost').val('');
            Session.set('currentDateTime', currentDateTime());
            Session.set('aktivnostNew', 'otvoren');
//        } else {
//            $('#m_Aktivnost').val(Session.get('Aktivnost'));
        }
        //$('#m_Aktivnost').focus();
    });
    //console.log ("$('#fOtvoreni').click();");

    $('.buttonFilter').removeClass('col-sm-8');
//    $('.reactive-table-filter').removeClass('col-sm-8');
    //$.getScript( "assets/js/jquery.multiple.select.js");

    var chkbox_Services = chkboxServices();
    $('.name').html(
        '<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('tickets.title')+'</strong></em></h3>'
    );
    var  reactiveTableFilter = '<div class="row">'
/*    +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('tickets.title')+'</strong></em></h3>'*/
    +'<h3 class="pull-right">'
    + '<small>servisi: </small>'
    + chkbox_Services
    + '&nbsp;&nbsp;'
    + '<small>statusi: </small>'
    + '    <input id="cb1" type="checkbox" value="cOtvoreni"  style="margin-right:-5px;" disabled/><label id="fOtvoreni"  type="" class="btn btn-xs btn-success tooltip-bottom" data-tooltip="Otvoreni"  ><i class="text-success              glyphicon glyphicon-folder-open"></i> </label>'
    + '    <input id="cb2" type="checkbox" value="cPostupak"  style="margin-right:-5px;" disabled/><label id="fPostupak"  type="" class="btn btn-xs btn-info tooltip-bottom"    data-tooltip="U postupku"><i class="text-success text-primary glyphicon glyphicon-file"></i>        </label>'
    + '    <input id="cb3" type="checkbox" value="cZatvoreni" style="margin-right:-5px;" disabled/><label id="fZatvoreni" type="" class="btn btn-xs btn-warning tooltip-bottom" data-tooltip="Zatvoreni" ><i class="text-success text-danger  glyphicon glyphicon-folder-close"></i></label>'
    + '    <input id="cb4" type="checkbox" value="cHold"      style="margin-right:-5px;" disabled/><label id="fHold" type="" class="btn btn-xs btn-danger tooltip-bottom" data-tooltip="Hold" ><i class="text-success text-danger  glyphicon  glyphicon-th-list"></i></label>&nbsp;&nbsp;&nbsp;'
    + '&nbsp;'
    + '<small>otvaranje: </small>';

//    glyphicon glyphicon-off  .btn-danger
        //+'     <a id="bPrint" data-tooltip="'+i18n('tickets.tooltipPrint')+'" class="btn btn-default btn-sm tooltip-left" onclick="Session.set(' + "'activity','print'" + ');"><i class="text-success text-info glyphicon glyphicon-print"></i></a>&nbsp;'
    var  reactiveTableFilterAdd = '';
    if(Session.get('isAdmin'))
    reactiveTableFilterAdd =
     '     <a data-toggle="modal" data-tooltip="'+i18n('tickets.tooltipGroupAdd')+'" data-target="#modalTickets" onclick="Session.set(\'KorisnikNo\', 1);Session.set(\'KorisniciArr\', []);Session.set(\'KorisniciArrSelect\', []);Session.set(' + "'activity','groupAdd'" + ');" class="btn btn-success btn-sm tooltip-left"><i class="text-success text-info glyphicon glyphicon-indent-left"></i></a>&nbsp;'
    +'     <a data-toggle="modal" data-tooltip="'+i18n('tickets.tooltipAdd')+'" data-target="#modalTickets" onclick="Session.set(' + "'activity','add'" + ');" class="btn btn-success btn-sm tooltip-left"><i class="text-success text-info glyphicon glyphicon-plus"></i></a>&nbsp;</h3>'
    +'</div>';
    else
    reactiveTableFilterAdd =
             '     <a data-toggle="modal" data-tooltip="'+i18n('tickets.tooltipAdd')+'" data-target="#modalTickets" onclick="Session.set(' + "'activity','add'" + ');" class="btn btn-success btn-sm tooltip-left"><i class="text-success text-info glyphicon glyphicon-plus"></i></a>&nbsp;</h3>'
            +'</div>';

    $('.buttonFilter').html(reactiveTableFilter+reactiveTableFilterAdd
/*            +$('.buttonFilter').html()*/
        );
    //$(".reactive-table-options").appendTo("#ZaAppend");
    //$('.reactive-table-navigation').appendTo("#ZaAppendFooter");
    Session.set('fOtvoreni', false);
    Session.set('fPostupak', false);
    Session.set('fZatvoreni', false);
    Session.set('fHold', false);

    Session.set('fCbs0', false);
    Session.set('fCbs1', false);
    Session.set('fCbs2', false);
    Session.set('fCbs3', false);

    //$('#cb1').prop("checked", !$('#cb1').prop("checked"));

    $('#fOtvoreni').click();
    $('#fPostupak').click();

    $('#fCbs0').click();
    $('#fCbs1').click();
    $('#fCbs2').click();
    $('#fCbs3').click();
}

Template.tickets.destroyed = function(){
    $('#ticketMenu').html('');
}

//********************************************************** FUNKCIJE *****************

function bAdd_insert (ticket, arrayIndex) {

//************************************************************************************
    var rbr = 0;
    Meteor.call('getTicketsCount', function (err, result) {
        if (result) {
            rbr = result + 1;
        }
        else {
            var today = new Date();
            var n = today.getTime().toString();
            rbr = n.substring(6, 11);
        };
        if (typeof arrayIndex != 'undefined')
            rbr += Number(arrayIndex);
        ticket.RBR = rbr;

        tickets.insert(ticket, function (err, result) {
            if (err) {
                $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />' + err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            else {
                $.growl('<strong>' + i18n('tickets.growlSuccessAdd') + '</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
                // Object inserted successfully.
                var objectId = result; // this will return the id of object inserted
//                    console.log('1 ' + Session.get('_id'));
//                    console.log(result);

                ticket.Postupak = 'Otvaranje';
                e_mail_to_service(ticket, objectId);
            }
        });
    });
}

function validateInput_TicketsOtvaranje() {
    var err = 0;
    if(!$("#m_KorisniciX1 option:selected").length) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />Morate odabrati komitenta!', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if(!$("#m_Prioritet option:selected").length) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />Morate odabrati prioritet!', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_OpisProblema').val().length < 2) {
        $.growl('<strong>'+i18n('tickets.growlError')+'</strong><br />Mora postojati opis problema!', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
/*   alert ($("#m_Services option:selected").val());
   alert ($("#m_Services option:selected").text());*/

//    if(!$("#m_Services option:selected").length) {
    if(($("#m_Services option:selected").val() == 'xx') || (!$("#m_Services option:selected").length)){
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('users.fieldServicesGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}
function validateInput_TicketsOtvoren(i) {
    var err = 0;
    if($('#m_OpisProblema').val().length < 2) {
        $.growl('<strong>'+i18n('tickets.growlError')+'</strong><br />Mora postojati opis problema!', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if ((!Session.get('isClientUser') && !Session.get('isClientSuperUser')) && (Session.get('zatvaranje'))) {
        if ($('#m_OpisResenja').val().length < 2) {
            $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />Mora postojati opis rešenja!', {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
            err++;
        }
        if (i < 1) {
            $.growl('<strong>' + i18n('tickets.growlError') + '</strong><br />Morate zadužiti zaposlenog!', {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
            err++;
        }
    }
    return err;
}

function getService(id) {
    var id = id;
    var Services = Session.get('Services');
    var ServicesId = Session.get('ServicesId');
    var s = '';
    var length = 0;
    if (typeof Services != 'undefined' && Services) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        Services = Services.split(",");
        length = Services.length;
        ServicesId = ServicesId.split(",");

        for (var i = 0; i < length; i++) {
            if (ServicesId [i] === id) {
                s = Services [i];
                break;
            }
        }

        /*    var service = services.find({'_id': id}).fetch();
         return service[0].Servis;*/
    }
    return s;
}
function getPrioritet(id) {
/*    var prioritet = priorities.find({'_id': id}).fetch();
    return prioritet[0].Prioritet;*/

    var myDocument = priorities.findOne({'_id': id});
    if (myDocument) {
        var myPrioritet = myDocument.Prioritet;
    }
    return myPrioritet;
}
function getAktivnost(id) {
/*    var aktivnost = activities.find({'_id': id}).fetch();
    return aktivnost[0].Aktivnost;*/

    var myDocument = activities.findOne({'_id': id});
    if (myDocument) {
        var myAktivnost = myDocument.Aktivnost;
    }
    return myAktivnost;
}
function getAktivnostId(name) {
/*    var aktivnost = activities.find({'Aktivnost': name}).fetch();
    return aktivnost[0]._id;*/

    var myDocument = activities.findOne({'Aktivnost': name});
    if (myDocument) {
        var myId = myDocument._id;
    }
    return myId;
}
function getActivitiesIDs(){
    // if(!Session.get('IdOtvoreni')){
        Session.set('IdOtvoreni', getAktivnostId('otvoren'));
        Session.set('IdPostupak', getAktivnostId('u postupku'));
        Session.set('IdZatvoreni', getAktivnostId('zatvoren'));
    // }
}
function getImePrezime(id) {
/*    var imePrezime = usersAll.find({'_id': id}).fetch();
    return imePrezime[0].profile.ImePrezime;*/

    var myDocument = usersAll.findOne({'_id': id});
    if (myDocument) {
        var imePrezime = myDocument.profile.ImePrezime;
    }
    return imePrezime;
}
function getKomitentToDo(id) {
/*    var client = clients.find({'_id': id}).fetch();
    return client[0].Komitent;*/

    var myDocument = clients.findOne({'_id': id});
    if (myDocument) {
        var myKomitent = myDocument.Komitent;
    }
    return myKomitent;
}
function getAuthorityId(name) {
/*    var ovlascenje = authorities.find({'Ovlascenje': name}).fetch();
    return ovlascenje[0]._id;*/

    var myDocument = authorities.findOne({'Ovlascenje': name});
    if (myDocument) {
        var myId = myDocument._id;
    }
    return myId;
}
function getInterventionsId(name) {
/*    var intervention = interventions.find({'Intervencija': name}).fetch();
    return intervention[0]._id;*/

    var myDocument = interventions.findOne({'Intervencija': name});
    if (myDocument) {
        var myId = myDocument._id;
    }
    return myId;

}
function getMaterijal() {
    var materijal = Session.get('Materijal');
    var s = '';
    if (materijal) {
        var kol = Session.get('Kol');
//        console.log(kol);

        for (i = 0; i < materijal.length; i++) {
            if (!materijal[i]) {
                materijal [i] = ' - - ';
            }
            if (!kol[i]) {
                kol [i] = ' - - ';
            }
            s += "<tr>" +
                "<td style='text-align: left;padding-top: 5px;'><input type='text' name='materijal[]' value='" + materijal[i] + "' size='38' maxlength='38'></td>" +
                "<td style='text-align: left;padding-top: 5px;'><input type='text' name='kol[]' value='" + kol[i] + "' size='5'</td>" +
                "<td style='text-align: left;padding-top: 5px;'><input type='checkbox' name='chkbox[]' size='5'></td>" +
                "</tr>";
        }
//    console.log (s);
    }
    return s;
}

function currentDateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var hh = today.getHours(); // => 9
    var min = today.getMinutes(); // =>  30
//    var n = today.getTime();
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} if(hh<10){hh='0'+hh} if(min<10){min='0'+min}
    //return dd+'/'+mm+'/'+yyyy+', '+hh+':'+min;
    return yyyy+'/'+mm+'/'+dd+', '+hh+':'+min;
}

function selectServices() {
    var Services = Session.get('Services');
    var ServicesId = Session.get('ServicesId');
    var length = 0;
    if (typeof Services != 'undefined' && Services) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        Services = Services.split(",");
        length = Services.length;
        ServicesId = ServicesId.split(",");

        var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 28px;">';
        var sEnd = '</select>';
        if (length > 1)
            s += '<option value="xx" disabled selected hidden>' + 'Izaberite...' + '</option>';

        for (var i = 0; i < length; i++) {
            if (length > 1)
                s += '<option value="' + ServicesId[i] + '">' + Services[i] + '</option>';
            else {
                s += '<option value="' + ServicesId[i] + '" selected>' + Services[i] + '</option>';
                Session.set('service_Id', ServicesId[i]);
            }
        }

        return s + sEnd;
    }
}


function selectServicesSelected(service_Id) {
    var service_Id = service_Id;
    var Services = Session.get('Services');
    var ServicesId = Session.get('ServicesId');

    if (typeof ServicesId != 'undefined' && ServicesId) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        Services = Services.split(",");
        ServicesId = ServicesId.split(",");
        var length = ServicesId.length;

        /*    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 80px;" multiple>';*/
        var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 28px;">';
        var sEnd = '</select>';

        if (length > 1)
            s += '<option value="xx" disabled selected hidden>' + 'Izaberite...' + '</option>';

        for (var i = 0; i < length; i++) {
            if (ServicesId[i] === service_Id) {

                if (Session.get("activity") == 'edit') {
                    s += '<option value="' + ServicesId[i] + '" selected="selected">' + Services[i] + '</option>';
                } else {
                    s += '<option value="' + ServicesId[i] + '" selected="selected" disabled>' + Services[i] + '</option>';
                }
            }
            else {
                if (Session.get("activity") == 'edit') {
                    s += '<option value="' + ServicesId[i] + '">' + Services[i] + '</option>';
                } else {
                    s += '<option value="' + ServicesId[i] + '" disabled>' + Services[i] + '</option>';
                }
            }
        }

        return s + sEnd;
    }
}

function chkboxServices() {

    var Services = Session.get('Services');
    var ServicesId = Session.get('ServicesId');

    var length = 0;
    if (typeof Services != 'undefined' && Services) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        Services = Services.split(",");
        length = Services.length;
        ServicesId = ServicesId.split(",");
    }
    var class_ = [
        "text-success text-primary glyphicon glyphicon-wrench",
        "text-success text-primary glyphicon glyphicon-briefcase",
        "text-success text-danger  glyphicon glyphicon-link",
        "text-success text-danger  glyphicon glyphicon-home"
    ];

//    var services_ = services.find();

/*    var services_ = [
        {_id:"DQxBAvHGSvaXBrNfp", Servis:"DA Fratello"},
        {_id:"faZekZ7ZrsTTieKkR", Servis:"MOOD Media"}
    ]*/

//    + '    <input id="cbs2" type="checkbox" value="cxPostupak"  style="margin-right:-5px;" disabled/><label id="ffPostupak"  type="" class="btn btn-xs btn-info tooltip-bottom"    data-tooltip="U postupku"><i class="text-success text-primary glyphicon glyphicon-briefcase"></i></label>'
//    + '    <input id="cbs3" type="checkbox" value="cxZatvoreni" style="margin-right:-5px;" disabled/><label id="ffZatvoreni" type="" class="btn btn-xs btn-warning tooltip-bottom" data-tooltip="Zatvoreni" ><i class="text-success text-danger  glyphicon glyphicon-link"></i></label>'
//    + '    <input id="cbs4" type="checkbox" value="cxHold"      style="margin-right:-5px;" disabled/><label id="ffHold"      type="" class="btn btn-xs btn-danger tooltip-bottom"  data-tooltip="Hold" ><i class="text-success text-danger       glyphicon glyphicon-home"></i></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'


    var s = '';
        for (var i = 0; i < length; i++) {
            s += '<input id="cbs' + i + '" type="checkbox" value="' + ServicesId [i] + '" style="margin-right:-5px;" disabled/><label id="fCbs' + i + '" type="" class="btn btn-xs btn-warning tooltip-bottom" data-tooltip="' + Services [i] + '" ><i class="' + class_[i] + '"></i></label>&nbsp;'
        }

    return s;
}

function mailService(Service) {

    var length = 0;
    if (typeof Service != 'undefined' && Service) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        var Service = Service.split(",");
        length = Service.length;
    }

    var services_ = services.find();

/************** NAPRAVITI PROCEDURE ZA CITANJE *********************/
/*    var myCursor = services.find();

    var myDocument = myCursor.hasNext() ? myCursor.next() : null;

    if (myDocument) {
        console.log ('services OK');
    }
    else
        console.log ('services NOK');*/

/*******************************************************************/

/*    collection.find({}, function(err, cursor) {
        cursor.each(function(err, item) {
            console.log(item);
        });
    });
*/

//    + '    <input id="cbs2" type="checkbox" value="cxPostupak"  style="margin-right:-5px;" disabled/><label id="ffPostupak"  type="" class="btn btn-xs btn-info tooltip-bottom"    data-tooltip="U postupku"><i class="text-success text-primary glyphicon glyphicon-briefcase"></i></label>'
//    + '    <input id="cbs3" type="checkbox" value="cxZatvoreni" style="margin-right:-5px;" disabled/><label id="ffZatvoreni" type="" class="btn btn-xs btn-warning tooltip-bottom" data-tooltip="Zatvoreni" ><i class="text-success text-danger  glyphicon glyphicon-link"></i></label>'
//    + '    <input id="cbs4" type="checkbox" value="cxHold"      style="margin-right:-5px;" disabled/><label id="ffHold"      type="" class="btn btn-xs btn-danger tooltip-bottom"  data-tooltip="Hold" ><i class="text-success text-danger       glyphicon glyphicon-home"></i></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    var eOpen = '';
    var eClose = '';
    services_.forEach(function (post) {
        var found = false;
        for (var i = 0; i < length; i++) {
            if (post._id === Service[i]) {
                found = true;
                break;
            }
        }
        if (found) {
            eOpen = post.EmailOpen;
            eClose = post.EmailClose;
        }

    });
    return {eOpen: eOpen,
            eClose: eClose};
}
function selectClientsFirst() {
    if (Session.get('Lokacije').length == 0)
//    if (!Session.get('isClientUser') && !Session.get('isClientSuperUser'))
        var client = clients.find({},{sort: { "Komitent": 1, "Lokacija": 1 }});
    else {
//    if (Session.get('isClientSuperUser')){
//        console.log (Session.get('Lokacije'));
        var client = clients.find({Lokacija: { $in: Session.get('Lokacije')}},{sort: {"Lokacija": 1 }});
    }
    var count = 1;
    var s = '<select id="m_KorisniciX1" class="form-control selectpicker show-tick" style="height: 28px;">';
    var sEnd = '</select>';
//    if (!Session.get('isClientUser')){
    client.forEach(function (post) {
        if(count==1) {
            s += '<option value="' + post._id + '" selected="selected">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            count++;
        }
        else
            s += '<option value="' + post._id + '">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
    });
/*
    }
    else {
        s += '<option value="' + 1 + '" selected="selected">' + Session.get('Client') + '</option>';
    }
*/

    return s+sEnd;
}
function selectClients() {
    var client = clients.find({},{sort: { "Komitent": 1 , "Lokacija": 1 }});
    var count = 1;
    //console.log('selectClients '+Session.get('KorisnikNo'));
    var s = '<select id="m_KorisniciX'+Session.get('KorisnikNo')+'" class="form-control selectpicker show-tick" style="height: 28px;">';
    var sEnd = '</select>';
    client.forEach(function (post) {
        if(count==1) {
            s += '<option value="' + post._id + '" selected="selected">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            count++;
        }
        else
            s += '<option value="' + post._id + '">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
    });
    return s+sEnd;
}
function selectPriorities() {
//    alert (Session.get('service_Id'));
    var client = priorities.find({'Services' : Session.get('service_Id')});
    var count = 0;
    var s = '<div id = "me"><select id="m_Prioritet" class="form-control selectpicker show-tick" style="height: 28px;">';
    var sEnd = '</select></div>';
    client.forEach(function (post) {
        if(count==1) {
            s += '<option value="' + post._id + '" selected="selected">' + post.Prioritet + '</option>';
        }
        else
            s += '<option value="' + post._id + '">' + post.Prioritet + '</option>';
        count++;
    });
    return s+sEnd;
}
function selectPriorities_() {
    var client = priorities.find({'Services' : Session.get('service_Id')});
    var s = '<div id = "me"><select id="m_Prioritet" class="form-control selectpicker show-tick" style="height: 28px;">';
    var sEnd = '</select></div>';
    client.forEach(function (post) {
        if(post._id == Session.get('Prioritet')) {
            s += '<option value="' + post._id + '" selected="selected">' + Session.get('prioritet') + '</option>';
        }
        else
            s += '<option value="' + post._id + '">' + post.Prioritet + '</option>';
    });
    return s+sEnd;
}
function checkBoxToDoUsersView(ZaposleniToDo) {
//    console.log('ZaposleniToDo '+Session.get('ZaposleniToDo'));
    clentUserId = getAuthorityId('ClientUser');
    clientSuperUserId = getAuthorityId('ClientSuperUser');
    var divs = '';
    var ztd = Session.get('ZaposleniToDo');
    if (ZaposleniToDo != null)
        ztd = ZaposleniToDo;
    var usr = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {username:{$ne:'ftsmonitor'}}] });
    usr.forEach(function(post) {
        if ((post.profile.Ovlascenje !== clentUserId) && (post.profile.Ovlascenje !== clientSuperUserId)) {
            if (post.profile.Services.indexOf (getService(Session.get('service_Id'))) > -1) {
                divs += "<div class='checkbox'><label><input type='checkbox' disabled ";
                for (var i = 0; i < ztd.length; i++) {
                    if (ztd[i] == post._id)
                        divs += "checked";
                }
                divs += ">&nbsp;" + post.profile.ImePrezime + "</label></div>";
            }
        }
    });
    return divs;
}
function checkBoxIntervenionsView(Intervencija) {
//    console.log('Intervencija '+Session.get('Intervencija'));
    var divs = '';
    var ztd = Session.get('Intervencija');
    if (Intervencija != null)
        ztd = Intervencija;
    var int = interventions.find();
    int.forEach(function(post) {
        divs+="<div class='checkbox'><label><input type='checkbox' disabled ";
        for(var i = 0; i < ztd.length; i++){
            if(ztd[i]==post._id)
                divs+="checked";
        }
        divs+=">&nbsp;"+post.Intervencija+"</label></div>";
    });
    return divs;
}
function checkBoxToDoUsersEdit() {
    clentUserId = getAuthorityId('ClientUser');
    clientSuperUserId = getAuthorityId('ClientSuperUser');
//    var imePrezime = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {Ovlascenje:{$ne:clentUserId}} ] });

    var imePrezime = usersAll.find({ $and: [ {username:{$ne:'admin'}}, {username:{$ne:'nilija'}}, {username:{$ne:'ftsmonitor'}}] });
    s = '';
    imePrezime.forEach(function (ip) {
        if ((ip.profile.Ovlascenje !== clentUserId) && (ip.profile.Ovlascenje !== clientSuperUserId)) {
//            var service = ifInclude(Session.get('service_Id'), ip.profile.Services);
//            var service = ifInclude(ip.profile.Services, getService(Session.get('service_Id')));
//            days.indexOf(day.toLowerCase()) > -1;
/*            console.log (getService(Session.get('service_Id')));
            console.log (ip.profile.Services);
            console.log (ip.profile.ImePrezime);*/

            if ((Session.get('isClientSuperUser') && (getService(Session.get('service_Id')) != 'DA Fratello'))
                    ||(!Session.get('isClientSuperUser'))) {
                if (ip.profile.Services.indexOf(getService(Session.get('service_Id'))) > -1) {
                    var checked = ifInclude(Session.get('ZaposleniToDo'), ip._id);
                    if (checked == true) {
                        s += '<div class="checkbox"><label>'
                            + '<input type="checkbox" id="' + ip._id + '" value="' + ip._id + '" name = "user" checked = "checked"/>' + ip.profile.ImePrezime
                            + '</label></div>'
                    }
                    else {
                        s += '<div class="checkbox"><label>'
                            + '<input type="checkbox" id="' + ip._id + '" value="' + ip._id + '" name = "user" />' + ip.profile.ImePrezime
                            + '</label></div>'
                    }
                }
            }
        }
    });
    return s;

//    _.contains(ip._id, Session.get('ZaposleniToDo')) ? 'checked' : ''
}


 function checkBoxIntervenionsEdit() {

    var s = '';
    var int = interventions.find();
    int.forEach(function(ip) {
        var checked = ifInclude(Session.get('Intervencija'), ip._id);
        if (checked == true) {
            s += '<div class="checkbox"><label>'
            +  '<input type="checkbox" id="' + ip._id + '" value="' + ip._id + '" name = "intervencija" checked = "checked"/>' + ip.Intervencija
            + '</label></div>'
        }
        else {
            s += '<div class="checkbox"><label>'
            + '<input type="checkbox" id="' + ip._id + '" value="' + ip._id + '" name = "intervencija" />' + ip.Intervencija
            + '</label></div>'
        }
    });
    return s;
}

function ifInclude(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj)
            return true;
    }
}

function chkPicker(Naplacen) {
//    console.log('Intervencija '+Session.get('Intervencija'));
    var chk = '';
    if (Naplacen) {
        chk+="checked";
    };
    return chk;
}

function datePicker(datum) {
//    console.log (datum);
/*
    m_DatumOtvaranja
    m_DatumToDo
*/
/*
    datum = $('#m_DatumZatvaranja').datepicker();
    console.log (datum);
*/
    return datum;
}
function e_mail_to_service(data, ticket_Id) {
//    console.log ('3 ' + Session.get('_id'));
//    console.log ('4 ' + ticketId);
    if (ticket_Id)
        var ticketId = ticket_Id
    else
        var ticketId = 'nemoguce';

    var Service = data.Servis;
    var Postupak = data.Postupak;
    var RBR = data.RBR;
    var Komitent = data.Komitent;
    var Aktivnost = getAktivnost(data.Aktivnost);
    var Prioritet =  getPrioritet(data.Prioritet);
    var ProblemPrijavio = data.ProblemPrijavio;
    var OpisProblema = data.OpisProblema;
    var Napomena = data.Napomena;
    var DatumOtvaranja = data.DatumOtvaranja;
    var TiketOtvorio = getImePrezime(data.TiketOtvorio);
//
    var OpisResenja = data.OpisResenja;
    var ZaposleniToDo = data.ZaposleniToDo;
    var Zaduzen = data.Zaduzen;
    var Intervencija = data.Intervencija;
    var DatumToDo = data.DatumToDo;
    var DatumZatvaranja = data.DatumZatvaranja;
    if (Aktivnost != 'zatvoren')
        DatumZatvaranja = '';

    var eDodatak = Postupak + ', rbr: ' + RBR;
    var eSubject = eDodatak + ', komitent: ' + Komitent + ', prioritet: ' + Prioritet;

/*    var text = "";
    var i = 0;
    do {
        text += "The number is " + i;
        i++;
    }
    while (i < 5);*/

    var email = mailService(Service);
    var eOpen = email.eOpen;
    var eClose = email.eClose;

    var t = '';
    var eBody = '';
    var eTo = '';
    if (Postupak == 'Otvaranje') {
        eTo = eOpen;
//        eTo = 'n_ilija@yahoo.com';
        eBody += '<strong>Aktivnost:<br /></strong>' + eDodatak + '<br />' +

        "<table id='tableAdd' style='width: 100%'>" +
        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>" + Komitent + "</td>" +
        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>" + Prioritet + "</td></tr>" +
        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>" + ProblemPrijavio + "</textarea></td>" +
        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>" + OpisProblema + "</textarea></td></tr>" +
        "<tr><td colspan='2' style='width: 80%;margin-top: -15px;'><hr></td></tr>" +
        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>" + Napomena + "</textarea></td></tr>" +
        "<tr><td colspan='2'><table style='width: 100%;'><tr>" +
        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Datum i vreme<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_DatumOtvaranja' value='" + DatumOtvaranja + "' disabled></td>" +
        "<td style='width: 40%;text-align: center;padding-top: 5px;'>Tiket otvorio<input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_TiketOtvorioF' value='" + TiketOtvorio + "' disabled>" +
        "<td style='width: 30%;text-align: center;padding-top: 5px;'>Status       <input type='text' style='height:20px;width:100%;text-align: center;' class='form-control' id='m_Aktivnost' value='" + Aktivnost + "' disabled></td></tr>" +
        "</table></td></tr>" +
        "</table>" +
        "<br style='clear: both;' />";

        var attachments = [];
        if (Session.get('images')) {
            attachments = Session.get('images');
            Session.set('images', undefined);

//            var filePath =  "~/meteor/fratello/server/.meteor/uploads/";
//            var filePath =  "/home/mnikolic/meteor/fratello/server/public/uploads/";
/*            var filePath =  "/srv/uploads/fratello/";
            var eAttach = '';
            attFile.forEach(function(post) {
                var eAttach = filePath + "images-" + post;
                attachments.push(
                    {
/!*                        fileName: eAttach.substr(eAttach.lastIndexOf('/') + 1),  ------------------  na verziji meteora METEOR@1.3
                        filePath: eAttach*!/
                        filename: eAttach.substr(eAttach.lastIndexOf('/') + 1),
                        path: eAttach
//                        contentType: 'pdf'
                    });
            });*/

//            var cid_value = Date.now() + '.image.jpg';

        }

//            console.log(attachments);
            var growl = '';

            Meteor.call('saljiEmail', eTo, eSubject, eBody, attachments, function (error, result) {
                if (!error) {
//              console.log(t);
//              Meteor.call('saljiEmail', eTo, eSubject, eDodatak, eBody, t,  function(error, result){
//              });
                    growl = 'Uspešno poslat Email na servis!';
                    $.growl('<strong>Uspešno poslat Email na servis!</strong>', {
                        type: 'success', z_index: 99999, allow_dismiss: false
                    });
                } else {
                    growl = 'Neuspešno, nije poslat e_mail, ' + error;
                    $.growl('<strong>Neuspešno, nije poslat e_mail, </strong><br />' + error, {
                        type: 'danger', z_index: 99999, allow_dismiss: false
                    });
                }
            });
    }
    else {
//        eTo = 'acc@fratello.rs, mnikolic@fratello.rs';
        eTo = eClose;
//        eTo = 'n_ilija@yahoo.com';
        eBody += '<strong>Aktivnost:<br /></strong>' + eDodatak + '<br />' +

        "<table id='tableAdd' style='width: 100%'>" +
        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Komitent'>Komitent:&nbsp;</label>" + Komitent + "</td>" +
        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_Prioritet'>Prioritet tiketa:&nbsp;</label>" + Prioritet + "</td></tr>" +
        "<tr><td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_ProblemPrijavio'>Problem je prijavio:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_ProblemPrijavio' placeholder='Ko je prijavio problem' autofocus='autofocus' disabled>" + ProblemPrijavio + "</textarea></td>" +
        "<td style='width: 50%;text-align: left;padding-top: 5px;'><label for='m_OpisProblema'>Problem:</label><textarea rows='4' style='height:50px;width:100%; resize: none;' class='form-control' id='m_OpisProblema' placeholder='Opis problema ...' autofocus='autofocus' disabled>" + OpisProblema + "</textarea></td></tr>" +
        "<tr><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Zaposleni:</strong>" +
        checkBoxToDoUsersView(ZaposleniToDo) +
        "</td><td style='width: 50%;text-align: left; padding-top: 5px;'><strong>Intervencije:</strong>" +
        checkBoxIntervenionsView(Intervencija) +
        "</td></tr>" +
        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Opis resenja<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_OpisResenja' placeholder='Opis rešenja' autofocus='autofocus' disabled>" + OpisResenja + "</textarea></td></tr>" +
        "<tr><td colspan='2' style='width: 80%;'><hr></td></tr>" +
        "<tr><td colspan='2' style='width: 100%;text-align: center;padding-top: 5px;'>Napomena<textarea rows='3' style='height:38px;width:100%; resize: none;' class='form-control' id='m_Napomena' placeholder='Napomena ...' autofocus='autofocus' disabled>" + Napomena + "</textarea></td></tr>" +
        "<tr><td colspan='2'><table style='width: 100%;margin-top: 10px;'>" +
        "<tr><td style='width: 50%;text-align: left;'>Tiket otvoren       <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumOtvaranja'  value='" + DatumOtvaranja + "' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Tiket otvorio<input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_TiketOtvorioF' value='" + TiketOtvorio + "' disabled></td></tr>" +
        "<tr><td style='width: 50%;text-align: left;'>Tiket stavljen u rad<input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumToDo'       value='" + DatumToDo + "' enabled></td>  <td style='width: 50%;text-align: left;'>&nbsp;Aktivnost    <input type='text'     style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_Aktivnost'     value='" + Aktivnost + "' disabled></td></tr>" +
        "<tr><td style='width: 50%;text-align: left;'>Tiket zatvoren      <input type='text' style='height:20px;width:50%;text-align: center;' class='form-control pull-right' id='m_DatumZatvaranja' value='" + DatumZatvaranja + "' enabled></td>  <td style='width: 50%;text-align: left;'></td></tr>" +
        "</table></td></tr>" +
        "</table>" +
        "<br style='clear: both;' />";
        var growl = '';

        var to = clients.find({_id: Session.get('KomitentToDo')}).fetch();

        var servis = getService(Session.get('service_Id'));
//        if (servis == 'McD Service')
        eTo += ', ' + to[0].Email;
//            alert (eTo);
        var izvrsilacBroj = Session.get('username');
        var radniNalogBroj = Session.get('RBR');
        var datumNaloga = data.DatumZatvaranja;
        var problemNaloga = Session.get('OpisProblema');
        var komitent = to[0].Komitent;
        var lokacija = to[0].Lokacija;
        var mesto = to[0].Mesto;
        var adresa = to[0].Adresa;
//        var resenje = Session.get('OpisResenja');
        var resenje = OpisResenja;
        var izvrsilac = Session.get('ImePrezime');
        var materijal = data.Materijal;
        var kol = data.Kol;

        Meteor.call('praviRadniNalog', servis, izvrsilacBroj, radniNalogBroj, datumNaloga, problemNaloga, komitent, lokacija, mesto, adresa, resenje, izvrsilac, materijal, kol,  function(error, t) {

            if (!error) {
//                console.log(t);
                Meteor.call('saljiEmail_RN', eTo, eSubject, eDodatak, eBody, t, function (error, result) {

                });

                growl = 'Uspešno poslat Email na: acc, ...!';
                $.growl('<strong>Uspešno poslat Email na: acc, ...!</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            } else {
                growl = 'Neuspešno, nije poslat e_mail, ' + error;
                $.growl('<strong>Neuspešno, nije poslat e_mail, </strong><br />' + error, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            };
        });

//    $('#modalTickets').modal('hide');
    }
}
Handlebars.registerHelper('colorAktivnost2', function(){
    if(Session.get('activity')=='add'||Session.get('activity')=='groupAdd')
        return "light";
    var aktivnost = Session.get('Aktivnost');
    if(aktivnost == '5269538f83a16aee67cffc70')
        return "otvoren";
    if(aktivnost == '5269538f83a16aee67cffc71')
        return "postupak";
    if(aktivnost == '5269538f83a16aee67cffc72')
        return "zatvoren";
});
// End of generated file
