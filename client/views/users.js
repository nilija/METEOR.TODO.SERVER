/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/users.js
 * generated:     2014/12/17 13:31
 */

Template.users.helpers({
    users: function() {
        return usersAll.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('users.modalTitleAdd');
            case 'view':
                return i18n('users.modalTitleView');
            case 'edit':
                return i18n('users.modalTitleEdit');
            case 'delete':
                return i18n('users.modalTitleDelete');
            case 'reset':
                return i18n('users.modalTitleReset');
        }
    },
    modalBody: function() {
        var tHeader = '<table style="width: 100%;"><tbody>';
        var tdLeft1 = '<tr><td style="width: 20%; text-align: right; padding-top: 5px;"><label>';
        var tdLeft2 = '</label></td><td style="width: 2%;"></td>';
        var tdRight1 = '<td style="width: 78%;"><input type="text" style="height: 23px; width: 100%;" class="form-control" id="';
        var tdRightSelect = '<td style="width: 78%;">';
        var tdRightSelectEnd = '</td>';
        var tdRight2Add = '" /></td></tr>';
        var tdRight2View = '" value="';
        var tdRight2ViewEnd = '" disabled=""/></td></tr>';
        var tFooter ='</tbody></table>';
        switch(Session.get("activity")){
            case 'add':
                return Spacebars.SafeString(tHeader
                +tdLeft1+i18n('users.fieldUsernameModalLabel')+tdLeft2+tdRight1+'m_Username'+tdRight2Add
                +tdLeft1+i18n('users.fieldImeModalLabel')+tdLeft2+tdRight1+'m_Ime'+tdRight2Add
                +tdLeft1+i18n('users.fieldPrezimeModalLabel')+tdLeft2+tdRight1+'m_Prezime'+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2Add
                +tdLeft1+i18n('users.fieldOvlascenjeModalLabel')+tdLeft2 + tdRightSelect + selectOvlascenja() + tdRightSelectEnd
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+tdLeft2 + tdRightSelect +selectClientsFirst()+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServices()+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Zaduzenja'>Zaduzenja:</label>"+tdLeft2 + tdRightSelect
                + '&nbsp; &nbsp; <input type="checkbox" id="m_Zaduzenja" name="m_Zaduzenja" value="newsletter"><label for="subscribeNews">&nbsp; &nbsp; (da/ne)?</label></td></tr>'
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Izvestaji'>Izvestaji:</label>"+tdLeft2 + tdRightSelect
                + '&nbsp; &nbsp; <input type="checkbox" id="m_Izvestaji" name="m_Izvestaji" value="newsletter"><label for="subscribeNews">&nbsp; &nbsp; (da/ne)?</label></td></tr>'

                    +tFooter);
            case 'view':

                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('users.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldUsernameModalLabel')+tdLeft2+tdRight1+'m_Username'+tdRight2View+Session.get('Username')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldImeModalLabel')+tdLeft2+tdRight1+'m_Ime'+tdRight2View+Session.get('Ime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldPrezimeModalLabel')+tdLeft2+tdRight1+'m_Prezime'+tdRight2View+Session.get('Prezime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldOvlascenjeModalLabel')+tdLeft2+tdRight1+'m_Ovlascenje'+tdRight2View+Session.get('Ovlascenje')+tdRight2ViewEnd
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+tdLeft2 + tdRightSelect +Session.get('Komitent')+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('userServices'))+"</td></tr>"
                +tdLeft1+i18n('users.fieldZaduzenjaModalLabel')+tdLeft2+tdRight1+'m_Zaduzenja_'+tdRight2View+ checkSignZaduzenja() +tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldIzvestajModalLabel')+tdLeft2+tdRight1+'m_Izvestaji_'+tdRight2View+ checkSignIzvestaji() +tdRight2ViewEnd

                    +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('users.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldUsernameModalLabel')+tdLeft2+tdRight1+'m_Username'+tdRight2View+Session.get('Username')+tdRight2Add
                +tdLeft1+i18n('users.fieldImeModalLabel')+tdLeft2+tdRight1+'m_Ime'+tdRight2View+Session.get('Ime')+tdRight2Add
                +tdLeft1+i18n('users.fieldPrezimeModalLabel')+tdLeft2+tdRight1+'m_Prezime'+tdRight2View+Session.get('Prezime')+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2Add
                +tdLeft1+i18n('users.fieldOvlascenjeModalLabel')+tdLeft2 + tdRightSelect + selectOvlascenjaSelected(Session.get('Ovlascenje')) + tdRightSelectEnd
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+tdLeft2 + tdRightSelect +selectClientsSelected(Session.get('Komitent'))+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('userServices'))+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Zaduzenja'>Zaduzenja:</label>"+tdLeft2 + tdRightSelect
                + '&nbsp; &nbsp; <input type="checkbox" id="m_Zaduzenja" name="m_Zaduzenja" value=""><label for="subscribeNews">&nbsp; &nbsp; (da/ne)?</label></td></tr>'
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Izvestaji'>Izvestaji:</label>"+tdLeft2 + tdRightSelect
                + '&nbsp; &nbsp; <input type="checkbox" id="m_Izvestaji" name="m_Izvestaji" value=""><label for="subscribeNews">&nbsp; &nbsp; (da/ne)?</label></td></tr>'

                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('users.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldUsernameModalLabel')+tdLeft2+tdRight1+'m_Username'+tdRight2View+Session.get('Username')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldImeModalLabel')+tdLeft2+tdRight1+'m_Ime'+tdRight2View+Session.get('Ime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldPrezimeModalLabel')+tdLeft2+tdRight1+'m_Prezime'+tdRight2View+Session.get('Prezime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldOvlascenjeModalLabel')+tdLeft2+tdRight1+'m_Ovlascenje'+tdRight2View+Session.get('Ovlascenje')+tdRight2ViewEnd
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+tdLeft2 + tdRightSelect +Session.get('Komitent')+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('userServices'))+"</td></tr>"
                +tdLeft1+i18n('users.fieldIzvestajModalLabel')+tdLeft2+tdRight1+'m_Zaduzenja_'+tdRight2View+ checkSignZaduzenja() +tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldIzvestajModalLabel')+tdLeft2+tdRight1+'m_Izvestaji_'+tdRight2View+ checkSignIzvestaji() +tdRight2ViewEnd

                +tFooter);
            case 'reset':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('users.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldUsernameModalLabel')+tdLeft2+tdRight1+'m_Username'+tdRight2View+Session.get('Username')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldImeModalLabel')+tdLeft2+tdRight1+'m_Ime'+tdRight2View+Session.get('Ime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldPrezimeModalLabel')+tdLeft2+tdRight1+'m_Prezime'+tdRight2View+Session.get('Prezime')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldOvlascenjeModalLabel')+tdLeft2+tdRight1+'m_Ovlascenje'+tdRight2View+Session.get('Ovlascenje')+tdRight2ViewEnd
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Komitent'>Komitent:</label>"+tdLeft2 + tdRightSelect +Session.get('Komitent')+"</td></tr>"
                + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('userServices'))+"</td></tr>"
                +tdLeft1+i18n('users.fieldIzvestajModalLabel')+tdLeft2+tdRight1+'m_Zaduzenja_'+tdRight2View+ checkSignZaduzenja() +tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldIzvestajModalLabel')+tdLeft2+tdRight1+'m_Izvestaji_'+tdRight2View+ checkSignIzvestaji() +tdRight2ViewEnd

                +tFooter);

        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('users.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('users.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('users.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('users.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('users.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('users.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('users.modalFooterYes')+'</button>');
            case 'reset':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('users.modalFooterNo')+'</button>'
                + '<button id="bReset" type="button" class="btn btn-danger btn-xs">'+i18n('users.modalFooterYes')+'</button>');

        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'bittons', label: '', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('users.tooltipView')+'" data-target="#modalUsers" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('users.tooltipEdit')+'" data-target="#modalUsers" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('users.tooltipDelete')+'" data-target="#modalUsers" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('users.tooltipReset')+'" data-target="#modalUsers" onclick="Session.set('+"'activity','reset'"+');" class="label label-warning tooltip-right"><i class="glyphicon glyphicon-registration-mark"></i></a>'
                        );
                    }
                },
                { key: 'username', label: i18n('users.fieldUsernameGridLabel'), sort: 'asc' },
                { key: 'profile.ImePrezime', label: i18n('users.fieldImePrezimeGridLabel') },
                { key: 'profile.Email', label: i18n('users.fieldEmailGridLabel') },
                { key: 'profile.Ovlascenje', label: i18n('users.fieldOvlascenjeGridLabel'),
                        fn: function(value, object){
                            var ovlast = getOvlascenje(object.profile.Ovlascenje);
                            return ovlast;
                        }
                },
                { key: 'profile.Komitent', label: 'Komitent:'},
                { key: 'profile.Services', label: 'Services:',
                    fn: function(value, object){
                        var services = object.profile.Services;
//                        var services = services.replace(/\,/g,'\n');
//                        services = services.split(',').join('<br />');
//                        services = services.split(',');
//                        services = services.replace(",", "\r\n");
//                        services = services.replace(/,/, '<br />');
//                        services = '<div> Text Text Text Text</div> <div> Text Text Text</div>';
                        return services;
                    }
                },
                { key: 'Zaduzenja', label: 'Zaduzenja:',

                    fn: function(value, object){
                        if (object.profile.Zaduzenja) {
                            var xx = '--> ✅';
                            return xx;
                        }
                    }
                },
                { key: 'Izvestaji', label: 'Izvestaji:',

                    fn: function(value, object){
                        if (object.profile.Izvestaji) {
                            var xx = '--> ✅';
                            return xx;
                        }
                    }
                }

            ],
            filters: ['myFilter'],
            rowClass: function(item) {},
