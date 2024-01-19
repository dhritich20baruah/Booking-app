import {format} from "date-fns";

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
  ]
  
export const busData: Bus[] = [
    {
      name: "Network Travels",
      details: "Non A/C Seater Pushback 2+1",
      total_seats: 35,
      stoppages: [
        "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh", "Tinsukia"
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
        "Guwahati", "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh"
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
        "Nagaon", "Bokakhat", "Jorhat", "Sivsagar", "Moran", "Dibrugarh", "Tinsukia"
      ],
      fare: 1.66,
      start_time: "07:30",
      speed: 42,
      service: "day",
    },
  ];
  

export default function searchBus(origin: string, destination: string): Bus[]{
    return busData.filter((bus)=>{
      const originIndex = bus.stoppages.indexOf(origin);
      const destinationIndex = bus.stoppages.indexOf(destination);

      return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex
    })
   }


  
export function calculateTotalFare(origin: string, destination: string): number {
    const bus = busData.find((bus) => bus.stoppages.includes(origin) && bus.stoppages.includes(destination));
  
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
      totalDistance += stops.find(stop => stop.name === bus.stoppages[i])?.distance_from_last || 0;
    }
  
    return totalDistance;
  }
  
// export function getTravelTime(origin: string, destination: string, doj: string): { startDate: string, startTime: string, endDate: string, endTime: string } | null {
//   const bus = busData.find((bus) => {
//     const originIndex = bus.stoppages.indexOf(origin);
//     const destinationIndex = bus.stoppages.indexOf(destination);

//     return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex;
//   });

//   if (!bus) {
//     return null; // No matching bus found
//   }

//     const originIndex = bus.stoppages.indexOf(origin);
//     const destinationIndex = bus.stoppages.indexOf(destination);
  
//     if (originIndex === -1 || destinationIndex === -1 || originIndex >= destinationIndex) {
//       return null; // Invalid origin or destination
//     }
  
//     // Calculate total distance and time
//     let totalDistance = 0;
//     let totalTime = 0;
  
//     for (let i = originIndex; i < destinationIndex; i++) {
//       const stop = stops.find((s) => s.name === bus.stoppages[i]);
  
//       if (!stop) {
//         return null; // Stop not found
//       }
  
//       totalDistance += stop.distance_from_last;
//       totalTime += (stop.distance_from_last / bus.speed!) * 60; // Convert distance to time in minutes
//     }
  
//     const startTime = new Date(`${doj}`+'T'+`${bus.start_time}`);
//     const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
//     if (isNaN(endTime.getTime())) {
//       return null; // Invalid time
//     }

//     return {
//       startDate: format(startTime, 'yyyy-MM-dd'), // Format the date
//       startTime: format(startTime, 'HH:mm'), // Format the time
//       endDate: format(endTime, 'yyyy-MM-dd'), // Format the date
//       endTime: format(endTime, 'HH:mm'), // Format the time
//     };
//   }

interface TravelTime {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface BusWithTravelTime extends Bus {
  travelTime: TravelTime;
}

export function getTravelTime(origin: string, destination: string, doj: string): { buses: BusWithTravelTime[] } {
    const result: BusWithTravelTime[] = [];
  
    for (const bus of busData) {
      const originIndex = bus.stoppages.indexOf(origin);
      const destinationIndex = bus.stoppages.indexOf(destination);
  
      if (originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex) {
        // Calculate total distance and time
        let totalDistance = 0;
        let totalTime = 0;
  
        for (let i = originIndex; i < destinationIndex; i++) {
          const stop = stops.find((s) => s.name === bus.stoppages[i]);
  
          if (!stop) {
            return { buses: [] }; // Stop not found
          }
  
          totalDistance += stop.distance_from_last;
          totalTime += (stop.distance_from_last / bus.speed!) * 60; // Convert distance to time in minutes
        }
  
        const startTime = new Date(`${doj}T${bus.start_time}`);
        const endTime = new Date(startTime.getTime() + totalTime * 60 * 1000); // Convert time back to milliseconds
        if (isNaN(endTime.getTime())) {
          return { buses: [] }; // Invalid time
        }
  
        const travelTime: TravelTime = {
          startDate: format(startTime, 'yyyy-MM-dd'), // Format the date
          startTime: format(startTime, 'HH:mm'), // Format the time
          endDate: format(endTime, 'yyyy-MM-dd'), // Format the date
          endTime: format(endTime, 'HH:mm'), // Format the time
        };
  
        result.push({
          ...bus,
          travelTime,
        });
      }
    }
  
    return { buses: result };
  }