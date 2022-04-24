//Se importa la librerio Axios para realizar la consulta a la API de informacion del Metrobus
import axios from "axios";
//Se importa modelo Unit para los datos de las unidades del Metrobus
import Units from "./models/Units.js";

import {consultTownHallCDMXById} from "./dataGoogleMaps.js";

//Se define la función, con sus valores de entrada:
//limit: para limitar la busqueda a esa cantidad, el Maximo que permitira será de 50
//offset: para determinar donde sera el comienzo de la consulta en los registros, este offset tambien es una salida para que sea tomada para la siguiente consulta
export function consultRecords(limit,offset){
	//Se ocupa Promise para que espere la respuesta cuando se realice la consulta
	return new Promise((resolve,rejected) =>{
		if(limit>50	){
			//se define respuesta con variables de salida
			var res = {"message": "Maximo de Registro a Importar es 50", "total": 0, "offset": 0};

			//se realiza proceso de convertir en JSON para enviar a respuesta del Resolver
			var jsonCompleto = JSON.stringify(res); 
			var response = JSON.parse(jsonCompleto)
			//console.log(response);
	 
	 		//Se manda el Resolve para el Promise de la funcion
			resolve(response);
		}else{
			//Se define la url de API de los datos del metrobus con sus parametros
			const url = 'https://datos.cdmx.gob.mx/api/3/action/datastore_search?resource_id=ad360a0e-b42f-482c-af12-1fd72140032e&limit='+limit+'&offset='+offset+'';
			axios.post(url).then(response => {
				//En data se guardaran todos los registros obtenidos de la consulta con Axios
				const data = response.data.result.records;
				//se guardan el total de registro que existen por parte de la API de los datos del Metrobus
				const totalRecords = response.data.result.total;
				//se obtiene el ancho de la variable de los registros que se obtuvieron
				const dataLen = data.length;

				//se recorren los registros obtenidos para enviarlos a la función de guardado para la base de mongo
				for(let x=0;x<dataLen;x++){
					//console.log(data[x]);
					addRecord(data[x]);
				}

				//se define respuesta con variables de salida
				var res = {"message": "Importe de Data Completo", "total": totalRecords, "offset": dataLen+offset};

				//se realiza proceso de convertir en JSON para enviar a respuesta del Resolver
				var jsonCompleto = JSON.stringify(res); 
				var response = JSON.parse(jsonCompleto)
				//console.log(response);
		 
		 		//Se manda el Resolve para el Promise de la funcion
				resolve(response);
			});
		}
	});

};

async function addRecord(record){
	//validar si existe registro en db;
	const findUnit = await Units.findById(record._id);
	//console.log(findUnit._id);

	//guardar registro proveniente de API de Metrobus en constante para actualizar o guardar
	const nUnit = new Units(record);
	// se agrega campo para posteriormente colocar la Alcaldia, Direccion y Entidad Federativa
	nUnit.town_hall = "";
	nUnit.direction = "";
	nUnit.federal_entity = "";
	//console.log(nUnit);

	await consultTownHallCDMXById(nUnit)
			.then((data) => nUnit);

	if(findUnit==null){
		//Se guarda registro en caso de no existir
		await nUnit.save();

	}else{
		//Se actualiza el registro en caso de existir
		await Units.findByIdAndUpdate(nUnit._id, nUnit, {new: true});
	}
};


