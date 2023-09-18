import { Coordinates } from "./coordinates.js";
import { Location } from "./location.js";

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
