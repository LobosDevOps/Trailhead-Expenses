({
    /**
     * 入力エラーをチェックします。
     * 各コンポーネントにvalidationCheckMethodを定義しておく必要があります。
     * @param {*} component コンポーネント
     * @param {*} subComponentNames 子コンポーネント名配列
     * @return 全て正常ならtrue
     */
    handleFormSubmit: function(component, helper) {
 console.log("here 1");
        // var vaildationFailReason = helper.onValidationCheck(component, helper);
        // if (!vaildationFailReason) {
        //     component.set('v.loading', true);

            //test


            let selectBoatType = "All Types";
// console.log("handleSearch selectBoatType : " + selectBoatType);
        const method = "c.searchBoatResults";
        const params = {boatType : selectBoatType};
        let callback = function(response) {
            component.set('v.description', "aabb5");

            component.find("editform").submit();  
            $A.get("e.force:closeQuickAction").fire();
        };
        helper.callAction(component, method ,params, callback);



        // } else {
        //     component.find('newBoatMessage').setError(vaildationFailReason);
        //     component.set('v.loading', false); 
        // }
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
    },
})
