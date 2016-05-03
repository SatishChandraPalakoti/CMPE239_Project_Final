var PythonShell = require('python-shell');
var express=require('express')
var path=require('path')
var app=express()
var alfa=express.Router()
var port=process.env.PORT || 8080
 
app.use(express.static(__dirname+'/'))

alfa.get('/',function(req,res){
	PythonShell.run('main.py', function (err, results) {
  			if (err) throw err; 
				res.json(results);
								});
})

app.use('/',alfa);
app.listen(port);
console.log("Go to port "+ port)