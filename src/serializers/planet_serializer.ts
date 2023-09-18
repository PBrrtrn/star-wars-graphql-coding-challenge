import { Planet } from "../model/planet.js";

export class PlanetSerializer {
    public static serialize(planet: Planet) {
        return {
            id: String(planet.id),
            name: planet.name,
            population: planet.population,
            climate: planet.climate,
            terrain: planet.terrain,
            latitude: planet.getCoordinates().latitude,
            longitude: planet.getCoordinates().longitude
        }
    }
}
