import numpy as np
import tensorflow as tf
from tensorflow import keras
from keras.layers import Reshape, Conv2D, MaxPooling2D, Conv2DTranspose

(x_train, y_train), (x_test, y_test) =  tf.keras.datasets.mnist.load_data()
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)
x_train = x_train.astype('float32')
x_test = x_test.astype('float32')

def rounded_accuracy(y_true, y_pred):
    return keras.metrics.binary_accuracy(tf.round(y_true), tf.round(y_pred))

keras_encode = tf.keras.models.Sequential([
    Conv2D(filters=16, kernel_size=3, activation="relu", input_shape=(28,28,1)),
    MaxPooling2D(pool_size=2),
    Conv2D(filters=32, kernel_size=3, activation="relu"),
    MaxPooling2D(pool_size=2),
    Conv2D(filters=64, kernel_size=3, activation="relu"),
    MaxPooling2D(pool_size=2)
])

keras_decode = tf.keras.models.Sequential([
    Conv2DTranspose(32, kernel_size=3, strides=2, activation='relu', input_shape=(3,3,64)),
    Conv2DTranspose(16, kernel_size=3, strides=2, activation='relu'),
    Conv2DTranspose(1, kernel_size=3, strides=2, activation='sigmoid'),
    Reshape((28,28))
])

keras_ed = tf.keras.models.Sequential([keras_encode, keras_decode])

keras_ed.compile(loss='binary_crossentropy', optimizer=keras.optimizers.SGD(0.5))

model = keras_ed.fit(x_train, x_test, epochs=5,
                     validation_data=[x_train, x_test],
                     metrics=[rounded_accuracy])

print(model)