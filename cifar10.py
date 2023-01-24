import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras.layers import Dense, Conv2D, MaxPooling2D, Flatten, Reshape, BatchNormalization, InputLayer

(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32') /255
x_test = x_test.astype('float32') /255

model = tf.keras.models.Sequential([
    InputLayer(input_shape=x_train[0].shape)
    ,Conv2D(filters=512, kernel_size=(3,3), activation='relu')
    ,Conv2D(filters=128, kernel_size=(3,3), activation='relu')
    ,BatchNormalization()
    ,Conv2D(filters=64, kernel_size=(3,3), activation='relu')
    ,Conv2D(filters=32, kernel_size=(3,3), activation='relu')
    ,MaxPooling2D(pool_size=(2,2))
    ,BatchNormalization()
    ,Flatten()
    ,Dense(10, activation="softmax")
])

model.compile(loss=keras.losses.CategoricalCrossentropy(),
              optimizer=keras.optimizers.SGD(0.05),
              metrics=['accuracy'])

model.fit(x_train, y_train, shuffle=True, steps_per_epoch=300,
          batch_size=64, epochs=1,
          validation_data=(x_test, y_test), validation_split=0.05,
          use_multiprocessing=True, workers=4)

res = model.predict(x_test)

print(res[0], y_test[0])