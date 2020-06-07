import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class BoatMapLwc extends LightningElement {
    mapMarkers;
    showFlag;
    zoomLevel = 11;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('boatSelected', this.handleBoatSelected, this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleBoatSelected(boat) {
        window.console.log("BoatMapLwc handleBoatSelected");

        if(! boat) {
            this.showFlag = false;
            return;
        }
        this.showFlag = true;

        const Latitude = boat.Geolocation__Latitude__s;
        const Longitude = boat.Geolocation__Longitude__s;
        const boatName = boat.Name;
// window.console.log("Latitude : " + Latitude); 
// window.console.log("Longitude : " + Longitude); 
// window.console.log("boatName : " + boatName); 
        this.mapMarkers = [
            {
                location: {
                    Latitude, Longitude
                },
                title: boatName,
                description: `Coords: ${Latitude}, ${Longitude}`,
                icon: 'utility:animal_and_nature'
            }
        ];



    }
}