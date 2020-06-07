import { LightningElement ,wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

import getBoattypes from '@salesforce/apex/BoatSearchResults.getBoattypes';
import searchBoatResults from '@salesforce/apex/BoatSearchResults.searchBoatResults';

export default class BoatSearchLwc extends LightningElement {
    //app event common
    @wire(CurrentPageReference) pageRef;

    //boattype combobox's option
    options;

    // boattype combobox's selected
    selected;

    //apex error
    error;

    //boats selected result 
    matchedboats;

    /**
     * Get the boattype combobox's option and selected from apex
     */
    @wire(getBoattypes)
    wiredBoattypes({ error, data }) {
        // window.console.log("data : " + JSON.stringify(data) );
        // window.console.log("data : " + JSON.stringify(error) );
        if (data) {
            this.options = data.options;
            this.selected = data.selected;
            this.error = undefined;
        } else if (error) {
            this.options = undefined;
            this.selected = undefined;
            this.error = error;
        }
    }

    /**
     * Get selected boattype from component event
     */
    setBoatResults(event){
        // window.console.log("setBoatResults . " );
        const selectedtype = event.detail;
        this.getMatchedBoats(selectedtype);
        // window.console.log("selectedtype : " + selectedtype );

        // send the boat selected app event
        fireEvent(this.pageRef, 'boatSelected', null);
    }

    /**
     * Get MatchedBoats from apex
     */
    getMatchedBoats(selectedtype){
        //call apex
        searchBoatResults({boatType: selectedtype})
            .then((result) => {
                // window.console.log("result : " + result );
                this.matchedboats = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.matchedboats = undefined;
            });
    }
}