({
    init: function (component, event, helper) {
        component.set('v.loading', true);
    },
    handleSuccess: function (component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();

        // component.find("overlayLib").notifyClose();
        //showToast
        helper.showToast("Success", "Record has been saved!", "success", "dismissible");
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
        $A.get("e.force:closeQuickAction").fire();
    },
})
