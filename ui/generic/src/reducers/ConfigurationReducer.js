import {
  CONFIG_UPDATE_URL_REST_ROOT, SET_CONFIG_IOT_CONNECTION, SET_CHAIN_HEIGHT_POLLING_INTERVAL_ID, SET_OBC_CONFIGURATION,
  SET_CONFIG_DIALOG_DISPLAY
} from '../actions/ConfigurationActions.js'

//set default configuration. To keep things simple, we don't have any UI elements
//to configure these properties, so they must be populated ahead of time.
export const configuration = (state={
  urlRestRoot: "http://localhost:3000",
   //urlRestRoot: "http://169.44.63.199:37687",
  //chaincodeId: "abf072028033b86aa9d61127c9ac9f0f407a24ce5b464f3afb6e8474169df95e1c1e40d31051553430eca22d10fe8b7083a518c77b80c94d679dba4c6858a90b",
  chaincodeId: "b2787286f251d94cbe016ba115040a7ff06bd09ee1d32f1770dd5c914453849c91c9b6a1ff65032dc6407a33a8bfdd44bfc7e88f40cb0cf10e2151500e042563",
  //the ID of the chain height polling. This will be populated at runtime.
  chainHeightPollingIntervalId: -1,
  //the chain height polling interval, in milliseconds
  chainHeightPollingInterval: 2000,
  secureContext: "user_type0_c9eeb8c268",
  //this is a UI specific toggle. This governs whether or not the configuration modal is showing or not.
  showDialog: false,
  //this is the number of blocks to show on the page at a time.
  blocksPerPage: 10
}, action) => {
  /**
    These state configuration actions are implemented, but we don't use them in the UI. Feel free to wire them to a UI element if needed.
  **/
  switch (action.type){
    case CONFIG_UPDATE_URL_REST_ROOT:
      return Object.assign({}, state, {
        urlRestRoot: action.url
      })
    case SET_CHAIN_HEIGHT_POLLING_INTERVAL_ID: {
      return Object.assign({}, state, {
        chainHeightPollingIntervalId: action.intervalId
      })
    }
    /**
      This action is called from the submit button on the form. It is used to transfer over values from the obcConfiguration model to the configuration used by the ui.
      This allows us to make changes to the form without affecting the queries going on in the background.
    **/
    case SET_OBC_CONFIGURATION:
      return Object.assign({}, state, {
        //set the appropriate properties
        urlRestRoot: action.obcConfigObj.urlRestRoot,
        chaincodeId: action.obcConfigObj.chaincodeId,
        secureContext: action.obcConfigObj.secureContext,
        blocksPerPage: action.obcConfigObj.blocksPerPage
      })

    /**
      Strictly a UI control. This determines whether or not the configuration ui dialog should display or not.
    **/
    case SET_CONFIG_DIALOG_DISPLAY:
      return Object.assign({}, state, {
        showDialog: action.showDialog
      })

    default:
      return state;
  }
}
