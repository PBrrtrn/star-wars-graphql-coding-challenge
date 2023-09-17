import { Starship } from "../model/starship";
import { CharacterSerializer } from "./character_serializer";

export class StarshipSerializer {
    static serialize(starship: Starship) {
        return {
            id: String(starship.id),
            name: starship.name,
            model: starship.model,
            cargoCapacity: starship.cargoCapacity,
            latitude: starship.getCoordinates().latitude,
            longitude: starship.getCoordinates().longitude,
            passengers: starship.getPassengers().map(passenger => CharacterSerializer.serialize(passenger))
        };
    }
}
