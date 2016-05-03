var express=require('express')
var path=require('path')
var app=express()
var alfa=express.Router()
var mysql=require('mysql');
var pythonshell=require('python-shell')
var port=process.env.PORT || 5000
var con=mysql.createConnection({

	host: "ec2-52-37-241-124.us-west-2.compute.amazonaws.com",
	user: "root",
	password: "password",
	database: "credit_data"
});

con.connect(function(err){
	if(err)
		throw err;
	else
		console.log("Connection established succesfully");
		});

app.use(express.static(__dirname+'/'))

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
 next();
});



// 25144400,2,2,360,1,2,1,59,1,2,1

app.use(express.static(__dirname+'/'))
alfa.get('/',function(req,res){

	res.sendFile(path.join(__dirname+'/pages/home.html'));
	 
});

alfa.get('/income=:u_income/purpose=:loan_purpose/coop=:coop/term_months=:term/state=:state/first=:first/gender=:gender/age=:age/units=:units/score=:score/prop_type=:prop_type',function(req,res){ 
	 
	var parameters=new Array()
	parameters.push(req.params.u_income)
	parameters.push(req.params.loan_purpose)
	parameters.push(req.params.coop)
	parameters.push(req.params.term)
	parameters.push(req.params.state)
	parameters.push(req.params.first)
	parameters.push(req.params.gender)
	parameters.push(req.params.age)
	parameters.push(req.params.units)
	parameters.push(req.params.score)
	parameters.push(req.params.prop_type)	

	var options = {
  args:  parameters
};
		
	pythonshell.run('scikitscripts/loan_approval_prediction.py',options,function(err,result){
		if(err) throw err;
		console.log(result)
		res.json(result) 
	})
	
}) 

alfa.get('/gender=:u_gender/age=:age/debt=:debt/Marital=:marital/edulevel=:edulevel/ethnicity=:ethnicity/employedyrs=:employedyrs/priorDefault=:priorDefault/employed=:employed/creditscore=:creditscore/license=:license/citizen=:citizen/zipCode=:zipCode/income=:income',function(req,res){ 
	 
	var parameters=new Array()
	parameters.push(req.params.u_gender)
	parameters.push(req.params.age)
	parameters.push(req.params.debt)
	parameters.push(req.params.marital)
	parameters.push(req.params.edulevel)
	parameters.push(req.params.ethnicity)
	parameters.push(req.params.employedyrs)
	parameters.push(req.params.priorDefault)
	parameters.push(req.params.employed)
	parameters.push(req.params.creditscore)
	parameters.push(req.params.license)	
	parameters.push(req.params.citizen)	
	parameters.push(req.params.zipCode)	
	parameters.push(req.params.income)	

	var options = {
  args:  parameters
};
		
	pythonshell.run('scikitscripts/credit_approval_prediction.py',options,function(err,result){
		if(err) throw err;
		console.log(result)
		res.json(result) 
	})
	
}) 


alfa.get('/pending_credit',function(req,res){
	//	con.connect(function(err){
	//	if(err)
	//		throw err;
	//	else
	//		console.log("Connection established succesfully")	
	//	});
	

	var statement="select * from Credit_Prediction_Uniq where Actual='PENDING'";
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(rows);
		}
	})
})


alfa.get('/pending_loan',function(req,res){
	//con.connect(function(err){
	//	if(err)
	//		throw err;
	//	else
	//		console.log("Connection established succesfully")	
	//	});
	

	var statement="select * from Bank_Prediction_Uniq Bank_Prediction_Uniq where Actual_Interest_rate='PENDING'";
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(rows);
		}
	})
})
  

alfa.put('/credit_approved_for=:uid',function(req,res){


	var statement="UPDATE Credit_Prediction_Uniq set Actual='APPROVED' where Uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json("Credit Approved for uid" + req.params.uid);
		}
	})
})

alfa.put('/credit_denied_for=:uid',function(req,res){


	var statement="UPDATE Credit_Prediction_Uniq set Actual='DENIED' where Uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(req.params.uid);
		}
	})
})


alfa.put('/loan_interest_accepted=:uid',function(req,res){


	var statement="update Bank_Prediction_Uniq set Actual_Interest_rate=prediction_int_rate where uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json("Credit Approved for uid" + req.params.uid);
		}
	})
})

alfa.put('/loan_interest_modified=:newrate/for_uid=:uid',function(req,res){


	var statement="UPDATE Bank_Prediction_Uniq set Actual_Interest_rate='"+ req.params.newrate +"' where Uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(req.params.uid);
		}
	})
})

alfa.get('/get_my_credit_application_details=:uid',function(req,res){
	var statement="select * from Credit_Prediction_Uniq where Uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(rows[0].Actual);
		}
	})
})
 

alfa.get('/get_my_loan_application_details=:uid',function(req,res){
	var statement="select * from Bank_Prediction_Uniq where Uid="+req.params.uid+";"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json("Your actual interest rate is "+ rows[0].Actual_Interest_rate+" And predicted value is: "+ rows[0].prediction_int_rate);
		}
	})
})

alfa.get('/loan_dash_statewide_count',function(req,res){

	var statement="select count(*) as applications,state_clean as state from Bank_Prediction_Uniq group by state_clean;"
	con.query(statement,function(err,rows){
		if(err) throw err;
		else{
			console.log("Data Retrieval Success");
			res.json(rows);
		}
	})

})

app.get('/approved',function(req,res){
        var statement="select count(*) as value from dummy_credit_predict where dummy='APPROVED'";
        con.query(statement,function(err,rows){
                if(err) throw err;
                else{
                        console.log("Data Retrieval Success");
                        res.json(rows);
                }
        })

})

app.get('/notapproved',function(req,res){
        var statement="select count(*) as value from dummy_credit_predict where dummy='NOT APPROVED'";
        con.query(statement,function(err,rows){
                if(err) throw err;
                else{
                        console.log("Data Retrieval Success");
                        res.json(rows);
                }
        })

})




app.use('/',alfa)
app.listen(port);
console.log('Go to the port : ' + port);
