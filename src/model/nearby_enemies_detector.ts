import { DistanceCalculator } from "./distance_calculator";
import { Starship } from "./starship";

export class NearbyEnemiesDetector {
    static detectEnemies(starship: Starship, range: number): Starship[] {
        return starship.getEnemies().filter((enemy) => {
            return DistanceCalculator.calculateDistance(starship, enemy) < range;
        });
    }
}
