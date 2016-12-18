var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	customers = mongoose.model('customers');

var promedio,
    time= new Date();
	date = time.toISOString().slice(0,10);

function Buscar(array){
	for (var i = array.length - 1; i >= 0; i--) {
		console.log(array[i]._id);
		console.log(date);
		if (array[i]._id === date) {
			console.log('solobuscar  '+array[i]._id);
			customers.find({ 'fecha': array[i]._id, 'tiempoVentanilla' : array[i].maxQuantity },function(err, resVentanillas)
			{
				if (err) return next(err);
			    console.log(customers);
			    promedio = result;
				
			});
		};
	};
}

module.exports = function(app)
{
	app.use('/', router);
};

router.get('/report', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$tipoVentanilla",
	           avgQuantity: { $avg: "$tiempoVentanilla" }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);
	   	console.log(result[1]);
	   	promedio = result;
       }
	);
    //promedio = customers;
    
   // console.log(customers);
    res.render('report', {	//Hay un view que se llama Tienda
		titulo: 'lista de customers',
		customers: promedio
	});
});

router.get('/report2', function(req, res)
{
	customers.aggregate
	(
	   [
	     {
	       $group:
	         {
	           _id: "$fecha",
	           maxQuantity: { $max: "$tiempoVentanilla" }
	         }
	     }
	   ],
	   function(err,result) {
	   	if (err) return next(err);
	   	console.log(result);
	   	promedio = result;
	   	Buscar(promedio);
       }
	);
    //promedio = customers;
    
   // console.log(customers);
    	
	res.render('report', {	//Hay un view que se llama Tienda
		customers: promedio
	});
});

