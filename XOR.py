import numpy as np
from PIL import ImageGrab, Image
import tensorflow as tf
from tensorflow import keras
tf.compat.v1.disable_v2_behavior()

X = [[0, 0], [0, 1], [1, 0], [1, 1]]
Y = [[0], [1], [1], [0]]

x = tf.constant([0, 0, 0, 1, 1, 0, 1, 1], dtype=tf.float32, shape=[4,2])
y = tf.constant([0, 1, 1, 0], dtype=tf.float32, shape=[4,1])

W1 = tf.Variable([[1.0, 0.0], [1.0, 0.0]], shape=[2,2])
W2 = tf.Variable([[0.0], [1.0]], shape=[2,1])

B1 = tf.Variable([0.0, 0.0], shape=[2])
B2 = tf.Variable([0.0], shape=1)

output =tf.sigmoid(tf.matmul(tf.sigmoid(tf.matmul(x, W1) + B1), W2) + B2)

e = tf.reduce_mean(tf.math.squared_difference(y, output))

train = tf.compat.v1.train.GradientDescentOptimizer(0.1).minimize(e)

init = tf.compat.v1.global_variables_initializer()
sess = tf.compat.v1.Session()
sess.run(init)
for i in range (50001):
    error = sess.run(train, feed_dict={x: X, y: Y})
    if i % 10000 == 0:
        print('\nEpoch: ' + str(i))
        print('\nError: ' + str(sess.run(e, feed_dict={x: X, y: Y})))
        for el in sess.run(output, feed_dict={x: X, y: Y}):
            print('    ',el)

sess.close()