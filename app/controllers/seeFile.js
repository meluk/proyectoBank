var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');	//Invoca el modelo definido en el MVC Models

module.exports = function(app) {
	app.use('/', router);
};

router.get('/seeFile2', function(req, res, next)
{

	customers.find(function(err, customers)	//Busca el modelo dentro del MVC
	{
		if (err) return next(err);
		//console.log(customers);
		res.render('seeFile2', {	//Hay un view que se llama Tienda
			titulo: 'Su Ficha',
			customers: customers
		});
	});

});