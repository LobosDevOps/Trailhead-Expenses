({
    handleLoad : function(component, event, helper) {
        console.log("handleLoad ");
        var fields = component.find("myForm");
        console.log("fields : " + JSON.stringify(fields) );

        console.log("fieldName : " + field.get("v.fieldName") );
        // fields.forEach(function (field) {
        //     if(field.get("v.fieldName") === fieldName){
        //         if( $A.util.isEmpty(field.get("v.value"))){
        //             $A.util.addClass(field, 'slds-has-error');
        //             vaildationFailReason = `The field [${fieldName}] cannot be empty!`;
        //         }else{
        //             $A.util.removeClass(field, 'slds-has-error');
        //         }
        //     } 
        // });

//         const method = "c.getBoattypes";
//         const params = "";
//         let callback = function(response) {
//             var res = response.getReturnValue();
// //  console.log("options : " + JSON.stringify(res.options) );
//             component.set("v.options", res.options );
//             component.set("v.selected", res.selected );
//          };
//         helper.callAction(component, method ,params, callback) ;
    },
    handleSubmit: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    }
})
