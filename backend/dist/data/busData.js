"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchBus = exports.calculateTotalFare = exports.busData = exports.stops = void 0;
const date_fns_1 = require("date-fns");
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
        name: "Sivsagar",
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
        busName: "Network Travels",
        details: "Non A/C Seater Pushback 2+1",
        total_seats: 36,
        stoppages: [
            "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh", "Tinsukia"
        ],
        fare: 1.44,
        start_time: "20:00",
        speed: 41,
        service: "night",
    },
    {
        busName: "Chartered ASTC",
        details: "Volvo A/C Pushback 2+2",
        total_seats: 48,
        stoppages: [
            "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh"
        ],
        fare: 2.16,
        start_time: "08:30",
        speed: 50,
        service: "day",
    },
    {
        busName: "Rayan",
        details: "Bharat Benz A/C 2+1 Seater",
        total_seats: 36,
        stoppages: [
            "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh", "Tinsukia"
        ],
        fare: 1.66,
        start_time: "07:30",
        speed: 42,
        service: "day",
    },
];
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
function searchBus(origin, destination, doj) {
    const result = [];
    for (const bus of exports.busData) {
        const originIndex = bus.stoppages.indexOf(origin);
        const destinationIndex = bus.stoppages.indexOf(destination);
        if (originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex) {
            // Calculate total distance and time
            let totalDistance = 0;
            let totalTime = 0;
            let totalStartDistance = 0;
            let totalStartTime = 0;
            for (let i = 0; i <= destinationIndex; i++) {
                const stop = exports.stops.find((s) => s.name === bus.stoppages[i]);
                if (!stop) {
                    return { buses: [] }; // Stop not found
                }
                totalDistance += stop.distance_from_last;
                totalTime += (stop.distance_from_last / bus.speed) * 60; // Convert distance to time in minutes
            }
            for (let i = 0; i <= originIndex; i++) {
                const stop = exports.stops.find((s) => s.name === bus.stoppages[i]);
                if (!stop) {
                    return { buses: [] }; // Stop not found
                }
                totalStartDistance += stop.distance_from_last;
                totalStartTime += (stop.distance_from_last / bus.speed) * 60; // Convert distance to time in minutes
            }
            const startTime = new Date(`${doj}T${bus.start_time}`);
            const actualStartTime = new Date(startTime.getTime() + totalStartTime * 60 * 1000);
            const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
            if (isNaN(endTime.getTime())) {
                return { buses: [] }; // Invalid time
            }
            const travelTime = {
                startDate: (0, date_fns_1.format)(startTime, 'yyyy-MM-dd'),
                startTime: (0, date_fns_1.format)(actualStartTime, 'HH:mm'),
                endDate: (0, date_fns_1.format)(endTime, 'yyyy-MM-dd'),
                endTime: (0, date_fns_1.format)(endTime, 'HH:mm'), // Format the time
            };
            result.push(Object.assign(Object.assign({}, bus), { travelTime }));
        }
    }
    return { buses: result };
}
exports.searchBus = searchBus;
