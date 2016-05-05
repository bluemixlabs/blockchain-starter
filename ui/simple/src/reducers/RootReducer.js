import { combineReducers } from 'redux'
import {blockchain} from './BlockchainReducer.js'
import {configuration} from './ConfigurationReducer.js'
import {asset} from './AssetReducer.js'

import {
  modelReducer,
  createFormReducer
} from 'react-redux-form';

const initialConfigurationState = {
  urlRestRoot: "http://169.44.63.199:37687",
  chaincodeId: "7cdd53526ed31f7be5249bfa42c4c73728edebddf91bd29720a289105dafbf1fd8c94306ba128800fc1c2bfbee618ce85717d35f88bb7b481ca3d3ada70d78fd",
  secureContext: "user_type0_c9eeb8c268",
  blocksPerPage: "10"
};

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
})

export default rootReducer
