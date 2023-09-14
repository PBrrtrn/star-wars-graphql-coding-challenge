import { Coordinates } from "./coordinates";

export abstract class Location {
    constructor(
        private coordinates: Coordinates
    ) {}

    public getCoordinates(): Coordinates {
        return this.coordinates;
    }

    public setCoordinates(coordinates: Coordinates): void {
        this.coordinates = coordinates;
    }
}
