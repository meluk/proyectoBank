var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	librerias = mongoose.model('librerias');

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
	librerias.find({ '_id': peticion.query.id }, function(err, librerias)	//Busca el modelo dentro del MVC
	{
		if (err) return next(err);
		var mensaje;
		for (var i = librerias.length - 1; i >= 0; i--) {
			mensaje = librerias[i].nombre;
		};
		enviarCorreo(mensaje);
		//console.log(librerias);
		respuesta.render('compra', {	//vista
			titulo: 'Gracias Por Comprar',
			idProducto: peticion.query.id,
			librerias: librerias
		});
	});

});

