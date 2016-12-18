var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	cashiers = mongoose.model('cashiers'),
	customers = mongoose.model('customers');	//Invoca el modelo definido en el MVC Models

module.exports = function(app) {
	app.use('/', router);
};

router.get('/cashiers', function(req, res)
{
	res.render('loginCashier');
});

router.post('/loginCashier', function(req, res)
{
	var time = new Date(),
	    date = time.toISOString().slice(0,10);

	customers.find({ 'tipoVentanilla': req.body.tipoVentanilla, 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			//console.log(customers);
			res.render('listCustomer', {	//Hay un view que se llama Tienda
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});

    //console.log(fileCreated);

	//res.redirect('/customers');
	
});
