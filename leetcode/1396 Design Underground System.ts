interface UserStationCheckins {
  [userId: number]: {
      stationName: string;
      t: number;
  };
}

interface StationRides {
  [startStation: string]: {
      [endStation: string]: {
          numRides: number,
          average: number
      }
  }
}

class UndergroundSystem {
  userStationCheckins: UserStationCheckins = {};
  stationRides: StationRides = {};

  constructor() {
  }

  checkIn(id: number, stationName: string, t: number): void {
      this.userStationCheckins[id] = { stationName, t };
  }

  checkOut(id: number, stationName: string, t: number): void {
      const userStationCheckin = this.userStationCheckins[id];
      const startStation = userStationCheckin.stationName;
      const endStation = stationName;
      const rideTime = t - userStationCheckin.t;

      this.initRideStats(startStation, endStation);
      const rideStats = this.stationRides[startStation][endStation];
      rideStats.average =
          (rideStats.average * rideStats.numRides + rideTime)
              / (rideStats.numRides + 1)
      rideStats.numRides++;

      // Empty userStationCheckin
      delete this.userStationCheckins[id];
  }

  getAverageTime(startStation: string, endStation: string): number {
      if (this.stationRides[startStation] &&
          this.stationRides[startStation][endStation]) {
          return this.stationRides[startStation][endStation].average;        
      }
      return 0;
  }

  private initRideStats(startStation: string, endStation: string): any {
      if (!this.stationRides[startStation]) {
          this.stationRides[startStation] = {};
      }

      if (!this.stationRides[startStation][endStation]) {
          this.stationRides[startStation][endStation] = {
              numRides: 0, average: 0
          };
      }
  }
}

/**
* Your UndergroundSystem object will be instantiated and called as such:
* var obj = new UndergroundSystem()
* obj.checkIn(id,stationName,t)
* obj.checkOut(id,stationName,t)
* var param_3 = obj.getAverageTime(startStation,endStation)
*/