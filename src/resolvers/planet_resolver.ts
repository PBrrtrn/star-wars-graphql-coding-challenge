import { PlanetRepository } from "../repositories/planet_repository";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const planetResolver = {
    Query: {
        planets() {
            return PlanetRepository.getInstance().getAll().map(planet => {
                return PlanetSerializer.serialize(planet);
            });
        }
    }
}
