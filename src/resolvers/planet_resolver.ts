import { PlanetRepository } from "../repositories/planet_repository";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const planetResolver = {
    Query: {
        planets() {
            // return [{name: "Pepe", population: 1, terrain: "pepe", climate: "pepe", latitude: 0.0, longitude: 0.0 }]
            return PlanetRepository.getInstance().getAll().map(planet => {
                return PlanetSerializer.serialize(planet);
            });
        }
    }
}
