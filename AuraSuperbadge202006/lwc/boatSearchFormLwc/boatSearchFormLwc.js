import { LightningElement, api } from 'lwc';

export default class BoatSearchFormLwc extends LightningElement {

    @api options;
    @api selected;
    showNewBtn = false;

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
}