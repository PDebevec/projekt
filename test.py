import tensorflow as tf
import numpy as np
import json
import math

model = tf.keras.models.load_model("mnist.h5")
f = open('json.json')
number = json.load(f)
f.close()
number = np.array(number)
number = number.astype('float32')
number = number.reshape(1,28,28,1)

res  = model.predict(number)
i = 0
while i < len(res[0]):
    print(i, " ",  res[0][i])
    i += 1

argmax = np.argmax(res[0])
max = max(res[0])
print("redicted number: ", argmax)
print("predicted confidence: ", max)
