import { connect } from 'react-redux'
import Paper from 'material-ui/lib/paper'
import React, { PropTypes } from 'react'

import TextField from 'material-ui/lib/text-field';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';

import {enableRemoveBtn, disableRemoveBtn, removeResponsePayload, clearResponsePayloads, togglePayloadPolling} from '../actions/ChaincodeActions'
import ResponsePayloadView from '../components/ResponsePayloadView'

import uuid from 'node-uuid'

/**
The ResponsePayloadContainer is responsible for showing the
**/
class ResponsePayloadContainer extends React.Component{

  //objToJsx should be an empty array
  readObjProps = (obj, objToJsx, indents, count=0) => {

    //If the object itself is a primitive, we just return that as a string.
    //for example {"OK":100}
    if(obj && Object.prototype.toString.call(obj) !== '[object Object]'){
      return (<p>{obj.toString()}</p>);
    }

    for(var propertyName in obj){
      if (obj.hasOwnProperty(propertyName)) {
        if(Object.prototype.toString.call(obj[propertyName]) === '[object Object]'){
          //print the correct number of indentations for parent level object
          count = count + 1;
          objToJsx.push(<p key={uuid.v4()} style={{textIndent: (indents * 20)}}> {propertyName + ": "} </p>);
          //to prettify the output, we should indent the nested objects
          indents ++;
          count = count + 1;
          this.readObjProps(obj[propertyName], objToJsx, indents, count)
          //we finished going into the nested object, so remove one level of indents
          indents --;
        }else{
          count = count + 1;
          objToJsx.push(<p key={uuid.v4()} style={{textIndent: (indents * 20)}}> {propertyName + ": " + obj[propertyName]}</p>);
        }
      }
    }

    return objToJsx;
  }

  render(){
    return(
      <Paper style={{marginBottom:20}}>
        <AppBar
          title={"Response Payloads"}
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Clear" onTouchTap={this.props.clearResponsePayloads}/>}
        />

      {/*Iterate through all the payloads being monitored and display them on the UI*/}
      {this.props.responsePayloads && this.props.responsePayloads.map( (rPayload, index) => {
          return <ResponsePayloadView key={index} rPayload={rPayload}
            removeFn={this.props.removePayload} displayFn={this.readObjProps}
            enableRemoveBtnFn={this.props.enableRemoveBtnFn} disableRemoveBtnFn={this.props.disableRemoveBtnFn}
            index={index} isRemoveBtnEnabled={rPayload.isRemoveBtnEnabled} togglePayloadPolling={this.props.togglePayloadPolling}/>
        }
      )}
      </Paper>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    responsePayloads: state.chaincode.ui.responsePayloads
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    enableRemoveBtnFn: (index) => {
      dispatch(enableRemoveBtn(index))
    },
    disableRemoveBtnFn: (index) => {
      dispatch(disableRemoveBtn(index))
    },
    removePayload: (index) => {
      dispatch(removeResponsePayload(index))
    },
    clearResponsePayloads: () =>{
      dispatch(clearResponsePayloads())
    },
    togglePayloadPolling: (index) => {
      dispatch(togglePayloadPolling(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsePayloadContainer)
