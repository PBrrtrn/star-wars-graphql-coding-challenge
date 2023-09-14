import { Coordinates } from "./coordinates";
import { Character } from "./character";
import { Planet } from "./planet";

import { Location } from "./location";

export class Starship extends Location {
    private passengers: Character[] = [];
    private enemies: Starship[] = [];

    constructor(
        public name: string,
        public model: string,
        public cargoCapacity: number,
        coordinates: Coordinates
    ) {
        super(coordinates);
    }

    travelTo(destination: Planet): void {
        this.setCoordinates(destination.getCoordinates());
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
