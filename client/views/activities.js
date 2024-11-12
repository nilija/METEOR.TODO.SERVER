Template.activities.helpers({
    activities: function() {
        return activities.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('activities.modalTitleAdd');
            case 'view':
                return i18n('activities.modalTitleView');
            case 'edit':
                return i18n('activities.modalTitleEdit');
            case 'delete':
                return i18n('activities.modalTitleDelete');
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
                +tdLeft1+i18n('activities.fieldAktivnostModalLabel')+tdLeft2+tdRight1+'m_Aktivnost'+tdRight2Add
                +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('activities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('activities.fieldAktivnostModalLabel')+tdLeft2+tdRight1+'m_Aktivnost'+tdRight2View+Session.get('Aktivnost')+tdRight2ViewEnd
                +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('activities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('activities.fieldAktivnostModalLabel')+tdLeft2+tdRight1+'m_Aktivnost'+tdRight2View+Session.get('Aktivnost')+tdRight2Add
                +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('activities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                +tdLeft1+i18n('activities.fieldAktivnostModalLabel')+tdLeft2+tdRight1+'m_Aktivnost'+tdRight2View+Session.get('Aktivnost')+tdRight2ViewEnd
                +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('activities.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('activities.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('activities.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('activities.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('activities.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('activities.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('activities.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Action', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('activities.tooltipView')+'" data-target="#modalActivities" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('activities.tooltipEdit')+'" data-target="#modalActivities" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('activities.tooltipDelete')+'" data-target="#modalActivities" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Aktivnost', label: i18n('activities.fieldAktivnostGridLabel'), sort: 'asc' }
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

Template.activities.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set("_id", this._id);
            Session.set("Aktivnost", this.Aktivnost);
        }
    },
    'click #bAdd': function(event) {
        var err = validateInput_Activities();
        if(err == 0){
            try {
                activities.insert({ "Aktivnost": $('#m_Aktivnost').val()});
                $.growl('<strong>'+i18n('activities.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('activities.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalActivities').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var err = validateInput_Activities();
        if(err == 0){
            try {
                activities.update({"_id": Session.get('_id')}, {$set: {"Aktivnost" : $('#m_Aktivnost').val()}});
                $.growl('<strong>'+i18n('activities.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('activities.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalActivities').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            activities.remove({ "_id": Session.get('_id')});
            $.growl('<strong>'+i18n('activities.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('activities.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalActivities').modal('hide');
    }
});

Template.activities.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/
    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('activities.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('activities.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('activities.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('activities.tooltipAdd')+'" data-target="#modalActivities" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a></h3>'
            +'</div>'
/*            +$('.reactive-table-filter').html()*/
    );
/*    if (document.getElementsByTagName) {

        var inputElements = document.getElementsByTagName("input");
        for (i=0; inputElements[i]; i++) {
            console.log (inputElements[i]);
        }
    }*/

//    $('.reactive-table-input').html();
    $('#modalActivities').on('shown.bs.modal', function (e) {
        if(Session.get("activity")=='add') {
            $('#m_Aktivnost').val('');
        } else {
            $('#m_Aktivnost').val(Session.get('Aktivnost'));
        }
        $('#m_Aktivnost').focus();
    });
}

function validateInput_Activities() {
    var err = 0;
    if($('#m_Aktivnost').val().length < 2) {
        $.growl('<strong>'+i18n('activities.growlError')+'</strong><br />'+i18n('activities.fieldAktivnostGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}
