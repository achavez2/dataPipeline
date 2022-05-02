import mongoose from "mongoose";

//Se define y se exporta la funcion Asincrona de connect
//Para conectar a Mongo DB
export  async function connect(){
	//Se Implemente un Try para poder revisar el error, de existar al realizar la conexion
	try{
		//Se cambia direccion por la imagen docker "mongo" en puerto "27017" para su contenedor docker
		await mongoose.connect('mongodb://mongo:27017/dbCDMXMetrobus', {
		useNewUrlParser: true
		})
		console.log('--Conexión establecida a la DB: dbCDMXMetrobus');
	}
	//En caso de error se obtendra con el catch para mandar un mensaje
	catch(e){
		console.log('--Error al Conectar a la DB');
	}
}
