from flask import Flask, request
import tensorflow as tf
import numpy as np
import random
import json

model = tf.keras.models.load_model("../mnist.h5")
(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
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
    number = number.reshape(1,28,28,1)

    res  = model.predict(number)
    argmax = np.argmax(res[0])
    cmax = max(res[0])
    return json.dumps({ "predicted_number": str(argmax), "predicted_confidence": str(cmax) })

@app.route('/image', methods = ['GET'])
def image():
    number = request.get_json()
    index = 0
    rand = random.randint(1000,10000)-1000
    while rand < len(y_test):
        if np.argmax(y_test[rand]) == int(number):
            index = rand
            break
        rand += 1

    jsonlist = x_test[index].tolist()
    return json.dumps(jsonlist)


if __name__ == "__main__":
    app.run(port=8000)