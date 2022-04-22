
//Se define y exporta los resolvers, en el cual se coloca las respuesta
//que deberian de enviar a sus respectivos schemas
export const resolvers ={
	//Query para definir todas las consultas que se puedan realizar
	Query: {
		prueba() {
			return 'Prueba de Respuesta para API';
		}
	}

};