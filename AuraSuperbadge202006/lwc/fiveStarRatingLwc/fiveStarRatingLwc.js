import { LightningElement, api } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fivestar from '@salesforce/resourceUrl/fivestar';

export default class FiveStarRatingLwc extends LightningElement {
    @api readonly;
    @api rateValue;

    ratingObj;
    
    get fivestarCss(){
        return this.readonly ? 'readonly c-rating' : 'c-rating';
    }
    

    renderedCallback() {
        Promise.all([
            loadScript(this, fivestar + '/rating.js'),
            loadStyle(this, fivestar + '/rating.css')
        ])
            .then(() => {
                window.console.log("loadScript");
                this.initializeFivestar();
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading fivestar',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    initializeFivestar() {
        window.console.log("initializeFivestar");
        let domEl = this.template.querySelector('ratingarea');

        let currentRating = this.rateValue;
        let readOnly = this.readonly;
        let maxRating = 5;
        let callback = function(rating) {
            this.rateValue = rating;
        }
        window.console.log("here 2");
        this.ratingObj = this.rating(domEl,currentRating,maxRating,callback,readOnly); 
        window.console.log("here 3");
    }

}