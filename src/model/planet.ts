import { Coordinates } from "./coordinates";

export class Planet {
    constructor(
        public name: string,
        public population: number,
        public climate: string,
        public terrain: string,
        public coordinates: Coordinates
    ) {}
}