import { Character } from "../model/character";
import { PlanetSerializer } from "./planet_serializer";

export class CharacterSerializer {
    public static serialize(character: Character) {
        return {
            id: String(character.id),
            name: character.name,
            species: character.species,
            forceSensitivity: character.forceSensitivity,
            currentLocation: PlanetSerializer.serialize(character.currentLocation)
        };
    }
}
