({
    /**
     * Combobox selected
     */
    handleChange : function(component, event, helper) {
console.log("selected : " + component.find("boatType").get("v.value"));
        component.set("v.selected", component.find("boatType").get("v.value"));

        let isShowNewBtn = false;
        var isEnabled = $A.get("e.force:createRecord");
console.log("isEnabled : " + isEnabled);      
        if((component.get("v.selected") != "All Types") && isEnabled){
            isShowNewBtn = true;
        }else{
            isShowNewBtn = false;
        }
        component.set("v.showNewBtn", isShowNewBtn)
    },

    /**
     * Search Button action
     */
    handleSearch:  function(component, event, helper) {
        helper.search(component);
    },

    /**
     * Create new Boat action
     */
    onFormNew: function (component, event, helper) {
        var device = $A.get("$Browser.formFactor");
        let isMobile = false;
        if(device.isPhone || device.isAndroid){
            isMobile = true;
        }
        
        if(isMobile){
            helper.createFormNewMobile(component);
        }else{
            // helper.createFormNewMobile(component);
            helper.createFormNewPc(component);
        }
    },
})
