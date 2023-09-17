import { CharacterRepository } from "../../src/repositories/character_repository";
import { Fixtures } from "../fixtures";

describe("Character repository", () => {
    const characterRepository = CharacterRepository.getInstance();

    beforeEach(() => {
        characterRepository.clear();
    });

    describe("Instantiation", () => {
        test("Returns single instance", () => {
            const hanSolo = Fixtures.hanSolo();
            characterRepository.insert(hanSolo);

            const secondRepository = CharacterRepository.getInstance();
            expect(secondRepository.getAll()).toStrictEqual([hanSolo]);
        });
    });

    test("Can add a character", () => {
        const hanSolo = Fixtures.hanSolo();
        hanSolo.id = 0;
        characterRepository.insert(hanSolo);
        expect(characterRepository.getAll()).toStrictEqual([hanSolo]);
    });

    test("Can get all characters", () => {
        populateRepository(characterRepository);

        const hanSolo = Fixtures.hanSolo();
        hanSolo.id = 0;
        const lukeSkywalker = Fixtures.lukeSkywalker();
        lukeSkywalker.id = 1;

        expect(characterRepository.getAll()).toStrictEqual([hanSolo, lukeSkywalker]);
    });

    test("Can get a character by ID", () => {
        populateRepository(characterRepository);

        const lukeSkywalker = Fixtures.lukeSkywalker();
        lukeSkywalker.id = 1;

        expect(characterRepository.get(1)).toStrictEqual(lukeSkywalker);
    });
});

const populateRepository = function(characterRepository: CharacterRepository) {
    const hanSolo = Fixtures.hanSolo();
    const lukeSkywalker = Fixtures.lukeSkywalker();
    characterRepository.insert(hanSolo);
    characterRepository.insert(lukeSkywalker);
}
