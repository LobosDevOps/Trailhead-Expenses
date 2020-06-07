({
    /**
     * Search Button action
     */
    search:  function(component) {

        let sendEvent =  component.getEvent("sendSelectBoatType");
        let boatType = component.find("boatType").get("v.value");
console.log("search : " + boatType);
        sendEvent.setParams({"selectBoatType": boatType });
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
