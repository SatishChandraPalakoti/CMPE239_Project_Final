from pandas import DataFrame
import MySQLdb

db = MySQLdb.connect(host="ec2-52-37-241-124.us-west-2.compute.amazonaws.com",    # your host, usually localhost
                     user="root",         # your username
                     passwd="password",  # your password
                     db="credit_data")        # name of the data base

# you must create a Cursor object. It will let
#  you execute all the queries you need
cur = db.cursor()

# Use all the SQL you like
cur.execute("insert into credit_data.dummy_credit_predict (dummy) values ('APPROVED')")

#df = DataFrame(cur.fetchall())
# print all the first cell of all the rows
#for row in cur.fetchall():
 #   for x in range(len(row)):
  #      print(row[x])
   # print("**********************")
db.close()
