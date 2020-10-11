import {loadCsv, shuffle} from './lib'
import {arraysToTensors} from './normalization'
const TRAIN_FEATURES_FN = 'train-data.csv';
const TRAIN_TARGET_FN = 'train-target.csv';
const TEST_FEATURES_FN = 'test-data.csv';
const TEST_TARGET_FN = 'test-target.csv';
let data = undefined
export const getData = () =>{
    if (data){
        return Promise.resolve(data)
    }
    return Promise.all([
        loadCsv(TRAIN_FEATURES_FN), loadCsv(TRAIN_TARGET_FN),
        loadCsv(TEST_FEATURES_FN), loadCsv(TEST_TARGET_FN)
      ]).then(([train_features, train_target, test_features, test_target])=>{
        shuffle(train_features, train_target)
        shuffle(test_features, test_target)
        data = {train_features, train_target, test_features, test_target}
        return data
      })
}
export {arraysToTensors}