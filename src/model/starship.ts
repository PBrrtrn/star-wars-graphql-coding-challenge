import { Coordinates } from "./coordinates";
import { Character } from "./character";
import { Planet } from "./planet";

export class Starship {
    private passengers: Character[] = [];
    private enemies: Starship[] = [];

    constructor(
        public name: string,
        public model: string,
        public cargoCapacity: number,
        public currentLocation: Coordinates
    ) {}

    travelTo(destination: Planet): void {
        this.currentLocation = destination.coordinates;
        this.passengers.forEach(character => { character.currentLocation = destination; });
    }

    addPassenger(character: Character): void {
        this.passengers.push(character);
    }

    removePassenger(character: Character): void {
        this.passengers.forEach((passenger, index) => {
            if (passenger === character) {
                this.passengers.splice(index, 1);
                return;
            };
        });
    }

    getPassengers(): Character[] {
        return this.passengers;
    }

    getEnemies(): Starship[] {
        return this.enemies;
    }
}
