({
    handleSuccess: function (component, event, helper) {
        //showToast
        helper.showToast("Success", "Record has been saved!", "success", "dismissible");

        //clear form value
        helper.clearAllFiledValue(component, "newCommentField");

        // component.find("boatName").set("v.value", null);
        // component.find("boatComment").set("v.value", null);
        component.set("v.rating", 0);
        component.find("fiveStarRating").clearRating();
        
        // send review added event
        component.getEvent("boatReviewAddedEvt").fire();
    },
 
    handleError: function (component, event, helper) {
        component.find('addReviewMessage').setError(`Error: ${JSON.stringify(event)}`);
    },
 
    handleSubmit: function(component, event, helper) {
        event.preventDefault();

        var vaildationFailReason = helper.onValidationCheck(component, "newCommentField", "Comment__c");
        // having error
        if (vaildationFailReason) {
            component.find('addReviewMessage').setError(vaildationFailReason);
            return;
        }

        // set Rating__c, Boat__c value
        var fields = event.getParam("fields");
        fields.Rating__c = component.get("v.rating");
        fields.Boat__c = component.get("v.boat").Id;
// console.log("fields: " + JSON.stringify(fields));

        component.find("editform").submit(fields); 


    },
})
