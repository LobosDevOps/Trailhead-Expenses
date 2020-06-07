({
    handleBoatSelectedAppEvt : function(component, event, helper) {
        let boat = event.getParam("selectedBoat");
console.log("handleBoatSelectedAppEvt : " + JSON.stringify(boat));

        component.set("v.boat", boat);
    },
    handleSetSelectedTab : function(component, event, helper) {
console.log("handleSetSelectedTab start. ");
        component.find("details").set("v.selectedTabId", 'boatreviewtab');
        // refresh boatreviews
        component.find("boatReviews").refresh();
 
    },
})
