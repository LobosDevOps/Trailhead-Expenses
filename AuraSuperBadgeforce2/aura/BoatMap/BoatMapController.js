({
    handleBoatSelectedAppEvt : function(component, event, helper) {
        let boat = event.getParam("selectedBoat");
console.log("handleBoatSelectedAppEvt : " + JSON.stringify(boat));
        if(! boat) {
            //clear
            component.set('v.mapMarkers', null);
            return;
        }
        const Latitude = boat.Geolocation__Latitude__s;
        const Longitude = boat.Geolocation__Longitude__s;
        const boatName = boat.Name;
console.log("Latitude : " + Latitude); 
console.log("Longitude : " + Longitude); 
console.log("boatName : " + boatName); 
        component.set('v.mapMarkers', [
            {
                location: {
                    Latitude, Longitude
                },
                title: boatName,
                description: `Coords: ${Latitude}, ${Longitude}`,
                icon: 'utility:animal_and_nature'
            }
        ]);
    }
})
