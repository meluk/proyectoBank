var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	cashiers = mongoose.model('cashiers');	//Invoca el modelo definido en el MVC Models

module.exports = function(app) {
	app.use('/', router);
};

router.get('/cashiers', function(req, res, next)
{

	cashiers.find({ 'tipoVentanilla': req.body.tipoVentanilla },function(err, resVentanillas)	//Busca el modelo dentro del MVC
	{
		if (err) return next(err);
		//console.log(cashiers);
		res.render('loginCashier', {	//nombre de la vista
			titulo: 'lista de Cajeros',
			cashiers: cashiers
		});
	});

});