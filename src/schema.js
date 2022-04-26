//Se importa buildSchema del modulo graphql, en esta variable se guardaran nuestra definiciones para querys y mutation
import {buildSchema} from "graphql";

// Se definen los tipos que podra ocupar nuestras consultas y sus tipos
//Empenzando por Query, para que solo se puedan hacer esas consultas
//Tambien se definen Otros tipos objetos con sus campos y tipos
//Se define mutation para funciones que realicen modificaciones y guardado en la base de datos
export const schema = buildSchema(`
	type Query {
		availableUnits: [Unit]
		locationUnitByID(_id: Int): String
		listTownHallCDMX: [String]
		lisUnitsByTownHallCDMX(townHall: String): [Unit]
	}

	type Unit {
		_id: ID
		id: Int
		data_updated: String
		vehicle_id: Int 
		vehicle_label: String
		vehicle_current_status: Int 
		position_latitude: String
		position_longitude: String
		geographic_point: String
		position_speed: Int
		position_odometer: Int
		trip_schedule_relationship: Int
		trip_id: Int
		trip_start_date: Int
		trip_route_id: Int
		direction: String,
		town_hall: String,
		federal_entity: String
	}

	type Response{
		message: String
		total: Int
		offset: Int 
	}

	type Mutation {
		importDataMetrobus(limit: Int, offset: Int): Response
	}

`); 