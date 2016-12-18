var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

	var total,
	    ventanilla,
	    timeInit,
	    date,
	    ticketCreated;


module.exports = function(app)
{
	app.use('/', router);
};

router.get('/newTicket', function(req, res)
{
	res.render('newTicket');
});

router.post('/newTicket', function(req, res)
{
	    timeInit = new Date();
	    date = timeInit.toISOString().slice(0,10);

	customers.find({ 'tipoVentanilla': req.body.tipoVentanilla, 'fecha' : date},function(err, resVentanillas)
		{
			
			//console.log(date);
			ventanilla = req.body.tipoVentanilla;
			total = resVentanillas.length;
			console.log(total);
			switch(req.body.tipoVentanilla) {
			    case 'cajas':
			        ticketCreated = 'C'+ (total+1);
			        break;
			    case 'plataforma':
			        ticketCreated = 'P'+ (total+1);
			        break;
			    case 'credito':
			        ticketCreated = 'R'+ (total+1);
			        break;
			    case 'marchamo':
			        ticketCreated = 'M'+ (total+1);
			        break;
			    default:
			        ticketCreated = 'D'+ (total+1);
			}

		    var nuevoRegistro = new customers({
			cedula : req.body.cedula,
		    tipoVentanilla : req.body.tipoVentanilla,
		    estado: "esperando",
		    ficha : ticketCreated,
		    fecha : date,
		    HoraInicio : timeInit,
		    HoraAtecion : null,
		    HoraFinal : null,
		    tiempoVentanilla : null
			});

			nuevoRegistro.save();

			//console.log(nuevoRegistro._id);
           
            //Resfresco la vista
			res.render('customers'),{
				customers: customers

			}

		});

    //console.log(ticketCreated);

	res.redirect('/seeTicket');
	
});


router.get('/seeTicket', function(req, res, next)
{
	console.log('se' +ventanilla);
	res.render('seeTicket', {	//nombre de la vista
		File: ticketCreated
	});
});

router.get('/takeTicket', function(req, res)
{
	customers.find({'estado' : 'atediendo'},function(err, resCustomers)
		{
			if (err) return next(err);
			console.log(resCustomers);
			res.render('listCustomer', {	//Hay un view que se llama Tienda
				titulo: 'lista de customers',
				customers: resCustomers
			});
			
		});
});