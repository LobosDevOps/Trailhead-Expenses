({
    init: function (component, event, helper) {
        component.set('v.loading', true);
    },
    handleSuccess: function (component, event, helper) {
        // $A.get("e.force:closeQuickAction").fire();
        component.find("overlayLib").notifyClose();
        //showToast
        helper.showToast("Success", "Boat is created!", "success", "dismissible");

        // send search event
        let appEvent = $A.get("e.c:BoatCreateedToSearchEvt");
        appEvent.setParams({"createResult": "OK" });
        appEvent.fire();
console.log("handleSuccess here 1 ");
    },
 
    handleError: function (component, event, helper) {
        component.set('v.loading', false);
        component.find('newBoatMessage').setError('Undefined error occured');
    },
 
    handleLoad: function(component, event, helper) {
        component.set('v.loading', false);
    },
 
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        helper.handleFormSubmit(component, helper);
    },
    onCancel : function(component, event, helper) {
        component.find("overlayLib").notifyClose();
    },
})
