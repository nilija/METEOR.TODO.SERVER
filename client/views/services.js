/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/services.js
 * generated:     2014/11/27 14:45
 */

Template.services.helpers({
    services: function() {
        return services.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('services.modalTitleAdd');
            case 'view':
                return i18n('services.modalTitleView');
            case 'edit':
                return i18n('services.modalTitleEdit');
            case 'delete':
                return i18n('services.modalTitleDelete');
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
                +tdLeft1+i18n('services.fieldServisModalLabel')+tdLeft2+tdRight1+'m_Servis'+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailOpen'+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailClose'+tdRight2Add
                +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('services.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('services.fieldServisModalLabel')+tdLeft2+tdRight1+'m_Servis'+tdRight2View+Session.get('Servis')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailOpen'+tdRight2View+Session.get('EmailOpen')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailClose'+tdRight2View+Session.get('EmailClose')+tdRight2ViewEnd

                +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('services.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('services.fieldServisModalLabel')+tdLeft2+tdRight1+'m_Servis'+tdRight2View+Session.get('Servis')+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailOpen'+tdRight2View+Session.get('EmailOpen')+tdRight2Add
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailClose'+tdRight2View+Session.get('EmailClose')+tdRight2Add

                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('services.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('services.fieldServisModalLabel')+tdLeft2+tdRight1+'m_Servis'+tdRight2View+Session.get('Servis')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailOpen'+tdRight2View+Session.get('EmailOpen')+tdRight2ViewEnd
                +tdLeft1+i18n('users.fieldEmailModalLabel')+tdLeft2+tdRight1+'m_EmailClose'+tdRight2View+Session.get('EmailClose')+tdRight2Add

                +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('services.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('services.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('services.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('services.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('services.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('services.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('services.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Action', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('services.tooltipView')+'" data-target="#modalServices" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('services.tooltipEdit')+'" data-target="#modalServices" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('services.tooltipDelete')+'" data-target="#modalServices" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Servis', label: i18n('services.fieldServisGridLabel'), sort: 'asc' },
                { key: 'EmailOpen', label: 'Email Servis' },
                { key: 'EmailClose', label: 'Email Acc' }
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

Template.services.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set('_id', this._id);
            Session.set('Servis', this.Servis);
            Session.set('EmailOpen', this.EmailOpen);
            Session.set('EmailClose', this.EmailClose);
        }
    },
    'click #bAdd': function(event) {
        var err = validateInput_Services();
        if(err == 0){
            try {
                services.insert({ 'Servis': $('#m_Servis').val(), EmailOpen : $('#m_EmailOpen').val(), EmailClose : $('#m_EmailClose').val()});
                $.growl('<strong>'+i18n('services.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('services.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalServices').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var err = validateInput_Services();
        if(err == 0){
            try {
                services.update({'_id': Session.get('_id')}, {$set: {'Servis' : $('#m_Servis').val(), EmailOpen : $('#m_EmailOpen').val(), EmailClose : $('#m_EmailClose').val()}});
                $.growl('<strong>'+i18n('services.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('services.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalServices').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            services.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('services.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('services.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalServices').modal('hide');
    }
});

Template.services.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/
    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('services.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('services.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('services.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('services.tooltipAdd')+'" data-target="#modalServices" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.reactive-table-filter').html()*/
    );
    $('#modalServices').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Servis').val('');
            $('#m_EmailOpen').val('');
            $('#m_EmailClose').val('');
        } else {
            $('#m_Servis').val(Session.get('Servis'));
            $('#m_EmailOpen').val(Session.get('EmailOpen'));
            $('#m_EmailClose').val(Session.get('EmailClose'));
        }
        $('#m_Servis').focus();
    });
}

function validateInput_Services() {
    var err = 0;
    if($('#m_Servis').val().length < 2) {
        $.growl('<strong>'+i18n('services.growlError')+'</strong><br />'+i18n('services.fieldServisGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }

    if($('#m_EmailOpen').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldEmailGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }

    if($('#m_EmailClose').val().length < 2) {
        $.growl('<strong>'+i18n('users.growlError')+'</strong><br />'+i18n('users.fieldEmailGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }

    return err;
}
// End of generated file