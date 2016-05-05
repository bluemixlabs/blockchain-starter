import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, actions } from 'react-redux-form';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

// import { createFieldClass, controls } from 'react-redux-form';
//
// const MaterialField = createFieldClass({
//   'TextField': controls.text
// });

class ChaincodeOpsForm extends React.Component {

  handleSubmit(chaincodeOpsForm) {
    let { dispatch } = this.props;

    console.log(chaincodeOpsForm);

    //set the properties specific to obc in our configuration store
    //dispatch(setConfiguration(obcConfiguration))

    //close the dialog
    //dispatch(setConfigDialogDisplay(false))
  }

  handleChange(e,i,v) {
    console.log(i);

    //dispatch an action to change the form model specifically for the form under a particular tab.
    this.props.dispatch(actions.change('chaincodeOpsForm.'+this.props.tab+'.selectedFn',i));
  }

  render() {
    let { chaincodeOpsForm, tab } = this.props;

    //console.log(chaincodeOpsForm);

    return (
      <Form model="chaincodeOpsForm" noValidate
        onSubmit={(chaincodeOpsForm) => this.handleSubmit(chaincodeOpsForm)}>
        <SelectField style={{marginLeft: 10}}value={chaincodeOpsForm[tab] ? chaincodeOpsForm[tab].selectedFn : ""} onChange={(e,i,v) => {this.handleChange(e,i,v)}}>
          {chaincodeOpsForm[tab] && chaincodeOpsForm[tab].fns.map(function(fn, index){
              return(
                <MenuItem value={index} primaryText={fn.name} key={index}/>
              )
          })}
        </SelectField>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    chaincodeOpsForm: state.chaincodeOpsForm,
    currentOpsTab: state.chaincode.ui.currentTab
  };
}

export default connect(mapStateToProps)(ChaincodeOpsForm);
