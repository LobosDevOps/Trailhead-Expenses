import { LightningElement, api } from 'lwc';

export default class BoatDetailLwc extends LightningElement {

    @api boat;
    
    get boatTitle(){
        return this.boat ? `${this.boat.Contact__r.Name}'s Boat` : "Please select a Boat.";
    }

    // div background image 
    get backgroundImage() { //getter を定義
        return `background-image:url(\'${this.boat.Picture__c}\'`;
    }

    // go to record detail page
    handlerFullDetails(){
        window.open(`/lightning/r/Boat__c/${this.boat.Id}/view`);
    }
}