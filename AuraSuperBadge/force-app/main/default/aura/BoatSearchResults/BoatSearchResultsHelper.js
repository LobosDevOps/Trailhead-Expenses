({
    onSearch : function(component) {
         var currentBoatType = component.get("v.boatTypeId1")
        var action = component.get("c.getBoats");
        if(currentBoatType == 'All Types'){
            currentBoatType = '';
        }
         var action = component.get("c.getBoats");
        action.setParams({
              "boatTypeId":currentBoatType
        });

        action.setCallback(this, function(response) {   
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.boats", response.getReturnValue());
            } else {
                console.log("Failed with state1: " + state);
            }
        });
        $A.enqueueAction(action);
    },
})