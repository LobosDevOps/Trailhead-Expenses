({
    doInit: function(component, event, helper) {
    },
    doSearch: function(component, event, helper){
        var params = event.getParam('arguments');
        component.set("v.boatTypeId1", params.boatTypeId);
        helper.onSearch(component,event);
        return "search complete.";
    },
    onBoatSelect: function(component, event, helper){
        var boatId = event.getParam("boatId");
        component.set("v.selectedBoatId", boatId);
       
    }
})