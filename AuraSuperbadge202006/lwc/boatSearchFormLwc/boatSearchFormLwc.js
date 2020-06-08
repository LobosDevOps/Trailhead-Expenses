import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BoatSearchFormLwc extends LightningElement {

    @api options;
    @api selected;

    showNewBtn = false;
    loading = false;

    newBoatHeader = "Create new Boat";

    /**
     * Combobox selected
     */
    handleChange(event) {
        this.selected = event.detail.value;
        this.selected != "All Types" ? this.showNewBtn = true : this.showNewBtn = false;
        window.console.log(this.selected);
    }

    /**
     * Fire Search Event 
     */
    handleSearch() {
        this.dispatchEvent(new CustomEvent('sendselectedtype', { detail: this.selected }));
    }

    /**
     * Show create boat dilog  
     */
    handleShowCreateBoat() {
        const modal = this.template.querySelector('c-modal');
        modal.show();
    }

    /**
     * Close
     */
    handleCancelModal() {
        //close spinner
        this.loading = false;

        // window.console.log("handleCancelModal " + "start");
        const modal = this.template.querySelector('c-modal');
        modal.hide();
        // window.console.log("handleCancelModal " + "end");

        //research
        this.handleSearch();
    }

    /**
     * Save
     */
    handleSaveModal(event) {
        window.console.log("handleSubmit " + "start");
        

        //form submit
        event.preventDefault();
        if (! this.validationCheck()) {
            // show spinner
            this.loading = true;
            this.template.querySelector('lightning-record-edit-form').submit();  

        } else {
            // this.template.querySelector('[data-id="newBoatMessage"]').setError(vaildationFailReason);
            // hidden spinner
            this.loading = false;
        }

        window.console.log("handleSubmit " + "end");
    }

    /**
     * validationCheck
     */
    validationCheck(){
        let validationError = false;
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(element => {
                element.reportValidity();
                // window.console.log("element fieldName : " + element.fieldName);
                // window.console.log("element required : " + element.required);
                // window.console.log("element value : " + element.value);
                if(element.required && !element.value) validationError = true;
            });
        }
        window.console.log("validationError : " + validationError);
        return validationError;
    }

    /**
     * record created success
     */
    handleSuccess(){
        window.console.log("handleSuccess2 " + "start");
        //show Toast success
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Success",
                message: "Record has been saved!",
                variant: 'success',
                mode : "dismissable"
            })
        );

        window.console.log("here2 ");
        //close
        this.handleCancelModal();
        window.console.log("handleSuccess " + "end");
    }

    /**
     * record created error
     */
    handleError(event){
        window.console.log("handleError " + "start");
        //show Toast success
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Error",
                message: JSON.stringify(event),
                variant: 'error',
                mode : "sticky"
            })
        );
        window.console.log("handleError " + "end");
    }
}