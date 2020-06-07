import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddBoatReviewLwc extends LightningElement {

    objectApiName = "BoatReview__c";
    @api boat;
    rating;

    get boatTitle(){
        return this.boat ? `${this.boat.Contact__r.Name}'s Boat` : "Please select a Boat.";
    }

    handleSuccess(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Success",
                message: "Record has been saved!",
                variant: 'success',
                mode : "dismissable"
            })
        );

        //clear form value
        this.clearAllFiledValue();
        // this.rating = 0;

        // send review added event
        this.dispatchEvent(new CustomEvent('commentadded'));
    }

    handleError(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Error",
                message: JSON.stringify(event),
                variant: 'error',
                mode : "sticky"
            })
        );
    }

    handleSubmit(event){
        event.preventDefault();

        // set Rating__c, Boat__c value
        var fields = event.detail.fields;

        // 必須 check
        // if(!this.handleValidationComment(fields.Comment__c)) return;
        if(!fields.Comment__c) {
            this.template.querySelector('[data-id="commentMessage"]').setError("Comment can not be null.");
            return;
        }

        // fields.Rating__c = this.rating;
        fields.Boat__c = this.boat.Id;
window.console.log("fields: " + JSON.stringify(fields));

        this.template.querySelector('lightning-record-edit-form').submit(fields); 
    }

    /**
     * clear value
     */
    clearAllFiledValue() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
//     /**
//      * Comment 必須 check
//      */
//     handleValidationComment(commentValue) {
// window.console.log("commentValue: " + commentValue);
//         let checkResult = true;

//         let inputCmp = this.template.querySelector(".comment");
//         window.console.log("inputCmp: " + inputCmp);       
//         if(!commentValue){
//             // inputCmp.setCustomValidity("この項目を入力してください。");
//             inputCmp.reportValidity(); // Tells lightning-input to show the error right away without needing interaction
//             checkResult = false;
//         }else{
//             // inputCmp.setCustomValidity("");
//             inputCmp.reportValidity(); // Tells lightning-input to show the error right away without needing interaction
//         }
//         return checkResult;
//     }
}