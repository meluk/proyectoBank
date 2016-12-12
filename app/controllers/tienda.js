var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	librerias = mongoose.model('librerias');	//Invoca el modelo definido en el MVC Models

module.exports = function(app) {
	app.use('/', router);
};

router.get('/tienda', function(req, res, next)
{

	librerias.find(function(err, librerias)	//Busca el modelo dentro del MVC
	{
		if (err) return next(err);
		//console.log(librerias);
		res.render('tienda', {	//Hay un view que se llama Tienda
			titulo: 'Tienda de librerias',
			librerias: librerias
		});
	});

});