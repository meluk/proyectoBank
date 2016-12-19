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

//El cajero tomo la ficha y cambiar el estado atendiendo
router.get('/takeFile', function(req, res)
{
	timeAttending = new Date();
	//console.log('a = ' +timeAttending);
	//console.log('a = ' +timeAttending.getTime());

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraAtecion : timeAttending, estado: "atediendo",}}, {new: true}, function(err, doc){
	    if(err){
	        console.log(err);
	    }
	    console.log('array'+ doc.ficha);
	    res.render('cahierAttending', {	//vista
			idProducto: req.query.id,
			customers: doc
		});
	});

});

//Cambiamos el estado del cliente y saca el tiempo en la ventanilla
router.get('/finish', function(req, res)
{
	    timefinish = new Date();
	    tiempoVentanilla =  timefinish - timeAttending;

	customers.findByIdAndUpdate(req.query.id, {$set:{HoraFinal : timefinish, estado: "finalizó", tiempoVentanilla : tiempoVentanilla}}, {new: true}, function(err, doc){
	    if(err){
	        console.log(err);
	    }
	     
	     tiempoVentanilla = tiempoVentanilla / 1000;
	     res.redirect('/'+ doc.tipoVentanilla);

	});

});
