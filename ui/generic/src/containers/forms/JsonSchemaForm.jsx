import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { actions } from 'react-redux-form';

import {sendObcRequest} from '../../actions/ChaincodeActions'

// import { createFieldClass, controls } from 'react-redux-form';
//
// const MaterialField = createFieldClass({
//   'TextField': controls.text
// });

import Form from "react-jsonschema-form";


const log = (type) => console.log.bind(console, type);


class JsonSchemaForm extends React.Component {

  //function to retrieve schema from redux store


  handleSubmit = (data) => {
    let { dispatch } = this.props;

    let args = {}

    //formData contains all field forms and takes the one with the most properties. idSchema allows
    //us to figure out what properties a particular form requires. We cross compare to figure out
    //what the args should be.
    for(var propertyName in data.formData){
      if (data.formData.hasOwnProperty(propertyName)) {
        //if the id schema contains this property, that means it is a legitimate argument
        if(data.idSchema[propertyName]){
          args[propertyName]=data.formData[propertyName];
        }
      }
    }

    //TODO: We should have redux manage this form data's state. For now, clear the form on submit.
    data.formData={};

    //dispatch the payload to the appropriate api endpoint
    dispatch(sendObcRequest(args, this.props.fnName, this.props.currentRequestType))
  }

  handleChange = (data) => {
    //console.log(data);

    //get the selected function index

    console.log(data)

    //dispatch an action to change the form model specifically for the form under a particular tab.
    this.props.dispatch(actions.change('chaincodeOpsForm.'+this.props.currentTab+'.fns['+this.props.fnIndex+'].args',data.formData));
  }



  render() {
    //we should compare the tab we are on vs what tab this form was rendered to. Only rerender if they match.
    //This prevents use from rendering every form on tab change.
    let {selectedJsonSchema} = this.props
    //console.log(selectedJsonSchema);

    return (
      <Form schema={selectedJsonSchema ? selectedJsonSchema : {}}
        formData={{}}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onError={log("errors")} >

        <div style={{textAlign: 'right'}}>
          <FlatButton type="submit" primary={true}>Submit</FlatButton>
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {

  let currentTab = state.chaincode.ui.currentTab;
  let currentOpsFunction = null;
  let selectedJsonSchema = null;
  let fnIndex = 0;
  let fnName = "";
  let currentRequestType = "";

  //iterate through tabs to find index
  for(let i = 0; i < state.chaincode.ui.possibleTabs.length; i++){
    if(state.chaincode.ui.possibleTabs[i].name === currentTab){
      currentRequestType = state.chaincode.ui.possibleTabs[i].type;
    }
  }

  if(state.chaincodeOpsForm[currentTab]){
    fnIndex = state.chaincodeOpsForm[currentTab].selectedFn;
    fnName = state.chaincodeOpsForm[currentTab].fns[fnIndex].name;
    selectedJsonSchema = state.chaincode.schema.API[fnName].properties.args.items;
    //console.log(selectedJsonSchema);
  }

  return {
    selectedJsonSchema: selectedJsonSchema,
    currentTab: currentTab,
    currentRequestType: currentRequestType,
    //this tells us which function in the list of functions that we are currently dealing with
    fnIndex: fnIndex,
    fnName: fnName
  };
}

export default connect(mapStateToProps, null)(JsonSchemaForm);
