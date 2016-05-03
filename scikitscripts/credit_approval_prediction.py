import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn import datasets
import sys
import MySQLdb

db = MySQLdb.connect(host="ec2-52-37-241-124.us-west-2.compute.amazonaws.com",    # your host, usually localhost
                     user="root",         # your username
                     passwd="password",  # your password
                     db="credit_data")        # name of the data base

# you must create a Cursor object. It will let
#  you execute all the queries you need
cur = db.cursor()

# Use all the SQL you like


total = len(sys.argv)

cmdargs = str(sys.argv)

myprediction = list()

#for i in range(1,total):
 #       myprediction.append(int(sys.argv[i]))

query="INSERT INTO credit_predict (`Male` ,`Age` ,`Debt` ,`Married` ,`EducationLevel` ,`Ethnicity` ,`YearsEmployed` ,`PriorDefault` ,`Employed`,`CreditScore` ,`DriversLicense` ,`Citizen` ,`ZipCode` ,`Income` ,`Prediction` ) VALUES( "

for i in range(1,total):
	myprediction.append(int(sys.argv[i]))
	query+=str(sys.argv[i])+","
#print(query+");")

data = pd.read_csv("Credit_clean.csv",header = 0)

data_set = data[data.columns[0:14]]

target_set = data[data.columns[14]]

target = np.array(target_set).astype(int)

clf = DecisionTreeClassifier()

clf = clf.fit(data_set,target_set)

X=myprediction

Y=np.array(X).reshape((1,-1))

predict=clf.predict(Y)

if(predict[len(predict)-1]==1):
    print("YES")
else:
    print("NO")

query+=str(predict[len(predict)-1])
query+=");"
#print(query)

cur.execute(query);
db.commit()
db.close()
