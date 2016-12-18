var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

var time = new Date(),
	date = time.toISOString().slice(0,10),
	totaArray;

// Funcion que devuelve el tiempo transcurrido en dias, horas, minutos y segundos
// Tiene que recibir los milisegundos
function returnTime(time)
{
    // obtenemos los segundos
    var time = time / 1000;
 
    var result="";
    if(time<60)
    {
        // unicamente mostraremos los segundos
        result=Math.round(time)+" segundos";
    }else{
        // cogemos la parte entera de los segundos
        var seconds = Math.round(time % 60);
 
        // restamos los segundos que hemos cogido
        time = Math.floor(time / 60);
 
        // cogemos los minutos
        var minutes = Math.round(time % 60);
 
        // restamos los minutos que hemos cogido
        time = Math.floor(time / 60);
 
        // cogemos las horas
        var hours = Math.round(time % 24);
 
        // restamos las horas que hemos cogido
        time = Math.floor(time / 24);
 
        // el resto, son dias
        var days = time;
 
        if(days>0)
        {
            result=days+" dias, "+hours+" horas, "+minutes+" minutos y "+seconds+" segundos";
        }else if(hours>0){
            result=hours+" horas, "+minutes+" minutos y "+seconds+" segundos";
        }else{
            result=minutes+" minutos y "+seconds+" segundos";
        }
    }
    return result;
}

//----------------------- app ------------

module.exports = function(app)
{
	app.use('/', router);
};

//Reporte Timepo Aproximado que tarda cada ventanilla
router.get('/report', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$tipoVentanilla",
	           Quantity: { $avg: "$tiempoVentanilla" }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);

	   	var ReportTimeWindow = new Array();

	   	for (var i = result.length - 1; i >= 0; i--) {
	   		var newTime = returnTime(result[i].Quantity);
	   		console.log(newTime);
	   		var array= {
	   			"_id" :  result[i]._id,
	   			"Quantity" : newTime
	   		};
	   		ReportTimeWindow.push(array)
	   		
	   	};

	   	res.render('report', {	
			numDato: 'Timepo',
			tituloDato: 'Ventanilla',
			titulo: 'Medida de Tiempo por Ventanilla',
			customers: ReportTimeWindow
		});
       }
	);
});

//Reporte cliente que dura mas por día
router.get('/report2', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$fecha",
	           Quantity: { $max: "$tiempoVentanilla" }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);
	   	console.log(result);

	   	var ReportTimeWindow = new Array();

        //Camobio los milisegundos a segundor/minutos/horas
	   	for (var i = result.length - 1; i >= 0; i--) {
	   		var newTime = returnTime(result[i].Quantity);

		   		var array= {
		   			"_id" :  result[i]._id,
		   			"Quantity" : newTime
		   		};
		   		ReportTimeWindow.push(array)
	   		
	   	};

	   	res.render('report', {	//vista
			customers: ReportTimeWindow,
			titulo: 'Cliente tardo más',
			numDato: 'Tiempo cliente',
			tituloDato: 'Fecha',
		});
       }
	);
});

//Reporte cliente que dura mas por día
router.get('/report3', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$fecha",
	           Quantity: { $min: "$tiempoVentanilla" }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);
	   	console.log(result);

	   	var ReportTimeWindow = new Array();

        //Camobio los milisegundos a segundor/minutos/horas
	   	for (var i = result.length - 1; i >= 0; i--) {
	   		var newTime = returnTime(result[i].Quantity);

		   		var array= {
		   			"_id" :  result[i]._id,
		   			"Quantity" : newTime
		   		};
		   		ReportTimeWindow.push(array)
	   		
	   	};

	   	res.render('report', {	//vista
			customers: ReportTimeWindow,
			titulo: 'Cliente tardo menos',
			numDato: 'Tiempo cliente',
			tituloDato: 'Fecha',
		});
       }
	);
});

//Reporte Cantidada de Clientes
router.get('/reportCountCoustemers', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$fecha",
	           Quantity: { $sum: 1 }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);
	   	res.render('report', {	
			numDato: 'Total Clientes',
			tituloDato: 'Fecha',
			titulo: 'Total de Clientes por Fecha',
			customers: result
		});
       }
	);
	       
});

//Reporte Cantidada de Clientes por Ventanilla
router.get('/reportCountWindows', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$tipoVentanilla",
	           Quantity: { $sum: 1 }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);

	   	console.log(result);
	   	res.render('report', {	
			numDato: 'total Clientes',
			tituloDato: 'Ventanilla',
			titulo: 'Total de Clientes por ventanilla',
			customers: result
		});
       }
	);
	       
});