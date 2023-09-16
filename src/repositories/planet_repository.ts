import { Coordinates } from "../model/coordinates";
import { Planet } from "../model/planet";

export class PlanetRepository {
    private static instance: PlanetRepository = this.createInstance();

    private static createInstance(): PlanetRepository {
        const data = [
            new Planet("Tatooine", 3000, "Arid", "Desert", new Coordinates(30.0, 30.0))
        ];
        return new PlanetRepository(data);
    }

    private constructor(private data: Planet[]) {};

    public static getInstance(): PlanetRepository {
        return this.instance;
    };

    public getAll(): Planet[] {
        return this.data;
    }
}
