import { DistanceCalculator } from "./distance_calculator.js";
import { Starship } from "./starship.js";

export class NearbyEnemiesDetector {
    constructor(private distanceCalculator: DistanceCalculator) {}

    public detectEnemies(starship: Starship, range: number): Starship[] {
        return starship.getEnemies().filter((enemy) => {
            return this.distanceCalculator.calculateDistance(starship, enemy) <= range;
        });
    }
}
