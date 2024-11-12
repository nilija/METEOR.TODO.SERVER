/**
 * Meteor: the smart way to build applications!
 *
 * @copyright     Copyright 2014, 
 * @license       http://opensource.org/licenses/bsd-license.php The BSD License
 *
 * filename:      client/views/priorities.js
 * generated:     2014/11/27 14:45
 */

Template.priorities.helpers({
    priorities: function() {
        return priorities.find().fetch();
    },
    modalTitle: function() {
        switch(Session.get("activity")){
            case 'add':
                return i18n('priorities.modalTitleAdd');
            case 'view':
                return i18n('priorities.modalTitleView');
            case 'edit':
                return i18n('priorities.modalTitleEdit');
            case 'delete':
                return i18n('priorities.modalTitleDelete');
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
                    + tdLeft1+i18n('priorities.fieldPrioritetModalLabel')+tdLeft2+tdRight1+'m_Prioritet'+tdRight2Add
                    + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServices()+"</td></tr>"
                    + tdLeft1+i18n('priorities.fieldVremeModalLabel')+tdLeft2+tdRight1+'m_Vreme'+tdRight2Add
                    +tFooter);
            case 'view':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('priorities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                    + tdLeft1+i18n('priorities.fieldPrioritetModalLabel')+tdLeft2+tdRight1+'m_Prioritet'+tdRight2View+Session.get('Prioritet')+tdRight2ViewEnd
                    + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('Services_Id'))+"</td></tr>"
                    + tdLeft1+i18n('priorities.fieldVremeModalLabel')+tdLeft2+tdRight1+'m_Vreme'+tdRight2View+Session.get('VremeOdziva')+tdRight2ViewEnd
                    +tFooter);
            case 'edit':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('priorities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                    + tdLeft1+i18n('priorities.fieldPrioritetModalLabel')+tdLeft2+tdRight1+'m_Prioritet'+tdRight2View+Session.get('Prioritet')+tdRight2Add
                    + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('Services_Id'))+"</td></tr>"
                    + tdLeft1+i18n('priorities.fieldVremeModalLabel')+tdLeft2+tdRight1+'m_Vreme'+tdRight2View+Session.get('VremeOdziva')+tdRight2Add
                    +tFooter);
            case 'delete':
                return Spacebars.SafeString(tHeader
//                +tdLeft1+i18n('priorities.fieldIdModalLabel')+tdLeft2+tdRight1+'m_id'+tdRight2View+Session.get('_id')+tdRight2ViewEnd
                    + tdLeft1+i18n('priorities.fieldPrioritetModalLabel')+tdLeft2+tdRight1+'m_Prioritet'+tdRight2View+Session.get('Prioritet')+tdRight2ViewEnd
                    + "<tr><td style='width: 20%;text-align: right;padding-top: 5px;'><label for='m_Services'>Services:</label>"+tdLeft2 + tdRightSelect +selectServicesSelected(Session.get('Services_Id'))+"</td></tr>"
                    + tdLeft1+i18n('priorities.fieldVremeModalLabel')+tdLeft2+tdRight1+'m_Vreme'+tdRight2View+Session.get('VremeOdziva')+tdRight2ViewEnd
                    +tFooter);
        }
    },
    modalFooter: function() {
        switch(Session.get("activity")){
            case 'add':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('priorities.modalFooterCancel')+'</button>'
                + '<button id="bAdd" type="button" class="btn btn-success btn-xs">'+i18n('priorities.modalFooterAdd')+'</button>');
            case 'view':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('priorities.modalFooterClose')+'</button>');
            case 'edit':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('priorities.modalFooterCancel')+'</button>'
                       + '<button id="bEdit" type="button" class="btn btn-primary btn-xs">'+i18n('priorities.modalFooterChange')+'</button>');
            case 'delete':
                return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">'+i18n('priorities.modalFooterNo')+'</button>'
                       + '<button id="bDelete" type="button" class="btn btn-danger btn-xs">'+i18n('priorities.modalFooterYes')+'</button>');
        }
    },
    settings: function() {
        return {
            fields: [
                { key: 'buttons', label: 'Action', sortable: false,
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a data-toggle="modal" data-tooltip="'+i18n('priorities.tooltipView')+'" data-target="#modalPriorities" onclick="Session.set('+"'activity','view'"+');" class="label label-default tooltip-right"><i class="glyphicon glyphicon-search"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('priorities.tooltipEdit')+'" data-target="#modalPriorities" onclick="Session.set('+"'activity','edit'"+');" class="label label-primary tooltip-right"><i class="glyphicon glyphicon-edit"></i></a>'
                                +'<a data-toggle="modal" data-tooltip="'+i18n('priorities.tooltipDelete')+'" data-target="#modalPriorities" onclick="Session.set('+"'activity','delete'"+');" class="label label-danger tooltip-right"><i class="glyphicon glyphicon-remove"></i></a>'
                        );
                    }
                },
                { key: 'Prioritet', label: i18n('priorities.fieldPrioritetGridLabel'), sort: 'asc' },
                { key: 'Services', label: 'Servis',
                    fn: function(value, object) {
                        var service = getService(object.Services);
                        return service;
                    }
                },
                { key: '_id', label: 'id'},
                { key: 'VremeOdziva', label: 'Vreme Odziva:'}
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

Template.priorities.events({
    'click .reactive-table tr': function (event) {
        if(this._id!=undefined) {
            Session.set('_id', this._id);
            Session.set('Prioritet', this.Prioritet);
            Session.set('Services_Id', this.Services);
            Session.set('VremeOdziva', this.VremeOdziva);
        }
    },
    'click #bAdd': function(event) {
        var result = validateInput_Priorities();
        var err = result.err;
 /*       var xxx = new NumberInt (result.data);
*/
        if(err == 0){
            try {
                priorities.insert(
                    { 'Prioritet': $('#m_Prioritet').val(),
                      'Services' : result.services,
                      'VremeOdziva' : result.data
                    }
                );
                $.growl('<strong>'+i18n('priorities.growlSuccessAdd')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('priorities.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalPriorities').modal('hide');
        }
    },
    'click #bEdit': function(event) {
        var result = validateInput_Priorities();
        var err = result.err;
        if(err == 0){
            try {
                priorities.update({'_id': Session.get('_id')}, {$set: {
                    'Prioritet' : $('#m_Prioritet').val(),
                    'Services' : result.services,
                    'VremeOdziva' : result.data
                }});
                $.growl('<strong>'+i18n('priorities.growlSuccessEdit')+'</strong>', {
                    type: 'success', z_index: 99999, allow_dismiss: false
                });
            }
            catch(err) {
                $.growl('<strong>'+i18n('priorities.growlError')+'</strong><br />'+err.message, {
                    type: 'danger', z_index: 99999, allow_dismiss: false
                });
            }
            $('#modalPriorities').modal('hide');
        }
    },
    'click #bDelete': function(event) {
        try {
            priorities.remove({ '_id': Session.get('_id')});
            $.growl('<strong>'+i18n('priorities.growlSuccessDelete')+'</strong>', {
                type: 'success', z_index: 99999, allow_dismiss: false
            });
        }
        catch(err) {
            $.growl('<strong>'+i18n('priorities.growlError')+'</strong><br />'+err.message, {
                type: 'danger', z_index: 99999, allow_dismiss: false
            });
        }
        $('#modalPriorities').modal('hide');
    }
});

Template.priorities.rendered = function() {
/*    $('.reactive-table-options').removeClass('col-sm-8');
    $('.reactive-table-filter').removeClass('col-sm-8');*/
    $('.nameAdd').html('<div class="row">'
            +'<h3 class="pull-left" style="color: rgb(49, 112, 143);"><em><strong>'+i18n('priorities.title')+'</strong></em></h3>'
            +'<h3 class="pull-right"><a data-tooltip="'+i18n('priorities.tooltipPrint')+'" class="btn btn-info btn-sm tooltip-left">'+i18n('priorities.titlePrint')+'</a>&nbsp;&nbsp;'
            +'<a data-toggle="modal" data-tooltip="'+i18n('priorities.tooltipAdd')+'" data-target="#modalPriorities" onclick="Session.set(' + "'activity','add'" + ');"class="btn btn-success btn-sm tooltip-left">+</a>&nbsp;</h3>'
            +'</div>'
/*            +$('.reactive-table-filter').html()*/
    );
    $('#modalPriorities').on('shown.bs.modal', function (e) {
        if(Session.get('activity')=='add') {
            $('#m_Prioritet').val('');
        } else {
            $('#m_Prioritet').val(Session.get('Prioritet'));
        }
        $('#m_Prioritet').focus();
    });
}

function validateInput_Priorities() {
    var err = 0;
    if($('#m_Prioritet').val().length < 2) {
        $.growl('<strong>'+i18n('priorities.growlError')+'</strong><br />'+i18n('priorities.fieldPrioritetGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }

    var services_='';
    i = 0;
    $el=$("#m_Services");
    $el.find('option:selected').each(function(){
//        data.push({value:$(this).val(),text:$(this).text()});
//        console.log ($(this).text());
//        console.log ($(this).val());
        i++;
        if (i == 1)
            services_ += $(this).val();
        else
            services_ += ',' + $(this).val();
    });
/*    let numberValue = parseInt(form.value, 10) || 0;*/
    var data_ = parseInt($('#m_Vreme').val(), 10) || 0;
    if ((data_ < 1) || (data_ > 999)) {
        $.growl('<strong>'+i18n('priorities.growlError')+'</strong><br />'+i18n('priorities.fieldVremeGrowlErrorMessage'), {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }

    return {
        err      : err,
        data     : data_,
        services : services_
    };
//    return err, data;
//    return err;
}
function selectServices() {
    var services_ = services.find();
    var count = 0;
    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 30px;">';
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
    var s = '<select id="m_Services" class="form-control selectpicker show-tick" style="height: 30px;">';
    var sEnd = '</select>';
    services_.forEach(function (post) {

        var found = false;
        for (var i = 0; i < length; i++) {
            if (post._id === Services[i]) {
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
function getService(id) {
    var service = services.find({'_id': id}).fetch();
    return service[0].Servis;
}
function vremeOdziva() {
    var count = 0;
    var ostalo = 'ostalo';
    var s = '<select id="m_Vreme" class="form-control selectpicker show-tick" style="height: 30px;">';
    var sEnd = '</select>';
    s += '<option value="' + 4 + '">' + 4 + '</option>';
    count++;
    s += '<option value="' + 8 + '">' + 8 + '</option>';
    count++;
    s += '<option value="' + 24 + '">' + 24 + '</option>';
    count++;
    s += '<option value="' + ostalo + '">' + ostalo + '</option>';
    count++;
    return s+sEnd;
}

function vremeOdzivaSelected(Vreme) {
    var count = 0;
    var ostalo = 'ostalo';
    var s = '<select id="m_Vreme" class="form-control selectpicker show-tick" style="height: 30px;">';
    var sEnd = '</select>';
    count++;
    if (Vreme == 4) {
        s += '<option value="' + 4 + '" selected="selected" disabled>' + 4 + '</option>';
    }
    else
        s += '<option value="' + 4 + '">' + 4 + '</option>';
    count++;
    if (Vreme == 8) {
        s += '<option value="' + 8 + '" selected="selected" disabled>' + 8 + '</option>';
    }
    else
        s += '<option value="' + 8 + '">' + 8 + '</option>';
    count++;
    if (Vreme == 24) {
        s += '<option value="' + 24 + '" selected="selected" disabled>' + 24 + '</option>';
    }
    else
        s += '<option value="' + 24 + '">' + 24 + '</option>';
    count++;
    if (Vreme == ostalo) {
        s += '<option value="' + ostalo + '" selected="selected" disabled>' + ostalo + '</option>';
    }
    else
        s += '<option value="' + ostalo + '">' + ostalo + '</option>';
    return s+sEnd;
}
/*function selectDaNe() {
 var s = '';
 var sEnd = '';

 s += '<input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter">';
 s += '<label for="subscribeNews">    (da/ne)?</label>';

 return s+sEnd;
 }*/

// End of generated file