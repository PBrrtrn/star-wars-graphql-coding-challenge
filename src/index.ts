import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { applicationSchema } from "./schema/schema";

const PORT = 4567;

const server = new ApolloServer({
    schema: applicationSchema,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
});

console.log(`Server listening in port ${PORT}`);
