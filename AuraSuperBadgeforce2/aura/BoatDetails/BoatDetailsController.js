({
    handleBoatSelectedAppEvt : function(component, event, helper) {
        let boat = event.getParam("selectedBoat");
console.log("handleBoatSelectedAppEvt : " + JSON.stringify(boat));

        component.set("v.boat", boat);
    }
})
