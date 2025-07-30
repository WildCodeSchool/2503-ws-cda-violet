import "reflect-metadata";
import * as jwt from "jsonwebtoken";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import { UserToken } from "./types/Context";
import { Role } from "./entities/User";
const port = 3000;

async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context: { user } }, neededRoles: Role[]) => {
      // Si pas authentifié: ❌
      if (!user) return false;
      // Si neededRoles vide: ✅
      if (!neededRoles.length) return true;
      // Si user a ADMIN: ✅
      if (user.roles.includes(Role.ADMIN)) return true;
      // Si user a au moins un role inclus dans neededRoles: ✅ ; Sinon ❌
      return neededRoles.some(user.roles.includes);
    },
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
    context: async ({ req, res }) => {
      let user: string | jwt.JwtPayload | null = null;

      const match = req.headers.cookie?.match(/tgc-auth=([^;]+)/);
      if (match && process.env.JWT_SECRET) {
        const token = match[1];
        // verify renvoie une string si invalide, un payload si valide
        user = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof user === "string") user = null;
      }

      return { req, res, user: user as UserToken };
    },
  });
  console.info("Server started on " + url);
}
startServer();
