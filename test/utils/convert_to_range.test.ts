import { convertToRange } from "../../src/utils/convert_to_range";

describe("Convert to range", () => {
    test("Converts lower bound", () => {
        expect(convertToRange(0, [0, 1], [1, 2])).toBe(1);
    });

    test("Converts upper bound", () => {
        expect(convertToRange(1, [0, 1], [3, 4])).toBe(4);
    });

    test("Converts middle", () => {
        expect(convertToRange(0.5, [0, 1], [0, 4])).toBe(2);
    })
});
