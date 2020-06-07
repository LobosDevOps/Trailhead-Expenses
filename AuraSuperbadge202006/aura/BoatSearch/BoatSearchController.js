({
    /**
     * BoatSearchForm get combobox options 
     */
    doInit : function(component, event, helper) {
        const method = "c.getBoattypes";
        const params = "";
        let callback = function(response) {
            var res = response.getReturnValue();
//  console.log("options : " + JSON.stringify(res.options) );
            component.set("v.options", res.options );
            component.set("v.selected", res.selected );
         };
        helper.callAction(component, method ,params, callback) ;
    },

    /**
     * Get selectBoatType from BoatSearchForm 
     * Search result by Apex
     * Send searchresult to BoatSearchResults by Aura method
     */
    handleSearch : function(component, event, helper) {

        let selectBoatType = event.getParam("selectBoatType");
console.log("handleSearch selectBoatType : " + selectBoatType);
        const method = "c.searchBoatResults";
        const params = {boatType : selectBoatType};
        let callback = function(response) {
            var boats = response.getReturnValue();
// console.log("boats : " + JSON.stringify(boats) );
            let BSRcmp = component.find("BSRcmp");
            var auraMethodResult = BSRcmp.setBoats(boats);
            // console.log("auraMethodResult: " + auraMethodResult);
        };
        helper.callAction(component, method ,params, callback);
    },

})
