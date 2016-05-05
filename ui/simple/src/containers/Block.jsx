import { connect } from 'react-redux'
import { fetchBlockData } from '../actions/BlockActions'
import React from 'react'
import BlockView from '../components/BlockView.jsx'

class Block extends React.Component{

  constructor(props){
    super(props)

  }

  render(){
    return(
      <BlockView {...this.props} />
    )
  }

}

const mapStateToProps = (state, ownProps) =>{
  //calculate the inverse
  let adjustedIndex = state.blockchain[0].blockNumber - ownProps.blockNumber;
  let currBlock = state.blockchain[adjustedIndex];
  currBlock.urlRestRoot = state.configuration.urlRestRoot;
  return currBlock;
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onBlockClick: (blockNumber) => {
      dispatch(fetchBlockData(blockNumber))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block)
