({
    //Common Process call Apex
    callAction : function(component, method ,params, callback) {
        //server-side action
        let action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        //Set any optional callback and enqueue the action
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },

    //Show Toast
    showToast : function(title, message ,type, mode) {
        $A.get('e.force:showToast').setParams({
            "title": title,
            "message": message,
            "type": type,
            "mode" : mode
        }).fire();
    },

    /**
     * ValidationCheck
     * @param {*} component 
     * @param {*} formName 
     * @param {*} fieldName 
     */
    onValidationCheck: function(component, formName, fieldName) {//, notSetRedBorderFlag
        var vaildationFailReason = '';
        var fields = component.find(formName);
        fields.forEach(function (field) {
            if(field.get("v.fieldName") === fieldName){
                if( $A.util.isEmpty(field.get("v.value"))){
                    $A.util.addClass(field, 'slds-has-error');
                    vaildationFailReason = `The field [${fieldName}] cannot be empty!`;
                }else{
                    $A.util.removeClass(field, 'slds-has-error');
                }
            } 
        });
        return vaildationFailReason;
    },
    
    /**
     * ValidationCheck
     * @param {*} component 
     * @param {*} formName 
     */
    clearAllFiledValue: function(component, formName) {
        var fields = component.find(formName);

        fields.forEach(function (field) {
            field.set("v.value", null);
        });
    }
})
