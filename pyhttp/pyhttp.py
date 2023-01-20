from flask import Flask, request
import tensorflow as tf
import numpy as np
import random
import pickle
import json

model = tf.keras.models.load_model("../mnist.h5")
kmeans = pickle.load(open("../unsu.h5", "rb"))
(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
uny_train = y_train
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')

app = Flask(__name__)

@app.route('/predict', methods = ['POST'])
def predict():
    number = request.get_json()
    number = np.array(number)
    number = number.astype('float32')
    kres = kmeans.predict(number.reshape(1,-1) /255)
    number = number.reshape(1,28,28,1)

    res  = model.predict(number)
    argmax = np.argmax(res[0])
    cmax = max(res[0])
    #
    unsu_number = get_number(kres[0], labeled_clusters)
    un_max, un_all = get_acc(kres[0], labeled_clusters)
    unsu_acc = un_max / un_all
    return json.dumps({ "su_predicted": str(argmax), "su_confidence": str(cmax), "un_predicted":unsu_number, "un_confidence":unsu_acc })


@app.route('/image', methods = ['GET'])
def image():
    number = request.get_json()
    index = 0
    rand = random.randint(100,10000)-100
    while rand < len(y_test):
        if np.argmax(y_test[rand]) == int(number):
            index = rand
            break
        rand += 1

    jsonlist = x_test[index].tolist()
    return json.dumps(jsonlist)

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
    all_count = 0
    max_count = 0
    for i in range(10):
        if max_count < clusters[i].count(num):
            max_count = clusters[i].count(num)
        all_count += clusters[i].count(num)
    return max_count, all_count

def cluster_labels(labels_, y_labels):
    label = []
    for i in range(10):
        label.append([])
    j = 0
    for i in labels_:
        label[y_labels[j]].append(i)
        j+=1
    return label
labeled_clusters = cluster_labels(kmeans.labels_, uny_train)

if __name__ == "__main__":
    
    app.run(port=8000, ssl_context=('../Certificate/servercert.pem', '../Certificate/key.pem', '../Certificate/CA/cacert.pem'))