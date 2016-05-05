import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import { connect } from 'react-redux'

import ObcConfigurationForm from './forms/ObcConfigurationForm'

import {setConfigDialogDisplay} from '../actions/ConfigurationActions'

class ConfigurationDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.closeDialog}
      />,
    ];

    return (
      <div>
        <FlatButton label="Configuration" onTouchTap={this.props.openDialog} style={{color:"#ffffff", marginTop: 8}}/>
        <Dialog
          title="Configuration"

          modal={false}
          open={this.props.showDialog}
          onRequestClose={this.props.closeDialog}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={false}
          repositionOnUpdate={false}
          >
            <ObcConfigurationForm />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    showDialog: state.configuration.showDialog
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    closeDialog: () => {
      dispatch(setConfigDialogDisplay(false))
    },
    openDialog: () => {
      dispatch(setConfigDialogDisplay(true))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationDialog)
