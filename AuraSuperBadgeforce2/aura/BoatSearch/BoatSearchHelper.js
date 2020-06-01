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
})
