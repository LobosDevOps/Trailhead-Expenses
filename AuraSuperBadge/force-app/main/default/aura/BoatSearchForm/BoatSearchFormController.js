({
    doInit: function(component, event, helper) {
        var isEnabled = $A.get("e.force:createRecord");
        //check if isEnabled is truthy
        if (isEnabled) {
            //we have a truthy reference from the get() method, that means we're good to go
            component.set("v.showNewBtn", true);
        }
        var action = component.get("c.getboattypes");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.btypes", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },
    handleChange:function(component, event, helper) {
        var selectedBoatType = component.find("boatTypes").get("v.value");
        console.log("selectedBoatType :  "+ selectedBoatType);
        component.set("v.selectedType",selectedBoatType);
    },
    onFormNew: function (component) {
        console.log("onFormNew start");
        var createRecordEvent = $A.get('e.force:createRecord');
        if (createRecordEvent) {
            var boatTypeId = component.get("v.selectedType");
            console.log("boatTypeId: " + boatTypeId);
            createRecordEvent.setParams({
                'entityApiName': 'Boat__c',
                'defaultFieldValues': {
                    'BoatType__c': boatTypeId
                }
            });
            createRecordEvent.fire();
        }
        console.log("onFormNew end");
    },
    onFormSubmit:function(component, event, helper) {
        
        var boatTypeId = component.get("v.selectedType");
        console.log("selected type : " + boatTypeId);
        var formSubmit = component.getEvent("formsubmit");
        formSubmit.setParams({"formData":
                            {"boatTypeId" : boatTypeId}
        });
        formSubmit.fire();
    },
})