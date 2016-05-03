
import sys
 
# Get the total number of args passed to the demo.py
total = len(sys.argv)
 
# Get the arguments list 
cmdargs = str(sys.argv)

myprediction = list()

for i in range(total):
	myprediction.append(sys.argv[i])
 
myprediction.pop(0)

for j in myprediction:
	print(j.rstrip())

# print(myprediction)
 
