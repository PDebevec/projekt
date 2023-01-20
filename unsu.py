import tensorflow as tf
import numpy as np
#import sklearn as sk
from sklearn.cluster import MiniBatchKMeans, DBSCAN, OPTICS, Birch
from sklearn.metrics import homogeneity_score#, accuracy_score
#from sklearn import metrics
import pickle

(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
#y_train = tf.keras.utils.to_categorical(y_train, 10)
#y_test = tf.keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32') /255
x_test = x_test.astype('float32') /255
x_train = x_train.reshape(len(x_train),-1)
x_test = x_test.reshape(len(x_test),-1)

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

""" def calc_acc(test, labeled_clusters):
    i = 0
    acc = 0
    while i < len(test):
        if y_test[i] == get_number(test[i], labeled_clusters):
            acc += 5
        i += 5
    return acc / len(test) """

clusters = 768
iter = 128
batchsize = 2048
kmeans = MiniBatchKMeans(n_clusters=clusters, init="k-means++",# random_state=np.random.RandomState(),
                         max_iter=iter, batch_size=batchsize,
                         verbose=1, max_no_improvement=10, n_init=5)

#kmeans = pickle.load(open("unsu.h5", "rb"))

kmeans.fit(x_train)

res = kmeans.predict(x_test)
labeled_clusters = cluster_labels(kmeans.labels_, y_train, 10)

print("inertia: ", kmeans.inertia_)
print("homogenity: ", homogeneity_score(y_train, kmeans.labels_))
print(y_test[0], get_number(res[0], labeled_clusters), get_acc(res[0], labeled_clusters))
#print("acc: ", calc_acc(res, labeled_clusters))
""" i = 0
while i < 10000:
    if y_test[i] == get_number(res[i], labeled_clusters):
        print(y_test[i], get_number(res[i], labeled_clusters), get_acc(res[i], labeled_clusters))
    i+=150 """

pickle.dump(kmeans, open("unsu.h5", "wb"))