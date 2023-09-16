import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { executableSchema } from "./schema";

const PORT = 4567;

/*
    - Primero defino el schema de la API
    - Con el schema hago una InMemoryDatabase
        - Por el momento la DB puede estar compuesta de tres índices, cada uno con la
        forma (id: Objeto), donde la id es incremental y el objeto es una instancia
        del modelo
    - Las queries llaman a los resolvers
    - Los resolvers instancian los repositories necesarios
    - Los repositories leen la DB y hacen el mappeo de raw data a objetos modelo
    - Los resolvers resuelven la lógica de negocio y devuelven el objeto modelo serializado
*/

const server = new ApolloServer({
    schema: executableSchema,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
});

console.log(`Server listening in port ${PORT}`);
