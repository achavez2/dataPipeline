//Se importa makeExecutableSchema del modulo graphql-tools, en esta variable se guardaran nuestra definiciones y resolvers
import { makeExecutableSchema } from "graphql-tools";
//Se importa los Resolvers respectivos a nuestro Schemas
import { resolvers } from "./resolvers.js";

// Se definen los tipos que podra ocupar nuestras consultas y sus tipos
//Empenzando por Query, para que solo se puedan hacer esas consultas
//Tambien se definen Otros tipos objetos con sus campos y tipos
const typeDefs =`
	type Query {
		dataUnits: [Unit]
	}

	type Unit {
		_id: ID
		id: Int
		data_updated: String
		vehicle_id: Int 
		vehicle_label: String
		vehicle_current_status: Int 
		geographic_point: String
		town_hall: String 
	}

	type Response{
		message: String
		recordSave: Int 
		offset: Int 
	}

	type Mutation {
		importDataMetrobus(limit: Int, offset: Int): Response
	}

`; 

//Se ocupa makeExecutableSchema de graphpq-tools para agregarle el typeDefs y su resolvers
export default makeExecutableSchema({
	typeDefs: typeDefs,
	resolvers: resolvers
})