import { DistanceCalculator } from "./distance_calculator";
import { Starship } from "./starship";

export class NearbyEnemiesDetector {
    constructor(private distanceCalculator: DistanceCalculator) {}

    public detectEnemies(starship: Starship, range: number): Starship[] {
        return starship.getEnemies().filter((enemy) => {
            return this.distanceCalculator.calculateDistance(starship, enemy) <= range;
        });
    }
}
