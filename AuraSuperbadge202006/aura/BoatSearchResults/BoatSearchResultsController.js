({
    /**
     * Aura method: Set Boats Data
     */
    setBoats : function(component, event, helper) {
        let params = event.getParam('arguments');
        if (params) {
            let boats = params.boatResults;
            component.set("v.boats", boats );
            //clear
            component.set("v.selectedBoatId", null );
            return "setBoats OK!";
        }
        return "setBoats NG!";
    },

    /**
     * Event : set selected boat
     */
    handleSetSelectedBoat : function(component, event, helper) {
        let selectedBoatId = event.getParam("selectedBoatId");
        component.set("v.selectedBoatId", selectedBoatId );
    },
    
})
