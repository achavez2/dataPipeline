import axios from "axios";
//Se import modelo para mongo
import Units from "./models/Units.js";

//Se crea una funcion para obtener las Alcadias de la CDMX en base a las coordenadas
export function consultTownHallCDMXById(unit){
	return new Promise((resolve,rejected) =>{
		//Se define url de API de Google Maps para obtener los datos de las coordenas de las unidades
		let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+unit.geographic_point+"&result_type=route&key=AIzaSyDpU0qcu7hOFIj0HL57kR-UlVNVsFEQDDA";

		//Se realiza conexion con la API de Google Maps
		axios.post(url).then(response => {
			//Se validad que se tenga una respuesta OK del API de Google Maps
			if(response.data.status=="OK"){
				//Se guarda en la variable direccion el formatted_address, que es la direccion completa del geographic_point
				let direccion = response.data.results[0].formatted_address;

				//Se definen variables para usar en el recorrido de formatted_address
				let countC = 0 
				let iniTH, finTH = 0
				let iniFE, finFE = 0;

				//Se define variable para obtener la longitud de formatted_address
				const lengDir=direccion.length-1;

				for(let x=lengDir;x>=0;x--){
					//Se realiza un conteo de un valor especifico que es la coma, ya que analizando la variable de dirección es su forma de separación de datos
					//Se obtiene los respectivos puntos para el slice para obtener Alcaldia y Entidad
					if(direccion[x]==","){countC++;}

					if(countC==1 && direccion[x]==","){
						finFE=x;
					}
					if(countC==2 && direccion[x]==","){
						iniFE=x+2;
					}
					if(countC==3 && direccion[x]==","){
						finTH=x;
					}
					if(countC==4 && direccion[x]==","){
						iniTH=x+2;
					}
				}

				//se guardan los datos en sus respectivos lugares del modelo Unit para su retorno
				unit.town_hall = direccion.slice(iniTH,finTH);
				unit.federal_entity = direccion.slice(iniFE,finFE);
				unit.direction = direccion;

				//Se retorna unit con resolve para finalizar el promise
				resolve(unit);
			}else{
				//Se retorna unit sin modificar con resolve para finalizar el promise para el caso de que no se pueda obtener una dirección correcta
				resolve(unit);
			}

		});
	});
};
