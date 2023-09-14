import { Location } from "./location"
import haversine from 'haversine';

export class DistanceCalculator {
    static calculateDistance(location1: Location, location2: Location) {
        return Math.round(Number(haversine(
            this.formatLocationCoordinates(location1),
            this.formatLocationCoordinates(location2)
        )));
    }

    private static formatLocationCoordinates(location: Location) {
        return {
            latitude: location.getCoordinates().latitude,
            longitude: location.getCoordinates().longitude
        }
    }
}
