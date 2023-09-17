import { Character } from "../model/character";

export class CharacterRepository {
    private static instance: CharacterRepository = this.createInstance();

    private static createInstance(): CharacterRepository {
        return new CharacterRepository({});
    }

    private constructor(private data: {[key: number]: Character}) {};
    private currentId: number = 0;

    public static getInstance(): CharacterRepository {
        return this.instance;
    };

    public getAll(): Character[] {
        return Object.values(this.data);
    };

    public insert(character: Character) {
        character.id = this.currentId;
        this.data[this.currentId] = character;
        this.currentId++;
    }

    public clear() {
        // TODO: Raise exception if ENV is not test
        this.data = {};
        this.currentId = 0;
    }
}
