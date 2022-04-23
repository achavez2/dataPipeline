import {consultRecords} from "./importDataMetrobus.js";
//Se import modelo para mongo
import Units from "./models/Units.js";

//Se define y exporta los resolvers, en el cual se coloca las respuesta
//que deberian de enviar a sus respectivos schemas
export const resolvers ={
	//Query para definir todas las consultas que se puedan realizar
	Query: {
		//Se obtienen las
		async availableUnits(){
			return await Units.find({"vehicle_current_status":1}).sort({_id:1});
		},
		async locationUnitByID(_,{_id}){
			return await Units.findById(_id);
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