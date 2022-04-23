import axios from "axios";
import Units from "./models/Units.js";

export function consultRecords(limit,offset){
	const url = 'https://datos.cdmx.gob.mx/api/3/action/datastore_search?resource_id=ad360a0e-b42f-482c-af12-1fd72140032e&limit='+limit+'&offset='+offset+'';
	
	return new Promise((resolve,rejected) =>{
		axios.post(url).then(response => {
		const data = response.data.result.records;
		const dataLen = data.length;
		let countR=0;

		for(let x=0;x<dataLen;x++){
			//console.log(data[x]);
			addRecord(data[x]);
			countR++;
		}

		var res = {"message":"Importe de Data Completo", "recordSave": countR, "offset": dataLen+offset};

		var jsonCompleto = JSON.stringify(res); 
		var response = JSON.parse(jsonCompleto)
		//console.log(response);

		resolve(response);
		});
	});

};

async function addRecord(record){
	//guardar nuevo registro
	const newUnits = new Units(record);
	newUnits.town_hall = "";
	//console.log(newUnits);
	await newUnits.save();
	//console.log(newUser);
};


