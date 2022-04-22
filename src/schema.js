//Se importa makeExecutableSchema del modulo graphql-tools, en esta variable se guardaran nuestra definiciones y resolvers
import { makeExecutableSchema } from "graphql-tools";
//Se importa los Resolvers respectivos a nuestro Schemas
import { resolvers } from "./resolvers.js";

// Se definen los tipos que podra ocupar nuestras consultas y sus tipos
//Empenzando por Query, para que solo se puedan hacer esas consultas
//Tambien se definen Otros tipos objetos con sus campos y tipos
const typeDefs =`
	type Query {
		prueba: String
	}

`; 

//Se ocupa makeExecutableSchema de graphpq-tools para agregarle el typeDefs y su resolvers
export default makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: resolvers
})