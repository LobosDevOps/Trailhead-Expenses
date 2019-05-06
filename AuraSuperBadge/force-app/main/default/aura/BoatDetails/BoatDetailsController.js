({
    init: function(component, event, helper) {
        component.set("v.enableFullDetails", $A.get("e.force:navigateToSObject"));
    },
    onBoatSelected : function(component, event, helper) {
        var boatSelected=event.getParam("boat");
        component.set("v.id",boatSelected.Id);
        component.find("service").reloadRecord() ;
        
    },
    onRecordUpdated : function(component, event, helper){
        
    },
    onBoatReviewAdded : function(component, event, helper) {
        console.log("Event received");
        component.find("details").set("v.selectedTabId", 'boatreviewtab');
        var BRcmp = component.find("BRcmp");
        console.log(BRcmp);
        var auraMethodResult = BRcmp.refresh();            
    },
})