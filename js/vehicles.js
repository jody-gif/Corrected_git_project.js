

const R = 6371  // Earth's Radius (km)
const pi = p = 0.017453292519943295  // radial pi (pi/180)

var availableVehicles = [];

// initial vehicles
var vehicles =
    [
        { id: "mXfkirFw", position: { lat: 51.5090562,          lng: -0.1304571 }           , lastBusy:new Date() },
        { id: "TKwu74WC", position: { lat: 51.5425649,          lng: -0.00693080308689057 } , lastBusy:new Date() },
        { id: "5KWpnAJN", position: { lat: 51.519821199999996,  lng: -0.09397523701275332 } , lastBusy:new Date() },
        { id: "uf5ZrXYw", position: { lat: 51.5133798,          lng: -0.0889552 }           , lastBusy:new Date() },
        { id: "VMerzMH8", position: { lat: 51.5253378,          lng: -0.033435 }            , lastBusy:new Date() },
        { id: "8efT67Xd", position: { lat: 51.54458615,         lng: -0.0161905117168855 }  , lastBusy:new Date() },
    ];

// gets all the vehciles that are not currently busy
function getAvailableVehicles() {
    availableVehicles = [];
    currentTime = new Date();

    for (var i = 0; i < vehicles.length; i++) {
        if (vehicle[i].lastBusy < currentTime) {
            availableVehicles.push(vehicle[i]);
        }
    }
}

// get closest vehicle to client's start position
function getClosestVehicleIndex(startPoint) {
    let closestVehicle = availableVehicles[0];
    let shortestDistance = calculateDistance(startPoint, closestVehicle.position);

    // if the next avaialble vehicle is closer than the current closest vehicle, make that the new closest vehicle
    for (var i = 1; i < availableVehicles.length; i++) {
        let distTocurrentVehicle = calculateDistance(startPoint, availableVehicles[i].position);
        if (distTocurrentVehicle < shortestDistance) {
            shortestDistance = distTocurrentVehicle;
            closestVehicle = availableVehicles[i];
        }
    }

    // find the index of the vehicle in the vehicles list
    for (var j = 0; j < vehicles.length; j++) {
        if (vehicle[j] == closestVehicle) {
            return j;
        }
    }
}

// Haversine Formula for working out distance between two points on the globe (approximately)
function calculateDistance(p1, p2) {
    let x = 0.5 - (0.5 * Math.cos((p2.lat - p1.lat) * pi)) + ((Math.cos(p1.lat * pi) * Math.cos(p2.lat * pi)) * (1 - Math.cos((p2.lng - p1.lng) * pi)) * 0.5);

    let distance = 2 * R * Math.asin(Math.sqrt(x));

    return distance;
}


// selects a vehicle for the client to use
function getVehicleForClient(startPoint, destination) {
    getAvailableVehicles();

    if (availableVehicles.length == 0) {
        /// figure out how to tell client that there are no available vehicles
    } else {
        // get the vehicle closest to the client start point
        let vehicleIndex = getClosestVehicleIndex(startPoint);

        // get travel distance for that vehicle in km (from its current location to client start location to client destination)
        let travelDistance = getTotalDistance(vehicles[vehicleIndex], startPoint, destination);

        // get approximate travel time in hours (assuming 50 kmph)
        let travelTime = travelDistance / 50;

        updateSelectedVehicle(vehicleIndex, travelTime, destination);
    }

}

// get travel distance from vehicle's current location to the client's start point to the client's destination
function getTotalDistance(vehicle, startPoint, destination) {
    let distance = calculateDistance(vehicle.position, startPoint) + calculateDistance(startPoint, destination);

    return distance;
}

// update the location and lastBusy attributes of the vehicle chosen for the client to take
function updateSelectedVehicle(vehicleIndex, travelTime, destination) {
    // sets vehicle location to new destination
    vehicles[vehicleIndex].position = destination;

    // set vehicle to be busy from now and for the duration of its travel time
    vehicles[vehicleIndex].lastBusy.setHours(new Date() + travelTime);
}
