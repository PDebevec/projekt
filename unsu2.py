import tensorflow as tf
import numpy as np
#import sklearn as sk
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import homogeneity_score#, accuracy_score
#from sklearn import metrics
import pickle

(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
#y_train = tf.keras.utils.to_categorical(y_train, 10)
#y_test = tf.keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32') /255
x_test = x_test.astype('float32') /255
x_train = x_train.reshape(60000, 784)
x_test = x_test.reshape(10000, 784)
print(x_test.shape)

def cluster_labels(labels_, y_labels, numlabels):
    label = []
    for i in range(numlabels):
        label.append([])
    j = 0
    for i in labels_:
        label[y_labels[j]].append(i)
        j+=1
    return label

def get_number(num, clusters):
    pred = 0
    count = 0
    j = 0
    for i in clusters:
        if count < i.count(num):
            pred = j
            count = i.count(num)
        j+=1
    return pred

def get_acc(num, clusters):
    all_count = 0#{i:clusters[i].count(num) for i in range(10)}
    max_count = 0
    for i in range(10):
        if max_count < clusters[i].count(num):
            max_count = clusters[i].count(num)
        all_count += clusters[i].count(num)
    return max_count, all_count


model = AgglomerativeClustering()

predict = model.fit_predict(x_train[:1000, :])

print(predict)