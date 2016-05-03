# import pyodbc
# import pandas.io.sql as psql

# cnxn = pyodbc.connect(connection_info) 
# cursor = cnxn.cursor()
# sql = "SELECT * FROM TABLE"

# df = psql.frame_query(sql, cnxn)
# cnxn.close()

import pyodbc
cnxn=pyodbc.connect("DRIVER={SQLDriverConnect};SOCKET=/var/lib/mysql/mysql.sock; SERVER=ec2-52-37-241-124.us-west-2.compute.amazonaws.com;PORT=3306;DATABASE=credit_data;UID=root;PASSWORD=password")
cursor=cnxn.connect()

query_str="SELECT * FROM Bank"
rows=dBase.execute(query_str)

for rw in rows:
	print(rw)