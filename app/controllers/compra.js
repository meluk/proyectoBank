var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

//para nodemailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://ladoservidor2016%40gmail.com:ladosrv2016@smtp.gmail.com');
 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function enviarCorreo(mensaje)
{
	// setup e-mail data with unicode symbols 
	var mailOptions = {
	    from: '"Melissa Laboratorio 👥" <ladoservidor2016@gmail.com>', // sender address 
	    to: 'gchavarria@ucenfotec.ac.cr', // correo destinado
	    subject: 'Compra Laboratorio ✔',  
	    text: mensaje, 
	    html: '<h1>Compra exito de la Libreria!'+ ' ' + mensaje + '</h1>'  
	};

	// send mail with defined transport object 
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}

module.exports = function(app)
{
	app.use('/', router);
};

router.get('/compra', function(peticion, respuesta)
{
	customers.find({ '_id': peticion.query.id }, function(err, user)	//Busca el modelo dentro del MVC
	{
		var mensaje;

		if (err) return next(err);
		console.log()
		
		for (var i = user.length - 1; i >= 0; i--) {
			console.log(mensaje)
			mensaje = user[i].ficha;
		};
		//enviarCorreo(mensaje);
		;
		respuesta.render('compra', {	//vista
			titulo: 'Gracias Por Comprar',
			idProducto: peticion.query.id,
			customers: customers
		});
	});

});

