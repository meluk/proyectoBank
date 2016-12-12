var mongoose = require('mongoose'),
	Schema = mongoose.Schema; //Interactuar con el esquema de la base de datos

var customers = new Schema({
	cedula : String,
    tipoVentanilla : String,
    ficha : String,
    HoraInicio : Date,
    HoraAtecion : String,
    HoraFinal : String,
    tiempoVentanilla : String
}, {collection: 'customers'}); //collection: nombre de la tabla en robomongo.

mongoose.model('customers', customers); //Exporta la coleccion para poder ser utilizada