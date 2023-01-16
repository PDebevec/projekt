from tensorflow import keras
import numpy as np
import sys
import json
import random

(x_train, y_train), (x_test, y_test) =  keras.datasets.mnist.load_data()
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')

number = int(sys.argv[1])
index = 0

rand = random.randint(1000,10000)-1000
while rand < len(y_test):
    if np.argmax(y_test[rand]) == number:
        index = rand
        break
    rand += 1

jsonlist = x_test[index].tolist()
jsonstring = json.dumps(jsonlist)
jsonfile = open("mnist.json", "w")
jsonfile.write(jsonstring)
jsonfile.close()