//            showFilter: true,
            rowsPerPage:10,
            showNavigation:'auto', //  always never auto
            useFontAwesome: true,
            showNavigationRowsPerPage: true,
            showColumnToggles:false,
            class: "table table-striped table-bordered table-hover table-condensed display table-responsive no-wrap"

//            class: "table table-striped table-hover" // table table-striped table-bordered table-hover table-condensed
        }
    }
});

Template.users.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set('_id', this._id);
            Session.set('Username', this.username);
            Session.set('userImePrezime', this.profile.ImePrezime);
            Session.set('Ime', this.profile.Ime);
            Session.set('Prezime', this.profile.Prezime);
            Session.set('Email', this.profile.Email);
            Session.set('Ovlascenje', getOvlascenje(this.profile.Ovlascenje));
            Session.set('Komitent', this.profile.Komitent);
            Session.set('userServices', this.profile.Services);
            Session.set('userServicesId', this.profile.ServicesId);
            Session.set('Zaduzenja', this.profile.Zaduzenja);
            Session.set('Izvestaji', this.profile.Izvestaji);
        }
    },
    'click #bAdd': function(event) {
        var result = validateInput_Users();
        var err = result.err;
//        var err = validateInput_Users();
        if(err == 0){
            try {
                var prof = {
                    Email : $('#m_Email').val(),
                    Ime : $('#m_Ime').val(),
                    Prezime : $('#m_Prezime').val(),
                    Ovlascenje : $('#m_Ovlascenje').val(),
                    zaZaduzen : ' - '+$('#m_Ime').val()+' '+$('#m_Prezime').val(),
                    ImePrezime : $('#m_Ime').val()+' '+$('#m_Prezime').val(),
//                    'Komitent' : $('#m_KorisniciX1>option:selected').html()
                    'Komitent' : result.data,
                    'Services' : result.services,
                    'ServicesId' : result.servicesId,
                    'Zaduzenja' : $('#m_Zaduzenja').prop('checked'),
                    'Izvestaji' : $('#m_Izvestaji').prop('checked')
//                    ($('input.checkbox_check').prop('checked'))
                };
                Meteor.call('insertUser', $('#m_Username').val(), $('#m_Email').val(), prof, function(error) {
                    if(!error) {
                        $.growl('<strong>'+i18n('users.growlSuccessAdd')+'</strong>', {
                            type: 'success', z_index: 99999, allow_dismiss: false
                        });
                    } else {
                        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+error, {
                            type: 'danger', z_index: 99999, allow_dismiss: false
                        });
                    }
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalUsers').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var result = validateInput_Users();
        var err = result.err;
        if(err == 0){
            try {
                var prof = {
                    Email : $('#m_Email').val(),
                    Ime : $('#m_Ime').val(),
                    Prezime : $('#m_Prezime').val(),
                    Ovlascenje : $('#m_Ovlascenje').val(),
                    zaZaduzen : ' - '+$('#m_Ime').val()+' '+$('#m_Prezime').val(),
                    ImePrezime : $('#m_Ime').val()+' '+$('#m_Prezime').val(),
//                    'Komitent' : $('#m_KorisniciX1>option:selected').html()
                    'Komitent' : result.data,
                    'Services' : result.services,
                    'ServicesId' : result.servicesId,
                    'Zaduzenja' : $('#m_Zaduzenja').prop('checked'),
                    'Izvestaji' : $('#m_Izvestaji').prop('checked')
                };
                var em = [{
                    "address": $('#m_Email').val(),
                    "verified": false
                }];
                usersAll.update({'_id': Session.get('_id')}, {$set: {
                    'username' : $('#m_Username').val(),
                    'emails' : em,
                    'profile' : prof
                }});
                $.growl('<strong>'+i18n('users.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalUsers').modal('hide');
        }
    },
    'click #bReset': function(event) {
//        var err = validateInput_Users();
        var err = 0;
        if(err == 0){
            try {
                Meteor.call('chPassword', Session.get('_id'), 'fratello', function(error) {
                    if(!error) {
                        $.growl('<strong>Uspešno promenjena lozinka!</strong>', {
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
            $('#modalUsers').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            usersAll.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('users.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalUsers').modal('hide');
    }
});

Template.users.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/

    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('users.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('users.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('users.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('users.tooltipAdd')+'" data-target="#modalUsers" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.buttonFilter').html()*/
    );
    $('#modalUsers').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Username').val('');
            $('#m_Ime').val('');
            $('#m_Prezime').val('');
            $('#m_Email').val('');
            $('#m_Ovlascenje').val('');
        } else {
            $('#m_Username').val(Session.get('Username'));
            $('#m_Ime').val(Session.get('Ime'));
            $('#m_Prezime').val(Session.get('Prezime'));
            $('#m_Email').val(Session.get('Email'));
            $('#m_Zaduzenja').prop('checked', Session.get('Zaduzenja'));
            $('#m_Izvestaji').prop('checked', Session.get('Izvestaji'));
        }
        $('#m_Username').focus();
//        setFocus();
    });
}
function selectOvlascenja() {
    var ovlast = authorities.find();
    var count = 1;
    var s = '<select id="m_Ovlascenje" class="selectpicker show-tick">';
    var sEnd = '</select>';
    ovlast.forEach(function (post) {
        if(count==1) {
            s += '<option value="' + post._id + '" selected="selected">' + post.Ovlascenje + '</option>';
            count++;
        }
        else
            s += '<option value="' + post._id + '">' + post.Ovlascenje + '</option>';
    });
    return s+sEnd;
}
function selectOvlascenjaSelected(name) {
    var ovlast = authorities.find();
    var s = '<select id="m_Ovlascenje" class="selectpicker show-tick">';
    var sEnd = '</select>';
    ovlast.forEach(function (post) {
        if(post.Ovlascenje == name)
            s += '<option value="' + post._id + '" selected="selected">' + post.Ovlascenje + '</option>';
        else
            s += '<option value="' + post._id + '">' + post.Ovlascenje + '</option>';
    });
    return s+sEnd;
}
function getOvlascenje(id) {
    var ovlast = authorities.find({'_id': id}).fetch();
    return ovlast[0].Ovlascenje;
}
function validateInput_Users() {
    var err = 0;
    if($('#m_Username').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldUsernameGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Ime').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldImeGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Prezime').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldPrezimeGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Email').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldEmailGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if(!$("#m_Ovlascenje option:selected").length) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('users.fieldOvlascenjeGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
//    alert ($("#m_Services option:selected").length);
    if(!$("#m_Services option:selected").length) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('users.fieldServicesGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
//    var data=[];
    var data_='';
    var i = 0;
    var $el=$("#m_KorisniciX1");
    $el.find('option:selected').each(function(){
//        data.push({value:$(this).val(),text:$(this).text()});
        if ($(this).text().length > 0) {
            i++;
            if (i == 1)
                data_ += $(this).text();
            else
                data_ += ',' + $(this).text();
        }
    });

    var services_='';
    var servicesId='';
    i = 0;
    $el=$("#m_Services");
    $el.find('option:selected').each(function(){
//        data.push({value:$(this).val(),text:$(this).text()});
        i++;
        if (i == 1) {
            services_ += $(this).text();
            servicesId += $(this).val();
        }
        else {
            services_ += ',' + $(this).text();
            servicesId += ',' + $(this).val();
        }
    });

//    console.log (data);
    /*if(($("#m_Ovlascenje").val() == 'treba broj ClientUser' &&  (i == 1)) || ($("#m_Ovlascenje").val() == 'ClientUser' &&  (i > 1)))
    {
        console.log($("#m_Ovlascenje").val());
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('users.fieldOvlascenjeGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }*/
    return {
        err      : err,
        data     : data_,
        services : services_,
        servicesId : servicesId
    };
//    return err, data;
}

function selectServicesSelected(Services) {
    var length = 0;
    if (typeof Services != 'undefined' && Services) {
/*  will evaluate to true if value is not:
        null
        undefined
        NaN
        empty string ("")
        0
        false*/

        var Services = Services.split(",");
        length = Services.length;
    }
    var services_ = services.find();
    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 80px;" multiple>';
    var sEnd = '</select>';
    services_.forEach(function (post) {

        var found = false;
        for (var i = 0; i < length; i++) {
            if (post.Servis === Services[i]) {
                found = true;
                break;
            }
        }
        if (found) {
            if (Session.get("activity") == 'edit') {
               s += '<option value="' + post._id + '" selected="selected">' + post.Servis + '</option>';
            } else {
                s += '<option value="' + post._id + '" selected="selected" disabled>' + post.Servis + '</option>';
            }
        }
        else {
            if (Session.get("activity") == 'edit') {
                s += '<option value="' + post._id + '">' + post.Servis + '</option>';
            } else {
                s += '<option value="' + post._id + '" disabled>' + post.Servis + '</option>';
            }
        }
    });
    return s+sEnd;
}
function selectServices() {
    var services_ = services.find();
    var count = 0;
    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 80px;" multiple>';
    var sEnd = '</select>';
//    s += '<option value="' + '' + '" selected="selected">' + '' + '</option>';
    services_.forEach(function (post) {
        /*        if(count==1) {
         s += '<option value="' + post._id + '" selected="selected">' + post.Servis + '</option>';
         }
         else*/
        s += '<option value="' + post._id + '">' + post.Servis + '</option>';
        count++;
    });
    return s+sEnd;
}
/*function selectDaNe() {
    var s = '';
    var sEnd = '';

    s += '<input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter">';
    s += '<label for="subscribeNews">    (da/ne)?</label>';

    return s+sEnd;
}*/
function selectClientsSelected(Clients) {
    var length = 0;
    if (typeof Clients != 'undefined' && Clients) {
        /*  will evaluate to true if value is not:
         null
         undefined
         NaN
         empty string ("")
         0
         false*/

        var Clients = Clients.split(",");
        length = Clients.length;
    }

    var client = clients.find({},{sort: { "Komitent": 1 }});

//    var s = '<select id="m_KorisniciX1" class="form-control selectpicker show-tick" style="height: 28px;">';
    var s = '<select id="m_KorisniciX1" class="selectpicker" multiple>';
    var sEnd = '</select>';
    s += '<option value="' + '' + '" selected="selected">' + '' + '</option>';
//    s += '<option value="' + '' + '">' + '' + '</option>';
    client.forEach(function (post) {
        var found = false;
        for (var i = 0; i < length; i++) {
            if ((post.Komitent+' \\ '+post.Lokacija) === Clients[i]) {
                found = true;
                break;
            }
        }
        if (found) {
            if (Session.get("activity") == 'edit') {
                s += '<option value="' + post._id + '" selected="selected">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            } else {
                s += '<option value="' + post._id + '" selected="selected" disabled>' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            }
        }
        else {
            if (Session.get("activity") == 'edit') {
                s += '<option value="' + post._id + '">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            } else {
                s += '<option value="' + post._id + '" disabled>' + post.Komitent+' \\ '+post.Lokacija + '</option>';
            }
        }
    });
    return s+sEnd;

}
/*function setFocus() {
    alert ('xxxxxxxxxxxxxxxxxx');
    $('#m_KorisniciX1').first().focus();
    $('#m_KorisniciX1 option:selected').focus();
};*/



function selectClientsFirst() {
    var client = clients.find({},{sort: { "Komitent": 1 }});
    var count = 1;
//    var s = '<select id="m_KorisniciX1" class="form-control selectpicker show-tick" style="height: 28px;">';
    var s = '<select id="m_KorisniciX1" class="selectpicker" multiple>';
    var sEnd = '</select>';
    s += '<option value="' + '' + '" selected="selected">' + '' + '</option>';
//    s += '<option value="' + '' + '">' + '' + '</option>';
    client.forEach(function (post) {
        s += '<option value="' + post._id + '">' + post.Komitent+' \\ '+post.Lokacija + '</option>';
    });
    return s+sEnd;
}
function checkSignIzvestaji() {
    var xx = '';
    if (Session.get('Izvestaji')) {
        xx = '--> ✅';
    }
    return xx;
}

function checkSignZaduzenja() {
    var xx = '';
    if (Session.get('Zaduzenja')) {
        xx = '--> ✅';
    }
    return xx;
}

// End of generated file