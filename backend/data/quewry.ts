interface Stoppage {
  name: string;
  distance_from_last: number;
}

interface Bus {
  name: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
}

export const stops: Stoppage[] = [
  // ... (same as your provided array)
];

export const busData: Bus[] = [
  // ... (same as your provided array)
];

function getTravelTime(origin: string, destination: string): { startTime: string, endTime: string } | null {
  const selectedBus = busData.find((bus) => {
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
    const stop = stops.find((s) => s.name === selectedBus.stoppages[i]);

    if (!stop) {
      return null; // Stop not found
    }

    totalDistance += stop.distance_from_last;
    totalTime += (stop.distance_from_last / selectedBus.speed!) * 60; // Convert distance to time in minutes
  }

  const startTime = new Date(selectedBus.start_time);
  const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds

  return {
    startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

function getTravelTime2(origin: string, destination: string): { startTime: string, endTime: string } | null {
  const selectedBus = busData.find((bus) => {
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
    const stop = stops.find((s) => s.name === selectedBus.stoppages[i]);

    if (!stop) {
      return null; // Stop not found
    }

    totalDistance += stop.distance_from_last;
    totalTime += (stop.distance_from_last / selectedBus.speed!) * 60; // Convert distance to time in minutes
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
} else {
  console.log("No matching bus found");
}
