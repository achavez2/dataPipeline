import axios from "axios";
//Se import modelo para mongo
import Units from "./models/Units.js";

//Se crea una funcion para obtener las Alcadias de la CDMX en base a las coordenadas
export function consultTownHallCDMXById(unit){
	return new Promise((resolve,rejected) =>{
		//Se define url de API de Google Maps para obtener los datos de las coordenas de las unidades
		let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+unit.geographic_point+"&result_type=route&key=AIzaSyDpU0qcu7hOFIj0HL57kR-UlVNVsFEQDDA";

		axios.post(url).then(response => {

			const statusData = response.data.status;

			if(statusData!="ZERO_RESULTS"){
				let direccion = response.data.results[0].formatted_address;
				let countC=0;
				let ini=0;
				let fin=0;
				const lengDir=direccion.length-1;

				for(let x=lengDir;x>=0;x--){
					if(direccion[x]==","){countC+=1;}
					if(countC==3 && direccion[x]==","){
						fin=x;
					}
					if(countC==4 && direccion[x]==","){
						ini=x+2;
					}
				}

				unit.town_hall = direccion.slice(ini,fin);
				//console.log(unit.town_hall);

				resolve(unit);
			}else{
				resolve(unit);
			}

		});
	});
};
