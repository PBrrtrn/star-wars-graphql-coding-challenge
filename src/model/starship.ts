import { Coordinates } from "./coordinates.js";
import { Character } from "./character.js";
import { Planet } from "./planet.js";

import { Location } from "./location.js";

export class Starship extends Location {
    private passengers: Character[] = [];
    private enemies: Starship[] = [];

    constructor(
        public name: string,
        public model: string,
        public cargoCapacity: number,
        coordinates: Coordinates,
        public id: number = null
    ) {
        super(coordinates);
    }

    travelTo(destination: Planet): void {
        this.setCoordinates(destination.getCoordinates());
        this.passengers.forEach(character => { character.currentLocation = destination; });
    }

    addPassenger(character: Character): void {
        if (!(this.getCoordinates().equals(character.currentLocation.getCoordinates()))) {
            throw new Error("Passenger is at different location");
        }

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

    addEnemy(enemy: Starship): void {
        this.enemies.push(enemy);
    }

    getEnemies(): Starship[] {
        return this.enemies;
    }
}
