var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

var timeAttending,
    timefinish;

module.exports = function(app)
{
	app.use('/', router);
};

router.get('/takeFile', function(req, res)
{
	timeAttending = new Date();
	console.log('a = ' +timeAttending);
	console.log('a = ' +timeAttending.getTime());

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraAtecion : timeAttending, estado: "atediendo",}}, {new: true}, function(err, doc){
	    if(err){
	        console.log(err);
	    }
	    console.log(doc);
	    res.render('attendingCustomer', {	//vista
			idProducto: req.query.id,
			customer: doc
		});
	});

});

router.get('/finish', function(req, res)
{
	    timefinish = new Date();
	    console.log('b = ' +timefinish);
	    console.log('b = ' +timefinish.getTime());

	    tiempoVentanilla =  timefinish - timeAttending;

	    //console.log('tiempo = ' +tiempoVentanilla);

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraFinal : timefinish, estado: "finalizó", tiempoVentanilla : tiempoVentanilla}}, {new: true}, function(err, doc){
	    if(err){
	        console.log(err);
	    }
	     console.log(doc);
	     tiempoVentanilla = tiempoVentanilla / 1000;
	    console.log('tardo: ' +tiempoVentanilla)

	});

	res.redirect('/customers');

});
