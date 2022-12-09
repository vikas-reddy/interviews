var UndergroundSystem = /** @class */ (function () {
    function UndergroundSystem() {
        this.userStationCheckins = {};
        this.stationRides = {};
    }
    UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
        this.userStationCheckins[id] = { stationName: stationName, t: t };
    };
    UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
        var userStationCheckin = this.userStationCheckins[id];
        var startStation = userStationCheckin.stationName;
        var endStation = stationName;
        var rideTime = t - userStationCheckin.t;
        this.initRideStats(startStation, endStation);
        var rideStats = this.stationRides[startStation][endStation];
        rideStats.average =
            (rideStats.average * rideStats.numRides + rideTime)
                / (rideStats.numRides + 1);
        rideStats.numRides++;
        // Empty userStationCheckin
        delete this.userStationCheckins[id];
    };
    UndergroundSystem.prototype.getAverageTime = function (startStation, endStation) {
        if (this.stationRides[startStation] &&
            this.stationRides[startStation][endStation]) {
            return this.stationRides[startStation][endStation].average;
        }
        return 0;
    };
    UndergroundSystem.prototype.initRideStats = function (startStation, endStation) {
        if (!this.stationRides[startStation]) {
            this.stationRides[startStation] = {};
        }
        if (!this.stationRides[startStation][endStation]) {
            this.stationRides[startStation][endStation] = {
                numRides: 0, average: 0
            };
        }
    };
    return UndergroundSystem;
}());
/**
* Your UndergroundSystem object will be instantiated and called as such:
* var obj = new UndergroundSystem()
* obj.checkIn(id,stationName,t)
* obj.checkOut(id,stationName,t)
* var param_3 = obj.getAverageTime(startStation,endStation)
*/ 
//# sourceMappingURL=1396%20Design%20Underground%20System.js.map