import { Planet } from "./planet.js"

export class Character {
    constructor(
        public name: string,
        public species: string,
        public forceSensitivity: number,
        public currentLocation: Planet,
        public id: number = null
    ) {}
}
