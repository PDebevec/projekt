import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras.layers import Dense, Flatten
from keras.layers import Conv2D, Dropout, MaxPooling2D

(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')

input_shape = (28, 28, 1)
batch = 128
epochs = 5
model = tf.keras.models.Sequential()
""" model.add(Conv2D(32, kernel_size=(5, 5), activation='relu', input_shape=input_shape))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(32, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dropout(0.2))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(32, activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(16, activation='relu'))
model.add(Dropout(0.4)) """
model.add(Conv2D(filters=64, kernel_size = (3,3), activation="relu", input_shape=input_shape))
model.add(Conv2D(filters=64, kernel_size = (3,3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(tf.keras.layers.BatchNormalization())

model.add(Conv2D(filters=128, kernel_size = (3,3), activation="relu"))
model.add(Conv2D(filters=128, kernel_size = (3,3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(tf.keras.layers.BatchNormalization())    

model.add(Conv2D(filters=256, kernel_size = (3,3), activation="relu"))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(tf.keras.layers.BatchNormalization())
    
model.add(Flatten())
model.add(Dense(512,activation="relu"))

model.add(Dense(10, activation='softmax'))

model.compile(#loss=keras.losses.MeanSquaredError(),
              loss=keras.losses.CategoricalCrossentropy(),
              optimizer=keras.optimizers.SGD(0.05),
              metrics=['accuracy'])
model.fit(x_train, y_train, shuffle=True, steps_per_epoch=250,
          batch_size=batch, epochs=epochs,
          validation_data=(x_test, y_test), validation_split=0.1,
          use_multiprocessing=True, workers=4)

score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

image = 9
res =  model.predict(x_test[image].reshape(1,28,28,1))
print("number ", np.argmax(y_test[image]))
print("predicted number: ", np.argmax(res[0]))
print("predicted confidence: ", max(res[0]))
model.save("mnist.h5")

"""
bestmodel = tf.keras.models.load_model("mnist.h5")
bestscore =  bestmodel.evaluate(x_test, y_test, verbose=0)
if bestscore[1] < score[1]:
    model.save("mnist.h5")
"""