var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

module.exports = function(app)
{
	app.use('/', router);
};

router.get('/takeFile', function(req, res)
{
	var time = new Date();

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraAtecion : time, estado: "atediendo",}}, {new: true}, function(err, doc){
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
	var time = new Date(),
	    tiempoVentanilla;

	    console.log('newDate : '+ time);
	    console.log('horas : '+ time.getTime());

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraFinal : time, estado: "finalizó",}}, {new: true}, function(err, doc){
	    if(err){
	        console.log(err);
	    }

	    console.log(doc.HoraAtecion);
	    console.log(doc.HoraFinal);
	    tiempoVentanilla = doc.HoraAtecion - doc.HoraFinal;
	    console.log('tardo: ' +tiempoVentanilla)

	});

	res.redirect('/customers');

});
