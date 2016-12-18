var mongoose = require('mongoose'),
	Schema = mongoose.Schema; //Interactuar con el esquema de la base de datos

var customers = new Schema({
	cedula : String,
    tipoVentanilla : String,
    estado: String,
    ficha : String,
    fecha : String,
    HoraInicio : Date,
    HoraAtecion : Date,
    HoraFinal : Date,
    tiempoVentanilla : { type: Number}
}, {collection: 'customers'}); //collection: nombre de la tabla en robomongo.

mongoose.model('customers', customers); //Exporta la coleccion para poder ser utilizada