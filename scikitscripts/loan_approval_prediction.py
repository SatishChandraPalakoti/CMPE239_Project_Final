import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeRegressor
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

query="INSERT INTO  Bank_Prediction ( income , loan_purpose , coop_unit , trem_months , state_clean , first_hoam_loan , gender , age , num_units , credit_score , prop_typ , int_rate )VALUES("

for i in range(1,total):
        myprediction.append(int(sys.argv[i]))
        query+=str(sys.argv[i])+","

data = pd.read_csv("Hoam_Loan_clean.csv",header = 0)

data_set = data[data.columns[0:11]]

target_set = data[data.columns[11]]

target = np.array(target_set).astype(int)

clf = DecisionTreeRegressor()

clf = clf.fit(data_set,target_set)

X=myprediction

Y=np.array(X).reshape((1,-1))

predict=clf.predict(Y)

print(predict)

query+=str(predict[len(predict)-1])
query+=");"
#print(query)

cur.execute(query);
db.commit()
db.close()
