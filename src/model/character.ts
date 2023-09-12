import { Planet } from "./planet"

export class Character {
    constructor(
        public name: string,
        public species: string,
        public forceSensitivity: number,
        public currentLocation: Planet
    ) {}
}
