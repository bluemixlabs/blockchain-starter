import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchChainHeight } from '../actions/BlockActions.js'
import {setChainHeightPollingIntervalId} from '../actions/ConfigurationActions'
import Block from './Block.jsx'
import Paper from 'material-ui/lib/paper'

import AppBar from 'material-ui/lib/app-bar';

/**
This container initializes an interval when it mounts in order to poll the
OBC REST API for changes in height. It also displays the list of blocks in
reverse order, so the newest blocks appear at the top of the chain.
**/
class Blockchain extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchChainHeight(this.props.urlRestRoot);

    let intervalId = setInterval(() => {this.props.fetchChainHeight(this.props.urlRestRoot)}, 2000);
    this.props.setChainHeightPollingIntervalId(intervalId);
  }

  render(){
    return(
      <Paper style={{marginBottom:20}}>
        <AppBar
          title={"Blockchain"}
          showMenuIconButton={false}
        />

        {this.props.blockchain.map( (block, index) => {
          return <Block key={block.blockNumber} {...block} />
        })}
      </Paper>
    )
  }

}

Blockchain.propTypes = {
    blockchain: PropTypes.array.isRequired,
    urlRestRoot: PropTypes.string.isRequired,
    fetchChainHeight: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>{
  return {
    blockchain: state.blockchain,
    urlRestRoot: state.configuration.urlRestRoot
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    fetchChainHeight: (urlRestRoute) => {
      dispatch(fetchChainHeight(urlRestRoute))
    },
    setChainHeightPollingIntervalId: (intervalId) => {
      dispatch(setChainHeightPollingIntervalId(intervalId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blockchain)
