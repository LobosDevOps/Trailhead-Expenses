import { LightningElement,api,wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class BoatSearchResultsLwc extends LightningElement {
    @api matchedboats;

    //app event common
    @wire(CurrentPageReference) pageRef;
    
    //selected boatId
    selectedBoatId;

    /**
     * receive the boat event
     */
    handleBoatselected(event) {
        //set the selected boat
        const boat = event.detail;
        this.selectedBoatId = boat.Id;

        // send the boat selected app event
        fireEvent(this.pageRef, 'boatSelected', boat);
    }
}