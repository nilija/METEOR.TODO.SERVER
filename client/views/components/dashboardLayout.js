Template.dashboardLayout.helpers({
    isAdmin: function() {
        if(Session.get('isAdmin'))
            return true;
    },
    isClientUser: function() {
        if(Session.get('isClientUser'))
            return true;
    },
    isUser: function() {
        if(Session.get('isUser'))
            return true;
    },
    isIzvestaji: function() {
        if(Session.get('isIzvestaji'))
            return true;
    },
    isToDo: function() {
        if(Session.get('isClientSuperUser') && Session.get('isZaduzenja'))
            return true;
    }
});
Template.dashboardLayout.rendered = function() {
    $("#menu-toggle").click(function(e) {
        $("#wrapper").toggleClass("toggled");
        e.preventDefault();
    });
    $('#menu-toggle').click();
    $('#modalPassword').on('shown.bs.modal', function (e) {
        $('#m_password').val('');
        $('#m_password1').val('');
        $('#m_password').focus();
    });
}

Template.dashboardLayout.events({
    'click #logout': function (event) {
        event.preventDefault();
        // Remove all sessions variables ...
        Session.keys = {};
        // ... Then logout ....
        Meteor.logout();
    },
    'click #home' : function (event) {
        Router.go('/dashboard');
        return false;
    },
    'click #tiketi' : function (event) {
        Router.go('/tickets');
        return false;
    },
    'click #tiketiS' : function (event) {
        Router.go('/tickets');
        return false;
    },
    'click #tiketiKS' : function (event) {
        Router.go('/tickets');
        return false;
    },
    'click #korisnici' : function (event) {
        Router.go('/clients');
        return false;
    },
    'click #bChange' : function(event){
        var err = validateInput_changePassword();
        if(err == 0){
            try {
                Meteor.call('chPassword', Session.get('userID'), $('#m_password').val(), function(error) {
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
            $('#modalPassword').modal('hide');
        }
    },
    'click #redosled' : function(event){
        Router.go('/redosled');
        return false;
    }
});

Template.dashboardLayout.helpers({
    modalTitle: function() {
        return 'Promena lozinke';
    },
    modalBody: function() {
        var tHeader = '<table style="width: 100%;"><tbody>';
        var tdLeft1 = '<tr><td style="width: 30%; text-align: right; padding-top: 5px;"><label>';
        var tdLeft2 = '</label></td><td style="width: 2%;"></td>';
        var tdRight1 = '<td style="width: 68%;"><input type="password" style="height: 23px; width: 100%;" class="form-control" id="';
        var tdRight2Add = '" /></td></tr>';
        var tdRight2View = '" value="';
        var tdRight2ViewEnd = '" disabled=""/></td></tr>';
        var tFooter ='</tbody></table>';
        return Spacebars.SafeString(tHeader
            +tdLeft1+'Nova lozinka:'+tdLeft2+tdRight1+'m_password'+''+tdRight2Add
            +tdLeft1+'Ponovite lozinku:'+tdLeft2+tdRight1+'m_password1'+tdRight2View+''+tdRight2Add
            +tFooter);
    },
    modalFooter: function() {
        return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Odustani</button>'
        + '<button id="bChange" type="button" class="btn btn-primary btn-xs">Promeni</button>');
    },
    modalMTitle: function() {
        return 'Migracija podataka';
    },
    modalMBody: function() {
        return new Spacebars.SafeString('<strong><h3>Jeste li sigurni da želite sprovesti migraciju?</h3></strong>');
    },
    modalMFooter: function() {
        return new Spacebars.SafeString('<button type="button" class="btn btn-default btn-xs" data-dismiss="modal">Odustani</button>'
        + '<button id="bMigracija" type="button" class="btn btn-danger btn-xs">Sprovedi migraciju</button>');
    }
});
function validateInput_changePassword() {
    var err = 0;
    if($('#m_password').val().length < 2) {
        $.growl('<strong>GREŠKA!</strong><br />Lozinka mora biti barem 3 karaktera duga', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    if($('#m_password').val() != $('#m_password1').val()) {
        $.growl('<strong>GREŠKA!</strong><br />Lozinke nisu identične', {
            type: 'danger', z_index: 99999, allow_dismiss: false
        });
        err++;
    }
    return err;
}