var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

	var total,
	    fileCreated;

//-----------------------------------------FUNCIOTIONS------------------------------
  

//-----------------------------------------APP------------------------------
module.exports = function(app)
{
	app.use('/', router);
};

router.get('/newFile', function(req, res)
{
	res.render('newFile');
});

router.post('/newFile', function(req, res)
{
	var HoraInicio = new Date();

	customers.find({ 'tipoVentanilla': req.body.tipoVentanilla },function(err, resVentanillas)
		{
			var d = new Date();
			//console.log(resVentanillas.length);
			total = resVentanillas.length;
			//console.log(total);
			switch(req.body.tipoVentanilla) {
			    case 'cajas':
			        fileCreated = 'C'+ (total+1);
			        break;
			    case 'credito':
			        fileCreated = 'R'+ (total+1);
			        break;
			    default:
			        fileCreated = 'D'+ (total+1);
			}

			//ficha = 'C'+ total;
		    console.log(HoraInicio);

		    var nuevoRegistro = new customers({
			cedula : req.body.cedula,
		    tipoVentanilla : req.body.tipoVentanilla,
		    ficha : fileCreated,
		    HoraInicio : HoraInicio,
		    HoraAtecion : null,
		    HoraFinal : null,
		    tiempoVentanilla : null
			});

			nuevoRegistro.save();

			console.log(nuevoRegistro._id);
           
            //Resfresco la vista
			res.render('customers'),{
				customers: customers

			}

		});

    //console.log(fileCreated);

	res.redirect('/seeFile');
	
});


router.get('/seeFile', function(req, res, next)
{
	console.log('se' +fileCreated);
	
	
	customers.find(function(err, customers)	//Busca el modelo dentro del MVC
	{
		if (err) return next(err);
		//console.log(customers);
		res.render('seeFile', {	//Hay un view que se llama Tienda
			File: fileCreated,
			customers: customers
		});
	});

});