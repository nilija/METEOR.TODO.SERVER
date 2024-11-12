/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/interventions.js
 * generated:     2014/11/27 14:42
 */

Template.interventions.helpers({
    interventions: function() {
        return interventions.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('interventions.modalTitleAdd');
            case 'view':
                return i18n('interventions.modalTitleView');
            case 'edit':
                return i18n('interventions.modalTitleEdit');
            case 'delete':
                return i18n('interventions.modalTitleDelete');
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
                +tdLeft1+i18n('interventions.fieldIntervencijaModalLabel')+tdLeft2+tdRight1+'m_Intervencija'+tdRight2Add
                +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('interventions.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('interventions.fieldIntervencijaModalLabel')+tdLeft2+tdRight1+'m_Intervencija'+tdRight2View+Session.get('Intervencija')+tdRight2ViewEnd
                +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
 //               +tdLeft1+i18n('interventions.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('interventions.fieldIntervencijaModalLabel')+tdLeft2+tdRight1+'m_Intervencija'+tdRight2View+Session.get('Intervencija')+tdRight2Add
                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('interventions.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('interventions.fieldIntervencijaModalLabel')+tdLeft2+tdRight1+'m_Intervencija'+tdRight2View+Session.get('Intervencija')+tdRight2ViewEnd
                +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('interventions.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('interventions.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('interventions.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('interventions.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('interventions.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('interventions.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('interventions.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Action', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('interventions.tooltipView')+'" data-target="#modalInterventions" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('interventions.tooltipEdit')+'" data-target="#modalInterventions" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('interventions.tooltipDelete')+'" data-target="#modalInterventions" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Intervencija', label: i18n('interventions.fieldIntervencijaGridLabel'), sort: 'asc' }
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

Template.interventions.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set('_id', this._id);
            Session.set('Intervencija', this.Intervencija);
        }
    },
    'click #bAdd': function(event) {
        var err = validateInput_Interventions();
        if(err == 0){
            try {
                interventions.insert({ 'Intervencija': $('#m_Intervencija').val()});
                $.growl('<strong>'+i18n('interventions.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('interventions.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalInterventions').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var err = validateInput_Interventions();
        if(err == 0){
            try {
                interventions.update({'_id': Session.get('_id')}, {$set: {'Intervencija' : $('#m_Intervencija').val()}});
                $.growl('<strong>'+i18n('interventions.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('interventions.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalInterventions').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            interventions.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('interventions.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('interventions.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalInterventions').modal('hide');
    }
});

Template.interventions.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/

    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('interventions.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('interventions.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('interventions.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('interventions.tooltipAdd')+'" data-target="#modalInterventions" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.reactive-table-filter').html()*/
    );
    $('#modalInterventions').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Intervencija').val('');
        } else {
            $('#m_Intervencija').val(Session.get('Intervencija'));
        }
        $('#m_Intervencija').focus();
    });
}

function validateInput_Interventions() {
    var err = 0;
    if($('#m_Intervencija').val().length < 2) {
        $.growl('<strong>'+i18n('interventions.growlError')+'</strong><br />'+i18n('interventions.fieldIntervencijaGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}
// End of generated file