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
			//Se realiza una consulta con find, donde el campo vehicle_current_status sea igual 1 para unidades disponibles, y se ordena de forma ASC con sort en base al campo _id
			return await Units.find({"vehicle_current_status":1}).sort({_id:1});
		},
		async locationUnitByID(_,{_id}){
			//Se realiza la consulta por ID con el campo _id
			return await Units.findById(_id);
		},
		async listTownHallCDMX(){
			//Se realiza la consulta con un distinct en base al campo town_hall, para obtener el lista de ese campo pero sin repeticiones de alcaldias y junto a un where donde se validad que la entidad sea CDMX
			const listTown_halls = await Units.distinct("town_hall").where('federal_entity').all(["CDMX"]);
			//Se convierte en un objeto JSON y porteriormente se parsea para su retorno
			var jsonCompleto = JSON.stringify(listTown_halls); 
			var response = JSON.parse(jsonCompleto)
			return response;
		},
		async lisUnitsByTownHallCDMX(_,{townHall}){
			//Se realiza la consulta donde el campo town_hall contenga con la funcion all, en este caso con el nombre de la alcaldia, y se ordena con sort de forma ASC con el campo _id y se ocupa un fitrol en la funcion fins, para validar que consulte solo los registros que el campo federal_entity tenga el valor CDMX
			const listUnits = await Units.find({'federal_entity': "CDMX"}).where('town_hall').all([townHall]).sort({_id:1});
			return listUnits;
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