import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import React, { PropTypes } from 'react'

import TextField from 'material-ui/lib/text-field';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';

import ChaincodeOpsForm from './forms/ChaincodeOpsForm'

import {setCurrentTab} from '../actions/ChaincodeActions'

import JsonSchemaForm from './forms/JsonSchemaForm'
/**
The AssetContainer class contains a list of assets being tracked by the user.
Clicking the expand button on the individual asset will show the entire payload
contained within the response from the asset query.
**/
class ChaincodeOps extends React.Component{

  handleChange = (value) => {
    if(typeof(value) === "string"){
      this.props.dispatch(setCurrentTab(value))
    }
  }

  render(){
    //let {currentTab, possibleTabs} = this.props
    //TODO: Only rerender when going to the particular tab

    return(
      <Paper style={{marginBottom:20}}>
        <Tabs value={this.props.currentTab} onChange={this.handleChange}>
          {this.props.possibleTabs.map(function(tab){
            return(
              <Tab label={tab.name} value={tab.name} key={tab.name}>
                {/*Need to indicate which tab the form belongs to, so we can reference the state.*/}
                <ChaincodeOpsForm tab={tab.name}/>
                <JsonSchemaForm tabRenderedTo={tab.name}/>
              </Tab>
            )
          })}
          </Tabs>
      </Paper>
    )
  }
}

const connectStateToProps = (state) => {
  return{
    possibleTabs : state.chaincode.ui.possibleTabs,
    currentTab : state.chaincode.ui.currentTab
  }
}

export default connect(connectStateToProps, null)(ChaincodeOps)
