var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	cashiers = mongoose.model('cashiers'),
	customers = mongoose.model('customers');	//Invoca el modelo definido en el MVC Models

var time = new Date(),
	date = time.toISOString().slice(0,10);

module.exports = function(app) {
	app.use('/', router);
};

router.get('/cashiers', function(req, res)
{
	res.render('loginCashier');
});

router.post('/loginCashier', function(req, res)
{

	customers.find({ 'tipoVentanilla': req.body.tipoVentanilla, 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
	
});

router.get('/cajas', function(req, res)
{

	customers.find({ 'tipoVentanilla': 'cajas', 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
});

router.get('/plataforma', function(req, res)
{

	customers.find({ 'tipoVentanilla': 'plataforma', 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
});

router.get('/credito', function(req, res)
{

	customers.find({ 'tipoVentanilla': 'credito', 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
});

router.get('/marchamo', function(req, res)
{

	customers.find({ 'tipoVentanilla': 'marchamo', 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
});

router.get('/preferenciales', function(req, res)
{

	customers.find({ 'tipoVentanilla': 'preferenciales', 'fecha' : date, estado : 'esperando'},function(err, resVentanillas)
		{
			if (err) return next(err);
			res.render('listCustomer', {	
				titulo: 'lista de customers',
				customers: resVentanillas
			});
			
		});
});
