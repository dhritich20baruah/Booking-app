"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalFare = exports.busData = exports.stops = void 0;
exports.stops = [
    {
        name: "Guwahati",
        distance_from_last: 0,
    },
    {
        name: "Nagaon",
        distance_from_last: 120,
    },
    {
        name: "Bokakhat",
        distance_from_last: 120,
    },
    {
        name: "Jorhat",
        distance_from_last: 68,
    },
    {
        name: "Sivasagar",
        distance_from_last: 57,
    },
    {
        name: "Moran",
        distance_from_last: 42,
    },
    {
        name: "Dibrugarh",
        distance_from_last: 38,
    },
    {
        name: "Tinsukia",
        distance_from_last: 47,
    },
];
exports.busData = [
    {
        name: "Network Travels",
        details: "Non A/C Seater Pushback 2+1",
        total_seats: 35,
        stoppages: [
            "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivasager", "Moran", "Dibrugarh", "Tinsukia"
        ],
        fare: 1.44,
        start_time: "20:00",
        speed: 41,
        service: "night",
    },
    {
        name: "Chartered ASTC",
        details: "Volvo A/C Pushback 2+2",
        total_seats: 48,
        stoppages: [
            "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivasager", "Moran", "Dibrugarh"
        ],
        fare: 2.16,
        start_time: "08:30",
        speed: 50,
        service: "day",
    },
    {
        name: "Rayan",
        details: "Bharat Benz A/C 2+1 Seater",
        total_seats: 35,
        stoppages: [
            "Nagaon", "Bokakhat", "Jorhat", "Sivasager", "Moran", "Dibrugarh", "Tinsukia"
        ],
        fare: 1.66,
        start_time: "7:30",
        speed: 42,
        service: "day",
    },
];
function searchBus(origin, destination) {
    return exports.busData.filter((bus) => {
        const originIndex = bus.stoppages.indexOf(origin);
        const destinationIndex = bus.stoppages.indexOf(destination);
        return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex;
    });
}
exports.default = searchBus;
function calculateTotalFare(origin, destination) {
    var _a;
    const bus = exports.busData.find((bus) => bus.stoppages.includes(origin) && bus.stoppages.includes(destination));
    if (!bus) {
        return 0; // Bus not found for the given origin and destination
    }
    const originIndex = bus.stoppages.indexOf(origin);
    const destinationIndex = bus.stoppages.indexOf(destination);
    if (originIndex === -1 || destinationIndex === -1 || originIndex >= destinationIndex) {
        return 0; // Invalid origin or destination
    }
    // Sum up distances between origin and destination
    let totalDistance = 0;
    for (let i = originIndex; i < destinationIndex; i++) {
        totalDistance += ((_a = exports.stops.find(stop => stop.name === bus.stoppages[i])) === null || _a === void 0 ? void 0 : _a.distance_from_last) || 0;
    }
    return totalDistance;
}
exports.calculateTotalFare = calculateTotalFare;
