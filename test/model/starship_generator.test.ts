import { Coordinates } from "../../src/model/coordinates";
import { Starship } from "../../src/model/starship";
import { DeterministicGenerationCriteria } from "../../src/model/starship_generator/attributes_generation_criteria/generation_criteria";
import { StarshipGenerator } from "../../src/model/starship_generator/starship_generator";

describe("Starship generator", () => {
    test("Generates a starship", () => {
        const startshipGenerator = new StarshipGenerator(
            new DeterministicGenerationCriteria(),
            ['Red Five', 'Executor', 'Naboo Royal Starship'],
            ['X-Wing', 'Star Destroyer', 'J-type 327']
        );

        const expectedStarship = new Starship("Red Five", "X-Wing", 0, new Coordinates(-90,-180));
        expect(startshipGenerator.generateStarship()).toStrictEqual(expectedStarship);
    });
});
