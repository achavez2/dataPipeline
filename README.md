# dataPipeline
Pipeline de análisis de datos utilizando los datos abiertos de la Ciudad de México del Metrobus

Desarrollo de pipeline de análisis de datos utilizando los datos abiertos de la Ciudad de México
correspondientes a las ubicaciones de las unidades del metrobús para que pueda ser
consultado mediante un API Rest filtrando por unidad o por alcaldía.

# Funciones Principales de API en /graphql

1.- importDataMetrobus. Realizara la consulta a la API del Metrobus de CDMX para obtener los datos necesarios de las unidades, así como su información de Dirección, Delegación y Entidad Federativa obtenidos de la API de Google Maps. Y se guarda la información en la DB. Se define un limite de consulta de 50 registros por consulta al API del Metrobus, para el uso de paginación con el campo offset.

2.- availableUnits. Realiza la consulta de todas las unidades disponibles del Metrobus de CDMX.

3.- locationUnitByID. Realiza la consulta de una unidad por ID.

4.- listTownHallCDMX. Realiza la consulta de todas las alcaldias disponibles de la CDMX y regresa en una lista como respuesta.

5.- lisUnitsByTownHallCDMX. Realiza la consulta de todas las unidades que se encuentran dentro de una alcaldia de CDMX.

# Configuraciones Docker

Se crea el archivo "Dockerfile" para la creación de nuestro contenedor para "apigrapqhl".

Se crea el archivo "docker-compose.yaml" para poder crear de forma más eficiente el contenedor de "apigrapqhl", así como el contenedor "mongo" para nuestra base de datos en Mongo DB. Lo cuales estarán enlazados por una red llamada "apigraph-network" para su comunicación. También se define los volumenes que se ocuparan para los respectivos contenedores.