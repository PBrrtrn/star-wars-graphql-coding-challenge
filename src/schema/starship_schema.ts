export const starshipSchema = `#graphql
    type Starship {
        id: ID!
        name: String!
        model: String!
        cargoCapacity: Float!
        latitude: Float!
        longitude: Float!
        passengers: [Character!]
    },
    type Query {
        starships: [Starship!]
    }
`

export const starshipResolvers = {
    Query: {
        starships() {
            return [
                {
                    id: "0",
                    name: "Pepe Starship",
                    model: "Pepe-2000",
                    cargoCapacity: 1000.0,
                    latitude: 0.0,
                    longitude: 0.0,
                    passengers: [{
                        id: "0",
                        name: "Pepe",
                        species: "Pepe",
                        forceSensitivity: 100.0,
                        currentLocation: {
                            id: "0",
                            name: "Pepe Planet",
                            population: 1,
                            climate: "Tropical",
                            terrain: "Beach",
                            latitude: 0.0,
                            longitude: 0.0
                        }
                    }]
                }
            ];
        }
    },
    Starship: {
        passengers(parent: any) {
            return [{
                id: "0",
                name: "Pepe",
                species: "Pepe",
                forceSensitivity: 100.0,
                currentLocation: {
                    id: "0",
                    name: "Pepe Planet",
                    population: 1,
                    climate: "Tropical",
                    terrain: "Beach",
                    latitude: 0.0,
                    longitude: 0.0
                }
            }]
        }
    }
}
