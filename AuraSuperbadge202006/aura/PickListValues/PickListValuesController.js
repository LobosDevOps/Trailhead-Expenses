({
    doInit : function(component, event, helper) {

        let type = component.get("v.type");
        let method;
        if(type == "fromSchema"){
            method = "c.getPickListValuesBySchema";
        }else{
            method = "c.getPickListValuesByData";
        }

        let action = component.get(method);
        if(type == "fromSchema"){
            action.setParams({
                objectType: component.get("v.sObjectName"),
                selectedField: component.get("v.fieldName"),
                addOption: component.get("v.addOption")
                });
        }else{
            action.setParams({
                objectType: component.get("v.sObjectName"),
                selectedField: component.get("v.fieldName"),
                addOption: component.get("v.addOption"),
                condition: component.get("v.condition"),
                orderBy: component.get("v.orderBy")
                });            
        }
        action.setCallback(this, function(response) {
           var list = response.getReturnValue();
           component.set("v.picklistValues", list);
        })
        $A.enqueueAction(action);
    }
})
