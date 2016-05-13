# FinCal

Application: Simulation real-time predictive analytics on banking loan applications.

The project was built and deployed in Amazon AWS instance.
The core components of the projects include the following:
	a. User Interface for Data Input.
	b. NodeJS for RESTful web services.
	c. Python Sci-kit machine learning module.
	d. Visual Analytics.
 
A. User Interface for Data Input:
	The user of the application is provided with the web application interface. The web application is hosted on Amazon AWS instances.

	Techical info:
	**************
		The web application is hosted by the node server. The interface was built using traditional web developing tools like HTML5,CSS3, JQuery and BootStrap to beautify.
		


B. NodeJS for RESTful web services.

	The application is hosted by a nodeJS server that is deployed in Amazon AWS cloud. 
	The feature of a npm module of node to run a python shell, is the core component of the entire applicaiton. 

C. Python Sci-kit :

	The scentific programming language python provided machine learning library is internally called for every REST calls invoked by the user from the front-end(web application) and the prediction is performed.

	The algorithms used were:
		a. Naive Bayes.
		b. Random-Forest. 

	The predictions performed by the Scikit module are redirected to the Amazon EC2 instance hosted MySQL database.

D. Visual Analytics:

	The applicaiton uses canvasJS and Tableau to visualise the predictive analytics. 

	

Technologies Used:
******************
 AWS-Amazon, NodeJS, ExpressJS, HTML5, BootStrap, CSS3, JQuery, Python-Scikit.

