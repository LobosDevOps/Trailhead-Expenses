({
    /**
     * Search Button action
     */
    search:  function(component) {
console.log("search.");
        let sendEvent =  component.getEvent("sendSelectBoatType");
        sendEvent.setParams({"selectBoatType": component.get("v.selected") });
        sendEvent.fire();

        //send application event
        let appEvent = $A.get("e.c:BoatSelectedAppEvt");
        appEvent.setParams({
            "selectedBoat": null
        });
        appEvent.fire();
    },

    /**
     * Create new Boat action for Mobile
     */
    createFormNewMobile: function (component) {
        var device = $A.get("$Browser.formFactor");
        
console.log("createFormNewMobile.");
        var createRecordEvent = $A.get('e.force:createRecord');
        if (createRecordEvent) {
            var boatTypeId = component.get("v.selected");
            createRecordEvent.setParams({
                'entityApiName': 'Boat__c',
                'defaultFieldValues': {
                    'BoatType__c': boatTypeId
                }
            });
            createRecordEvent.fire();
        }
    },
    /**
     * Create new Boat action for Pc
     */
    createFormNewPc: function (component) {
console.log("createFormNewPc.");
        $A.createComponent("c:BoatCreateNew", 
                           {boatType : component.get("v.selected")},
                           function(result, status) {
                               if (status === "SUCCESS") {
console.log('OK');    
                                   component.find('overlayLib').showCustomModal({
                                       header: "Create new Boat",
                                       body: result, 
                                       showCloseButton: true,
                                   })
                               }else{
console.log('error');                                  
                               }                          
                           });
    },
})
