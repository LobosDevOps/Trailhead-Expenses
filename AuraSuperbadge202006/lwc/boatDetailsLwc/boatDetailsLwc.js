import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class BoatDetailsLwc extends LightningElement {

    boat;
    refreshBoatReviewsFlag = false;

    //selected tab
    selectedTabId;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('boatSelected', this.handleBoatSelected, this);

        const boatReviews = this.template.querySelector('c-modal');
        window.console.log("connectedCallback boatReviews : " + boatReviews);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleBoatSelected(boat) {
        window.console.log("BoatDetailsLwc handleBoatSelected");
        this.boat = boat;
    }

    setSelectedTab(event){
        window.console.log("BoatDetailsLwc setSelectedTab");
        this.selectedTabId = 'boatreviewtab';
        this.refreshBoatReviewsFlag = true;
    }

    /**
    * if not form setSelectedTab event , donothing
    */
    refreshBoatReviews(){
        if(! this.refreshBoatReviewsFlag) return;
        // reset flag
        this.refreshBoatReviewsFlag = false;
        this.selectedTabId = "";
        
        //wait for the tab is actived
        setTimeout(() => {
            //refresh reviews
            const boatReviews = this.template.querySelector('c-boat-reviews-lwc');
            window.console.log("boatReviews : " + boatReviews);
            boatReviews.refresh();
        }, 1000);

    }


    // handleShowModal() {
    //     const modal = this.template.querySelector('c-boat-reviews-lwc');
    //     window.console.log("modal : " + modal);
    //     // modal.show();
    // }
}