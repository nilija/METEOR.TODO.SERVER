/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/zones.js
 * generated:     2014/11/27 14:03
 */

Template.zones.helpers({
    zones: function() {
        return zones.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('zones.modalTitleAdd');
            case 'view':
                return i18n('zones.modalTitleView');
            case 'edit':
                return i18n('zones.modalTitleEdit');
            case 'delete':
                return i18n('zones.modalTitleDelete');
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
        var tFooter ='</tbody></table>';
        switch(Session.get("activity")){
            case 'add':
                return Spacebars.SafeString(tHeader
                +tdLeft1+i18n('zones.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2Add
                +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('zones.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('zones.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2ViewEnd
                +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('zones.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('zones.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2Add
                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('zones.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('zones.fieldZonaModalLabel')+tdLeft2+tdRight1+'m_Zona'+tdRight2View+Session.get('Zona')+tdRight2ViewEnd
                +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('zones.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('zones.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('zones.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('zones.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('zones.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('zones.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('zones.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Action', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('zones.tooltipView')+'" data-target="#modalZones" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('zones.tooltipEdit')+'" data-target="#modalZones" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('zones.tooltipDelete')+'" data-target="#modalZones" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Zona', label: i18n('zones.fieldZonaGridLabel'), sort: 'asc' }
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

Template.zones.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set('_id', this._id);
            Session.set('Zona', this.Zona);
        }
    },
    'click #bAdd': function(event) {
        var err = validateInput_Zones();
        if(err == 0){
            try {
                zones.insert({ 'Zona': $('#m_Zona').val()});
                $.growl('<strong>'+i18n('zones.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('zones.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalZones').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var err = validateInput_Zones();
        if(err == 0){
            try {
                zones.update({'_id': Session.get('_id')}, {$set: {'Zona' : $('#m_Zona').val()}});
                $.growl('<strong>'+i18n('zones.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('zones.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalZones').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            zones.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('zones.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('zones.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalZones').modal('hide');
    }
});

Template.zones.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/
    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('zones.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('zones.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('zones.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('zones.tooltipAdd')+'" data-target="#modalZones" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.reactive-table-filter').html()*/
    );
    $('#modalZones').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Zona').val('');
        } else {
            $('#m_Zona').val(Session.get('Zona'));
        }
        $('#m_Zona').focus();
    });
}

function validateInput_Zones() {
    var err = 0;
    if($('#m_Zona').val().length < 2) {
        $.growl('<strong>'+i18n('zones.growlError')+'</strong><br />'+i18n('zones.fieldZonaGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}
// End of generated file