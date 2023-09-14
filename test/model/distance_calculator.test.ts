import { DistanceCalculator } from "../../src/model/distance_calculator";
import { Fixtures } from "../fixtures";

const EXPECTED_DISTANCE = 18903;

describe("Distance calculator", () => {
    const distanceCalculator = new DistanceCalculator();

    const millenniumFalcon = Fixtures.millenniumFalcon();
    const naboo = Fixtures.naboo();

    test("Calculates distance between locations", () => {
        expect(distanceCalculator.calculateDistance(millenniumFalcon, naboo)).toBeCloseTo(EXPECTED_DISTANCE);
    });

    test("Distance calculation is commutative", () => {
        const distance = distanceCalculator.calculateDistance(millenniumFalcon, naboo);
        expect(distanceCalculator.calculateDistance(naboo, millenniumFalcon)).toBeCloseTo(distance);
    });

    test("Distance to self is zero", () => {
        expect(distanceCalculator.calculateDistance(naboo, naboo)).toBeCloseTo(0);
    });
});
