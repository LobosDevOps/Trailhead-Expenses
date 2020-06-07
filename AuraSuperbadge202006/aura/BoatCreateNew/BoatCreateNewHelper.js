({
    /**
     * 入力エラーをチェックします。
     * 各コンポーネントにvalidationCheckMethodを定義しておく必要があります。
     * @param {*} component コンポーネント
     * @param {*} subComponentNames 子コンポーネント名配列
     * @return 全て正常ならtrue
     */
    handleFormSubmit: function(component, helper) {
        var vaildationFailReason = helper.onValidationCheck(component, "newBoatField", "Name");
        if (!vaildationFailReason) {
            component.set('v.loading', true);
            component.find("editform").submit();  
        } else {
            component.find('newBoatMessage').setError(vaildationFailReason);
            component.set('v.loading', false); 
        }
    },
})
