({
    /**
     * Fire the boat selected.
     */
    onBoatClick : function(component, event, helper) {
        let boat = component.get("v.boat");
console.log("onBoatClick compnent fire! " + boat.Id );
        //send compnent event
        let sendEvent =  component.getEvent("sendSelectBoatId");
        sendEvent.setParams({"selectedBoatId": boat.Id });
        sendEvent.fire();

        //send application event
console.log("onBoatClick application fire! " + JSON.stringify(boat) );
        let appEvent = $A.get("e.c:BoatSelectedAppEvt");
        appEvent.setParams({
            "selectedBoat": boat
        });
        appEvent.fire();
console.log("onBoatClick application fireed! ");
    }
})
