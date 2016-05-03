import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn import datasets
import sys

total = len(sys.argv)

cmdargs = str(sys.argv)

myprediction = list()

for i in range(1,total):
        myprediction.append(float(sys.argv[i]))


data = pd.read_csv("Credit_clean.csv",header = 0)

data_set = data[data.columns[0:14]]

target_set = data[data.columns[14]]

target = np.array(target_set).astype(int)

clf = DecisionTreeClassifier()

clf = clf.fit(data_set,target_set)

X=myprediction

Y=np.array(X).reshape((1,-1))

predict=clf.predict(Y)

print(predict)