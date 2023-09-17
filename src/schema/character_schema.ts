export const characterSchema = `#graphql
    type Character {
        id: Int!
        name: String!
        species: String!
        forceSensitivity: Float!
        currentLocation: Planet!
    },
    type Query {
        characters: [Character!]
    }
`

export const characterResolvers = {
    Query: {
        characters() {
            return [{id: 1, name: 'Pepe', species: 'Pepe', forceSensitivity: 100.0, currentLocationId: 0}]
        }
    },
    Character: {
        currentLocation(_parent: any) {
            return {id: 0, name: 'Pepe Planet', population: 1, climate: 'Tropical', terrain: 'Beach', latitude: 0.0, longitude: 0.0}
        }
    }
}
