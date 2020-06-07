({
    onFullDetails : function(component, event, helper) {
        //画面遷移
    //     let navEvt = $A.get("e.force:navigateToSObject");
    //     navEvt.setParams({
    //      "recordId":  component.get("v.boat.Id")
    //    });
    //    navEvt.fire();

    // Open new tab
    window.open(`/lightning/r/Boat__c/${component.get("v.boat.Id")}/view`);
   },
})
