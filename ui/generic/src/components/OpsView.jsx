import React, {PropTypes} from 'react'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'

/**
This is responsible for presenting the different CRUD operations. It takes in the tab names and the form object.
**/
const OpsView = ({tabNames, }) => (
  <Paper style={{marginBottom:20}}>
    <Tabs>
      {
        tabNames.map(function(tabName){
          return (
            <Tab label={tabName} >

            </Tab>
          )
        })
      }
  </Paper>
)
