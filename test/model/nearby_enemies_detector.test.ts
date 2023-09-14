import { NearbyEnemiesDetector } from "../../src/model/nearby_enemies_detector";
import { Fixtures } from "../fixtures";

const DETECTION_RANGE = 10000;

describe("Nearby enemies detector", () => {
    test("Returns empty array if ship has no enemies", () => {
        const millenniumFalcon = Fixtures.millenniumFalcon();
        const detectedEnemies = NearbyEnemiesDetector.detectEnemies(millenniumFalcon, DETECTION_RANGE);

        expect(detectedEnemies).toStrictEqual([]);
    });

    test("Detects nearby enemies", () => {
        const millenniumFalcon = Fixtures.millenniumFalcon();
        const tieFighter = Fixtures.tieFighter();
        millenniumFalcon.addEnemy(tieFighter);
        const detectedEnemies = NearbyEnemiesDetector.detectEnemies(millenniumFalcon, DETECTION_RANGE);
        
        expect(detectedEnemies).toStrictEqual([tieFighter]);
    });

    test("Does not detect distant enemies", () => {
        const millenniumFalcon = Fixtures.millenniumFalcon();
        const tieFighter = Fixtures.tieFighter();
        millenniumFalcon.addEnemy(tieFighter);
        tieFighter.travelTo(Fixtures.naboo());

        const detectedEnemies = NearbyEnemiesDetector.detectEnemies(millenniumFalcon, DETECTION_RANGE);
        expect(detectedEnemies).toStrictEqual([]);
    })
});
