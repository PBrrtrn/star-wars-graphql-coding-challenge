import { PlanetRepository } from "../repositories/planet_repository";
import { PlanetSerializer } from "../serializers/planet_serializer";

export const planetResolver = {
    Query: {
        planets() {
            return PlanetRepository.getInstance().getAll().map(planet => {
                return PlanetSerializer.serialize(planet);
            });
        },
        planet(_: any, args: any) {
            return PlanetSerializer.serialize(PlanetRepository.getInstance().get(args.id));
        }
    }
}
