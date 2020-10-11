import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
const NUM_EPOCHS = 200
const BATCH_SIZE = 40
const LEARNING_RATE = 0.01
export function linearRegressionModel(num) {
    const model = tf.sequential()
    model.add(tf.layers.dense({inputShape: [num], units: 1}))
    model.summary()
    return model
}
export function multiLayerPerceptronRegressionModel1Hidden(num) {
    const model = tf.sequential()
    model.add(tf.layers.dense({
      inputShape: [num],
      units: 50,
      activation: 'sigmoid',
      kernelInitializer: 'leCunNormal'
    }));
    model.add(tf.layers.dense({units: 1}))
  
    model.summary()
    return model
}
export function multiLayerPerceptronRegressionModel2Hidden(num) {
    const model = tf.sequential()
    model.add(tf.layers.dense({
      inputShape: [num],
      units: 50,
      activation: 'sigmoid',
      kernelInitializer: 'leCunNormal'
    }));
    model.add(tf.layers.dense(
        {units: 50, activation: 'sigmoid', kernelInitializer: 'leCunNormal'}))
    model.add(tf.layers.dense({units: 1}))
  
    model.summary()
    return model
}
export function computeBaseline(tensors) {
    const avg = tensors.trainTarget.mean()
    console.log(`Average: ${avg.dataSync()}`)
    const baseline = tensors.testTarget.sub(avg).square().mean()
    console.log(`Baseline loss: ${baseline.dataSync()}`)
    return [avg.dataSync(), baseline.dataSync()[0].toFixed(2)]
}
export async function run(model, tensors, container) {
    model.compile({optimizer: tf.train.sgd(LEARNING_RATE), loss: 'meanSquaredError'})
    const trainLogs = []
    await model.fit(tensors.trainFeatures, tensors.trainTarget, {
        batchSize: BATCH_SIZE,
        epochs: NUM_EPOCHS,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                trainLogs.push(logs)
                tfvis.show.history(container, trainLogs, ['loss', 'val_loss'])
            }
        }
    })
    const result = model.evaluate(
        tensors.testFeatures, tensors.testTarget, {batchSize: BATCH_SIZE});
    const testLoss = result.dataSync()[0];
    console.log(trainLogs)
    const trainLoss = trainLogs[trainLogs.length - 1].loss;
    const valLoss = trainLogs[trainLogs.length - 1].val_loss;
    return {trainLoss, valLoss, testLoss}
}