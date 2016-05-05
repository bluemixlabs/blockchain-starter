import React from 'react'
import Blockchain from './Blockchain'

import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

import { connect } from 'react-redux'

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import AppBar from 'material-ui/lib/app-bar';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import IotTheme from '../theme/theme.js';

import "../../lib/styles/bootstrap.min.css";
import "../styles/main.css";
//import "../../node_modules/hint.css/hint.css"

import * as Colors from 'material-ui/lib/styles/colors';

import {fetchAssetObjectModel} from '../actions/AssetActions'
import AssetContainer from './AssetContainer'

import ConfigurationDialog from './ConfigurationDialog'

class App extends React.Component{

  static childContextTypes = {
    muiTheme : React.PropTypes.object,
  };

  //the key passed through context must be called "muiTheme"
  getChildContext() {
    return { muiTheme: getMuiTheme(IotTheme) }
  }

  //get the asset object model as soon as this component mounts
  componentDidMount(){
    this.props.fetchAssetObjectModel()
  }

  render(){
    return(
      <div>

        <AppBar style={{position: 'fixed', zIndex: 9999, background: Colors.grey800}}
          title="IoT Blockchain Monitor"
          showMenuIconButton={false}
          zDepth={4}
          iconElementRight={<ConfigurationDialog/>}
        />

      <Grid style={{paddingTop: 100, marginBottom:30}}>
          <Row>
            <Col xs={12} md={6}>
              <AssetContainer />
            </Col>
            <Col xs={12} md={6}>
              <Blockchain />
            </Col>
          </Row>
        </Grid>


    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchAssetObjectModel: () => {
      dispatch(fetchAssetObjectModel())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
