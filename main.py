import pandas as pd
import numpy as np
from sklearn import tree
from sklearn.neighbors import KNeighborsClassifier
from sklearn import datasets

data = pd.read_csv("Hoam_Loan_clean.csv",header = 0)

data_set = data[data.columns[0:11]]
target_set = data[data.columns[11]]

target = np.array(target_set).astype(int)

clf = tree.DecisionTreeClassifier()
clf = clf.fit(data_set,target)

print(clf.predict(data_set[0:50]))

 