import { LightningElement, api } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatReviews.getAll';

export default class BoatReviewsLwc extends LightningElement {
    @api 
    get boat(){
        return this._boat;
    }
    set boat(value){
        this._boat= value;
        // Call apex get reviews
        this.refresh();
    }

    boatReviews;
    _boat;

    get boatTitle(){
        return this._boat ? `${this._boat.Contact__r.Name}'s Boat` : "Please select a Boat.";
    }

    get showReviews(){
        return this._boat && this.boatReviews && this.boatReviews.length > 0;
    }
    
    connectedCallback() {
        // window.console.log("connectedCallback. " + this._boat);
       this.refresh();
    }

    @api
    refresh() {
        if(!this._boat) return;
window.console.log("BoatReviewsLwc22 refresh. " + this._boat.Id);
        //call apex
        getAllReviews({boatId: this._boat.Id})
        .then((result) => {
// window.console.log("resultqqq : " + result );
            this.boatReviews = result;
            this.error = undefined;
        })
        .catch((error) => {
            this.error = error;
            this.boatReviews = undefined;
        });
    }

    onUserInfoClick(event){
        // var userId = event.currentTarget.getAttribute("data-userid");
        // var navEvt = $A.get("e.force:navigateToSObject");
        // navEvt.setParams({
        //     "recordId" : userId,
        // });
        // navEvt.fire();

        // Open new tab
        var userId = event.target.value;//event.currentTarget.getAttribute("data-userid");
        window.open(`/lightning/r/User/${userId}/view`);
    }

}