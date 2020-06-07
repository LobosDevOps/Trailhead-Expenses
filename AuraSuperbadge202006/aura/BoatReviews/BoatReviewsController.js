({
    doInit : function(component, event, helper) {

        var boat=component.get("v.boat");
console.log("doInit " + boat);
        if(! boat) {
            component.set("v.boatReviews", null );
            return;
        }

        const method = "c.getAll";
        const params = {"boatId":boat.Id};
        let callback = function(response) {
            var res = response.getReturnValue();
console.log("options : " + JSON.stringify(res) );
            component.set("v.boatReviews", res );
        };
        helper.callAction(component, method ,params, callback) ;
    },

    onUserInfoClick : function(component,event,helper){
        // var userId = event.currentTarget.getAttribute("data-userid");
        // var navEvt = $A.get("e.force:navigateToSObject");
        // navEvt.setParams({
        //     "recordId" : userId,
        // });
        // navEvt.fire();

        // Open new tab
        var userId = event.currentTarget.getAttribute("data-userid");
        window.open(`/lightning/r/User/${userId}/view`);
    },
})
