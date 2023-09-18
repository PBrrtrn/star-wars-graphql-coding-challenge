import { Starship } from "../../src/model/starship";
import { StarshipRepository } from "../../src/repositories/starship_repository";
import { Fixtures } from "../fixtures";

describe("Starship repository", () => {
    const starshipRepository = StarshipRepository.getInstance();

    beforeEach(() => {
        starshipRepository.clear();
    });

    describe("Instantiation", () => {
        test("Returns single instance", () => {
            const millenniumFalcon = Fixtures.millenniumFalcon();
            starshipRepository.insert(millenniumFalcon);

            const secondRepository = StarshipRepository.getInstance();
            expect(secondRepository.getAll()).toStrictEqual([millenniumFalcon]);
        });
    });

    test("Can add a starship", () => {
        const millenniumFalcon = Fixtures.millenniumFalcon();
        millenniumFalcon.id = 0;
        starshipRepository.insert(millenniumFalcon);
        expect(starshipRepository.getAll()).toStrictEqual([millenniumFalcon]);
    });

    test("Can get all starships", () => {
        populateRepository(starshipRepository);

        const millenniumFalcon = Fixtures.millenniumFalcon();
        millenniumFalcon.id = 0;
        const tieFighter = Fixtures.tieFighter();
        tieFighter.id = 1;

        expect(starshipRepository.getAll()).toStrictEqual([millenniumFalcon, tieFighter]);
    });

    test("Can get a starship by ID", () => {
        populateRepository(starshipRepository);

        const tieFighter = Fixtures.tieFighter();
        tieFighter.id = 1;

        expect(starshipRepository.get(1)).toStrictEqual(tieFighter);
    });

    test("Can update a starship by ID", () => {
        populateRepository(starshipRepository);
        const updatedStarship = new Starship("TIE Fighter", "Ln-Starfighter", 5, Fixtures.tatooineCoordinates, 1);
        starshipRepository.update(1, updatedStarship);
        expect(starshipRepository.get(1)).toStrictEqual(updatedStarship);
    });
});

const populateRepository = function(starshipRepository: StarshipRepository) {
    const millenniumFalcon = Fixtures.millenniumFalcon();
    const tieFighter = Fixtures.tieFighter();
    starshipRepository.insert(millenniumFalcon);
    starshipRepository.insert(tieFighter);
}