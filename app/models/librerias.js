var mongoose = require('mongoose'),
	Schema = mongoose.Schema; //Interactuar con el esquema de la base de datos

var librerias = new Schema({
	nombre: String,
	precio: String,
	imagen: String
}, {collection: 'libreriaCollection'}); //collection: nombre de la tabla en robomongo.

mongoose.model('librerias', librerias); //Exporta la coleccion para poder ser utilizada.