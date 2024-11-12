/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/clients.js
 * generated:     2014/11/27 14:49
 */

Template.clients.helpers({
    clients: function() {
        return clients.find().fetch();
    },
    zones: function() {
        return zones.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('clients.modalTitleAdd');
            case 'view':
                return i18n('clients.modalTitleView');
            case 'edit':
                return i18n('clients.modalTitleEdit');
            case 'delete':
                return i18n('clients.modalTitleDelete');
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
                +tdLeft1+i18n('clients.fieldKomitentModalLabel')+tdLeft2+tdRight1+'m_Komitent'+tdRight2Add
                +tdLeft1+i18n('clients.fieldLokacijaModalLabel')+tdLeft2+tdRight1+'m_Lokacija'+tdRight2Add
                +tdLeft1+i18n('clients.fieldAdresaModalLabel')+tdLeft2+tdRight1+'m_Adresa'+tdRight2Add
                +tdLeft1+i18n('clients.fieldMestoModalLabel')+tdLeft2+tdRight1+'m_Mesto'+tdRight2Add
                +tdLeft1+i18n('clients.fieldOdgovornoLiceModalLabel')+tdLeft2+tdRight1+'m_OdgovornoLice'+tdRight2Add
                +tdLeft1+i18n('clients.fieldTelefonModalLabel')+tdLeft2+tdRight1+'m_Telefon'+tdRight2Add
                +tdLeft1+i18n('clients.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2Add
                +tdLeft1+i18n('clients.fieldZonaModalLabel')+tdLeft2 + tdRightSelect + selectZones() + tdRightSelectEnd
                +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('clients.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldKomitentModalLabel')+tdLeft2+tdRight1+'m_Komitent'+tdRight2View+Session.get('Komitent')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldLokacijaModalLabel')+tdLeft2+tdRight1+'m_Lokacija'+tdRight2View+Session.get('Lokacija')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldAdresaModalLabel')+tdLeft2+tdRight1+'m_Adresa'+tdRight2View+Session.get('Adresa')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldMestoModalLabel')+tdLeft2+tdRight1+'m_Mesto'+tdRight2View+Session.get('Mesto')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldOdgovornoLiceModalLabel')+tdLeft2+tdRight1+'m_OdgovornoLice'+tdRight2View+Session.get('OdgovornoLice')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldTelefonModalLabel')+tdLeft2+tdRight1+'m_Telefon'+tdRight2View+Session.get('Telefon')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2ViewEnd
                +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('clients.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldKomitentModalLabel')+tdLeft2+tdRight1+'m_Komitent'+tdRight2View+Session.get('Komitent')+tdRight2Add
                +tdLeft1+i18n('clients.fieldLokacijaModalLabel')+tdLeft2+tdRight1+'m_Lokacija'+tdRight2View+Session.get('Lokacija')+tdRight2Add
                +tdLeft1+i18n('clients.fieldAdresaModalLabel')+tdLeft2+tdRight1+'m_Adresa'+tdRight2View+Session.get('Adresa')+tdRight2Add
                +tdLeft1+i18n('clients.fieldMestoModalLabel')+tdLeft2+tdRight1+'m_Mesto'+tdRight2View+Session.get('Mesto')+tdRight2Add
                +tdLeft1+i18n('clients.fieldOdgovornoLiceModalLabel')+tdLeft2+tdRight1+'m_OdgovornoLice'+tdRight2View+Session.get('OdgovornoLice')+tdRight2Add
                +tdLeft1+i18n('clients.fieldTelefonModalLabel')+tdLeft2+tdRight1+'m_Telefon'+tdRight2View+Session.get('Telefon')+tdRight2Add
                +tdLeft1+i18n('clients.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2Add
                //+tdLeft1+i18n('clients.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2Add
                +tdLeft1+i18n('clients.fieldZonaModalLabel')+tdLeft2 + tdRightSelect + selectZonesSelected(Session.get('Zona')) + tdRightSelectEnd
                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('clients.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldKomitentModalLabel')+tdLeft2+tdRight1+'m_Komitent'+tdRight2View+Session.get('Komitent')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldLokacijaModalLabel')+tdLeft2+tdRight1+'m_Lokacija'+tdRight2View+Session.get('Lokacija')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldAdresaModalLabel')+tdLeft2+tdRight1+'m_Adresa'+tdRight2View+Session.get('Adresa')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldMestoModalLabel')+tdLeft2+tdRight1+'m_Mesto'+tdRight2View+Session.get('Mesto')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldOdgovornoLiceModalLabel')+tdLeft2+tdRight1+'m_OdgovornoLice'+tdRight2View+Session.get('OdgovornoLice')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldTelefonModalLabel')+tdLeft2+tdRight1+'m_Telefon'+tdRight2View+Session.get('Telefon')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_Email'+tdRight2View+Session.get('Email')+tdRight2ViewEnd
                +tdLeft1+i18n('clients.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2ViewEnd
                +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('clients.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('clients.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('clients.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('clients.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('clients.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('clients.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('clients.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Actions', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('clients.tooltipView')+'" data-target="#modalClients" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('clients.tooltipEdit')+'" data-target="#modalClients" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('clients.tooltipDelete')+'" data-target="#modalClients" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Komitent', label: i18n('clients.fieldKomitentGridLabel'), sort: 'asc' },
                { key: 'Lokacija', label: i18n('clients.fieldLokacijaGridLabel') },
                { key: 'Adresa', label: i18n('clients.fieldAdresaGridLabel') },
                { key: 'Mesto', label: i18n('clients.fieldMestoGridLabel') },
                { key: 'OdgovornoLice', label: i18n('clients.fieldOdgovornoLiceGridLabel') },
                { key: 'Telefon', label: i18n('clients.fieldTelefonGridLabel') },
                { key: 'Email', label: i18n('clients.fieldEmailGridLabel') },
                { key: 'Zona', label: i18n('clients.fieldZonaGridLabel'),
                    fn: function(value, object){
                        var zone = getZona(object.Zona);
                        return zone;
                    }}
            ],
            filters: ['myFilter'],
            rowClass: function(item) {},
//            showFilter: true,
            rowsPerPage:10,
            showNavigation:'auto', //  always never auto
            useFontAwesome: true,
            showNavigationRowsPerPage: true,
            //showColumnToggles:true,
            class: "table table-striped table-bordered table-hover table-condensed display table-responsive no-wrap"

//            class: "table table-striped table-hover" // table table-striped table-bordered table-hover table-condensed
        }
    }
});

Template.clients.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            //console.log(this.OdgovornoLice);
            Session.set('_id', this._id);
            Session.set('Komitent', this.Komitent);
            Session.set('Lokacija', this.Lokacija);
            Session.set('Adresa', this.Adresa);
            Session.set('Mesto', this.Mesto);
            Session.set('OdgovornoLice', this.OdgovornoLice);
            Session.set('Telefon', this.Telefon);
            Session.set('Email', this.Email);
            Session.set('Zona', getZona(this.Zona));
        }
    },
    'click #bAdd': function(event) {
        var err = validateInput_Clients();
        if(err == 0){
            try {
                clients.insert( {
                    'Komitent': $('#m_Komitent').val(),
                    'Lokacija': $('#m_Lokacija').val(),
                    'Adresa': $('#m_Adresa').val(),
                    'Mesto': $('#m_Mesto').val(),
                    'OdgovornoLice': $('#m_OdgovornoLice').val(),
                    'Telefon': $('#m_Telefon').val(),
                    'Email': $('#m_Email').val(),
                    'Zona': $('#m_Zona').val()
                });
                $.growl('<strong>'+i18n('clients.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalClients').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var err = validateInput_Clients();
        if(err == 0){
            try {
                clients.update({'_id': Session.get('_id')}, {$set: {
                    'Komitent': $('#m_Komitent').val(),
                    'Lokacija': $('#m_Lokacija').val(),
                    'Adresa': $('#m_Adresa').val(),
                    'Mesto': $('#m_Mesto').val(),
                    'OdgovornoLice': $('#m_OdgovornoLice').val(),
                    'Telefon': $('#m_Telefon').val(),
                    'Email': $('#m_Email').val(),
                    'Zona': $('#m_Zona').val()
                }});
                $.growl('<strong>'+i18n('clients.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalClients').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            clients.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('clients.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalClients').modal('hide');
    }
});

Template.clients.rendered = function() {
//    $('.reactive-table-options').removeClass('col-sm-8');
//    $('.reactive-table-filter').removeClass('col-sm-8');
    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('clients.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('clients.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('clients.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('clients.tooltipAdd')+'" data-target="#modalClients" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.buttonFilter').html()*/
    );
    $('#modalClients').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Komitent').val('');
            $('#m_Lokacija').val('');
            $('#m_Adresa').val('');
            $('#m_Mesto').val('');
            $('#m_OdgovornoLice').val('');
            $('#m_Telefon').val('');
            $('#m_Email').val('');
            $('#m_Zona').val('');
        } else {
            $('#m_Komitent').val(Session.get('Komitent'));
            $('#m_Lokacija').val(Session.get('Lokacija'));
            $('#m_Adresa').val(Session.get('Adresa'));
            $('#m_Mesto').val(Session.get('Mesto'));
            $('#m_OdgovornoLice').val(Session.get('OdgovornoLice'));
            $('#m_Telefon').val(Session.get('Telefon'));
            $('#m_Email').val(Session.get('Email'));
            //$('#m_Zona').val(Session.get('Zona'));
        }
        $('#m_Komitent').focus();
    });
}

function selectZones() {
    var zone = zones.find();
    var count = 1;
    var s = '<select id="m_Zona" class="form-control selectpicker show-tick" style="height: 23px;">';
    var sEnd = '</select>';
    zone.forEach(function (post) {
        if(count==1) {
            s += '<option value="' + post._id + '" selected="selected">' + post.Zona + '</option>';
            count++;
        }
        else
            s += '<option value="' + post._id + '">' + post.Zona + '</option>';
    });
    return s+sEnd;
}
function selectZonesSelected(name) {
    var zone = zones.find();
    var s = '<select id="m_Zona" class="form-control selectpicker show-tick" style="height: 23px;">';
    var sEnd = '</select>';
    zone.forEach(function (post) {
        if(post.Zona == name)
            s += '<option value="' + post._id + '" selected="selected">' + post.Zona + '</option>';
        else
            s += '<option value="' + post._id + '">' + post.Zona + '</option>';
    });
    return s+sEnd;
}
function getZona(id) {
    var zone = zones.find({'_id': id}).fetch();
    return zone[0].Zona;
}
function validateInput_Clients() {
    var err = 0;

    if(($('#m_Komitent').val().length < 2) || ($('#m_Komitent').val().indexOf(",") !== -1)){
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldKomitentGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Lokacija').val().length < 2) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldLokacijaGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Adresa').val().length < 2) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldAdresaGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_Mesto').val().length < 2) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldMestoGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    //if($('#m_OdgovornoLice').val().length < 2) {
    //    $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldOdgovornoLiceGrowlErrorMessage'), {
    //        type: 'danger', z_index: 99999, allow_dismiss: false
    //    });
    //    err++;
    //}
    //if($('#m_Telefon').val().length < 2) {
    //    $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldTelefonGrowlErrorMessage'), {
    //        type: 'danger', z_index: 99999, allow_dismiss: false
    //    });
    //    err++;
    //}
    //if($('#m_Email').val().length < 2) {
    //    $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldEmailGrowlErrorMessage'), {
    //        type: 'danger', z_index: 99999, allow_dismiss: false
    //    });
    //    err++;
    //}
    if(!$("#m_Zona option:selected").length) {
        $.growl('<strong>'+i18n('clients.growlError')+'</strong><br />'+i18n('clients.fieldZonaGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}
// End of generated file