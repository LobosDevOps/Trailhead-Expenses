({
    afterScriptsLoaded : function(component, event, helper) {
        // debugger
        var domEl = component.find("ratingarea").getElement();

        var currentRating = component.get('v.rateValue');
        var readOnly = component.get('v.readonly');
        var maxRating = 5;
        var callback = function(rating) {
            component.set('v.rateValue',rating);
        }
        component.ratingObj = rating(domEl,currentRating,maxRating,callback,readOnly); 
    },

    onValueChange: function(component,event,helper) {
        if (component.ratingObj) {
            console.log("onValueChange" );
            var value = component.get('v.rateValue');
            component.ratingObj.setRating(value,false);
        }
    },

    clearRating: function(component,event,helper) {
        if (component.ratingObj) {
            console.log("clearRating111" );
            // rating js 分からない
            // component.ratingObj.clearRating();
        }
    }
})
