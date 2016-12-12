var mongoose = require('mongoose'),
	Schema = mongoose.Schema; //Interactuar con el esquema de la base de datos

var cashiers = new Schema({
	usuario : String,
    contraseña : String,
    tipoVentanilla : String
}, {collection: 'cashiers'}); //collection: nombre de la tabla en robomongo.

mongoose.model('cashiers', cashiers); //Exporta la coleccion para poder ser utilizada