
Meteor.methods({
///////////////////////////////////// Ne moze i insert jer ne moze da se uhvati callback
///////////////////////////////////// inace ista je publikacija i iz klijenta i iz servera, tako da je onda i upis isti
///////////////////////////////////// Radi se publikacija samo za dodati slog
    
getTicketsCount: function() {
    var rbr = tickets.find().count();
    return rbr;
}
});