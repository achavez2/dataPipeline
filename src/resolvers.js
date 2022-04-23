import {consultRecords} from "./importDataMetrobus.js";
//Se import modelo para mongo
import Units from "./models/Units.js";

//Se define y exporta los resolvers, en el cual se coloca las respuesta
//que deberian de enviar a sus respectivos schemas
export const resolvers ={
	//Query para definir todas las consultas que se puedan realizar
	Query: {
		async dataUnits(){
			return await Units.find();
		}
	},
	//Mutation para definir las creaciones que se puedan realizar
	Mutation: {
		importDataMetrobus(_,{limit, offset}){
			return consultRecords(limit,offset)
			.then((data) => data);
		}
	}

};