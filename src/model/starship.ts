import { Coordinates } from "./coordinates";
import { Character } from "./character";

export class Starship {
    private passengers: Character[] = [];
    private enemies: Starship[] = [];

    constructor(
        public name: string,
        public model: string,
        public cargoCapacity: number,
        public currentLocation: Coordinates
    ) {}

    addPassenger(character: Character): void {
        this.passengers.push(character);
    }

    getPassengers(): Character[] {
        return this.passengers;
    }

    getEnemies(): Starship[] {
        return this.enemies;
    }
}
