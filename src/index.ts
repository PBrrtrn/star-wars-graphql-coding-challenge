import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { executableSchema } from "./schema";

const PORT = 4567;

const server = new ApolloServer({
    schema: executableSchema,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
});

console.log(`Server listening in port ${PORT}`);
