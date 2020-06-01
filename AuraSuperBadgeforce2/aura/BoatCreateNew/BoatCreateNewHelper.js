({
    /**
     * 入力エラーをチェックします。
     * 各コンポーネントにvalidationCheckMethodを定義しておく必要があります。
     * @param {*} component コンポーネント
     * @param {*} subComponentNames 子コンポーネント名配列
     * @return 全て正常ならtrue
     */
    handleFormSubmit: function(component, helper) {
// console.log("here 1");
        var vaildationFailReason = helper.onValidationCheck(component, helper);
        if (!vaildationFailReason) {
            component.set('v.loading', true);
            component.find("editform").submit();  

            // send search event
            let appEvent = $A.get("e.c:BoatCreateedToSearchEvt");
            // console.log("handleSuccess here 1_1 ");
            appEvent.setParams({"createResult": "OK" });
            // console.log("handleSuccess here 2 ");
            appEvent.fire();
            console.log("handleSuccess here 3 ");

        } else {
            component.find('newBoatMessage').setError(vaildationFailReason);
            component.set('v.loading', false); 
        }
    },

    onValidationCheck: function(component, helper) {
        console.log("here 2");
        var vaildationFailReason = '';
        var fields = component.find("newBoatField");

        fields.forEach(function (field) {
            if(field.get("v.fieldName") === 'Name'){
                if( $A.util.isEmpty(field.get("v.value"))){
                    $A.util.addClass(field, 'slds-has-error');
                    vaildationFailReason = "The field 'Name' cannot be empty!";
                }else{
                    $A.util.removeClass(field, 'slds-has-error');
                }
            } 
        });
        return vaildationFailReason;
    }
})
