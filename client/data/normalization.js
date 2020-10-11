import * as tf from '@tensorflow/tfjs'

export function determineMeanAndStddev(data) {
  const dataMean = data.mean(0);
  const diffFromMean = data.sub(dataMean);
  const squaredDiffFromMean = diffFromMean.square();
  const variance = squaredDiffFromMean.mean(0);
  const dataStd = variance.sqrt();
  return {dataMean, dataStd};
}

export function normalizeTensor(data, dataMean, dataStd) {
  return data.sub(dataMean).div(dataStd);
}
export function arraysToTensors(data) {
  const tensors = {}
  tensors.rawTrainFeatures = tf.tensor2d(data.train_features)
  tensors.trainTarget = tf.tensor2d(data.train_target)
  tensors.rawTestFeatures = tf.tensor2d(data.test_features)
  tensors.testTarget = tf.tensor2d(data.test_target)
  const {dataMean, dataStd} = determineMeanAndStddev(tensors.rawTrainFeatures)
  tensors.trainFeatures = normalizeTensor(tensors.rawTrainFeatures, dataMean, dataStd)
  tensors.testFeatures = normalizeTensor(tensors.rawTestFeatures, dataMean, dataStd)
  tensors.numFeatures = data.train_features[0].length
  return tensors
}