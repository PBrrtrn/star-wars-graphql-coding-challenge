import { Coordinates } from "../src/model/coordinates";
import { Planet } from "../src/model/planet";
import { Character } from "../src/model/character";
import { Starship } from "../src/model/starship";

export class Fixtures {
    static tatooineCoordinates = new Coordinates(30.0, 30.0);
    static nabooCoordinates = new Coordinates(-40.0, 210.0);

    static tatooine(): Planet {
        return new Planet("Tatooine", 3000, "Arid", "Desert", this.tatooineCoordinates);
    }

    static naboo(): Planet {
        return new Planet("Naboo", 15000, "Temperate", "Plains", this.nabooCoordinates);
    }

    static lukeSkywalker(): Character {
        return new Character("Luke Skywalker", "Human", 0.9, this.tatooine());
    }

    static hanSolo(): Character {
        return new Character("Han Solo", "Human", 0.05, this.tatooine());
    }

    static millenniumFalcon(): Starship {
        return new Starship("Millennium Falcon", "YT-1300", 70, this.tatooineCoordinates);
    }
}
