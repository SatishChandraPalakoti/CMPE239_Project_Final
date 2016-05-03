import MySQLdb


db = MySQLdb.connect("ec2-52-37-241-124.us-west-2.compute.amazonaws.com","root","password","credit_data" )


# prepare a cursor object using cursor() method
cursor = db.cursor()

# execute SQL query using execute() method.
cursor.execute("SELECT * FROM Bank")

# Fetch a single row using fetchone() method.
data = cursor.fetchone()

print(data)

# disconnect from server
db.close()


