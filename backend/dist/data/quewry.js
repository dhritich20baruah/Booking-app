"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.busData = exports.stops = void 0;
exports.stops = [
// ... (same as your provided array)
];
exports.busData = [
// ... (same as your provided array)
];
function getTravelTime(origin, destination) {
    const selectedBus = exports.busData.find((bus) => {
        const originIndex = bus.stoppages.indexOf(origin);
        const destinationIndex = bus.stoppages.indexOf(destination);
        return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex;
    });
    if (!selectedBus) {
        return null; // No matching bus found
    }
    const originIndex = selectedBus.stoppages.indexOf(origin);
    const destinationIndex = selectedBus.stoppages.indexOf(destination);
    // Calculate total distance and time
    let totalDistance = 0;
    let totalTime = 0;
    for (let i = originIndex; i < destinationIndex; i++) {
        const stop = exports.stops.find((s) => s.name === selectedBus.stoppages[i]);
        if (!stop) {
            return null; // Stop not found
        }
        totalDistance += stop.distance_from_last;
        totalTime += (stop.distance_from_last / selectedBus.speed) * 60; // Convert distance to time in minutes
    }
    const startTime = new Date(selectedBus.start_time);
    const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
    return {
        startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
}
function getTravelTime2(origin, destination) {
    const selectedBus = exports.busData.find((bus) => {
        const originIndex = bus.stoppages.indexOf(origin);
        const destinationIndex = bus.stoppages.indexOf(destination);
        return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex;
    });
    if (!selectedBus) {
        return null; // No matching bus found
    }
    const originIndex = selectedBus.stoppages.indexOf(origin);
    const destinationIndex = selectedBus.stoppages.indexOf(destination);
    // Calculate total distance and time
    let totalDistance = 0;
    let totalTime = 0;
    for (let i = originIndex; i < destinationIndex; i++) {
        const stop = exports.stops.find((s) => s.name === selectedBus.stoppages[i]);
        if (!stop) {
            return null; // Stop not found
        }
        totalDistance += stop.distance_from_last;
        totalTime += (stop.distance_from_last / selectedBus.speed) * 60; // Convert distance to time in minutes
    }
    const startTime = new Date(selectedBus.start_time);
    const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
    if (isNaN(endTime.getTime())) {
        return null; // Invalid time
    }
    return {
        startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
}
// Example usage:
const origin = "Guwahati"; // Replace with the actual origin
const destination = "Dibrugarh"; // Replace with the actual destination
const travelTime = getTravelTime(origin, destination);
if (travelTime) {
    console.log(`Start Time: ${travelTime.startTime}`);
    console.log(`End Time: ${travelTime.endTime}`);
}
else {
    console.log("No matching bus found");
}
