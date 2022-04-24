//Se importa el modulo Express para ocupar en nuestro proyecto
import express from "express";
//Se importa el modulo de graphql para Express y poder implementarlo
import {graphqlHTTP} from "express-graphql";
//Se importa nuestro Schema donde estaran nuestra definiciones para nuestra consultas
import schema from "./schema.js";

//Se importa la funcion de connect para nuestra base de datos de MongoDB
import {connect} from "./dbMongo.js";
connect();

//Se ocupa Express para la API
const app = express();

//Se define un mensaje para el directorio / con una respuesta JSON
app.get('/', (req,res)=> {
	res.json({
		message: "Bienvenidos, API-dataCDMXMetrobus"
	})
});

//Se define un directorio /graphql para la opcion de graphiql y schema(que se importa de schema.js)
//Y se ocupa graphqlHTTP del modulo express-graphql
//Se les da las variables de graphiql= true para activar la herramienta grafica y el schema para las consultas que se puedan realizar
app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema: schema
}));

//Log para revisar que el server esta activo
app.listen(3000, () => console.log('Server on port 3000'));