import mongoose from "mongoose";

//Se define y se exporta la funcion Asincrona de connect
//Para conectar a Mongo DB
export  async function connect(){
	//Se Implemente un Try para poder revisar el error, de existar al realizar la conexion
	try{
		await mongoose.connect('mongodb://localhost:27017/dbCDMXMetrobus', {
		useNewUrlParser: true
		})
		console.log('>>>Se ha conectado a la DB: dbCDMXMetrobus');
	}
	catch(e){
		console.log('No se ha podido Conectar');
		console.log(e);
	}
}
