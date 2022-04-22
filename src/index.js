import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./schema.js";


//Se ocupa Express para la API
const app = express();

//Se define un mensaje para el directorio / con una respuesta JSON
app.get('/', (req,res)=> {
	res.json({
		message: "Bienvenidos, API-GraphQL"
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