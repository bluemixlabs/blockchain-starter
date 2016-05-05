import { combineReducers } from 'redux'
import {blockchain} from './BlockchainReducer.js'
import {configuration} from './ConfigurationReducer.js'
import {asset} from './AssetReducer.js'
import {chaincode} from './ChaincodeReducer.js'

import {
  modelReducer,
  createFormReducer
} from 'react-redux-form';

const initialConfigurationState = {
  urlRestRoot: "http://localhost:3000",
  chaincodeId: "b2787286f251d94cbe016ba115040a7ff06bd09ee1d32f1770dd5c914453849c91c9b6a1ff65032dc6407a33a8bfdd44bfc7e88f40cb0cf10e2151500e042563",
  secureContext: "user_type0_c9eeb8c268",
  blocksPerPage: "10"
};

const initialChaincodeOpsFormState = {
  tabOne:{
    selectedFn: "firstOne",
    selectFns: ['firstOne','secondOne','thirdOne']
  }
}

/**
Combines all other reducers into one reducer called the root reducer. We will be using the root
reducer when creating the redux store.
**/
const rootReducer = combineReducers({
  blockchain,
  configuration,
  asset,
  //obcConfiguration is the model that deals with any configuration related to obc
  obcConfiguration: modelReducer('obcConfiguration', initialConfigurationState),
  chaincodeOpsForm: modelReducer('chaincodeOpsForm', initialChaincodeOpsFormState),
  //
  chaincode

})

export default rootReducer
