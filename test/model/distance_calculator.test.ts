import { DistanceCalculator } from "../../src/model/distance_calculator";
import { Fixtures } from "../fixtures";

const EXPECTED_DISTANCE = 18903;

describe("Distance calculator", () => {
    const millenniumFalcon = Fixtures.millenniumFalcon();
    const naboo = Fixtures.naboo();

    test("Calculates distance between locations", () => {
        expect(DistanceCalculator.calculateDistance(millenniumFalcon, naboo)).toBeCloseTo(EXPECTED_DISTANCE);
    });

    test("Distance calculation is commutative", () => {
        const distance = DistanceCalculator.calculateDistance(millenniumFalcon, naboo);
        expect(DistanceCalculator.calculateDistance(naboo, millenniumFalcon)).toBeCloseTo(distance);
    });

    test("Distance to self is zero", () => {
        expect(DistanceCalculator.calculateDistance(naboo, naboo)).toBeCloseTo(0);
    });
});
