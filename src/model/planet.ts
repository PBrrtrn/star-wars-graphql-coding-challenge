import { Coordinates } from "./coordinates";
import { Location } from "./location";

export class Planet extends Location {
    constructor(
        public name: string,
        public population: number,
        public climate: string,
        public terrain: string,
        coordinates: Coordinates,
        public id: number = null
    ) {
        super(coordinates);
    }
}
