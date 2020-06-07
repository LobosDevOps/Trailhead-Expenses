import { LightningElement , api, wire } from 'lwc';

export default class BoatTileLwc extends LightningElement {
    //boat 
    @api boat;

    //is selected
    @api selected;

    //select css
    get tileCss() { //getter を定義
        return this.selected===this.boat.Id ? "tile selected" : "tile";
    }

    // div background image 
    get backgroundImage() { //getter を定義
        return `background-image:url(\'${this.boat.Picture__c}\'`;
    }

    /**
     * send componet event
     */
    boatClick() {
        this.dispatchEvent(new CustomEvent('boatselected', {detail: this.boat}));
    }
}