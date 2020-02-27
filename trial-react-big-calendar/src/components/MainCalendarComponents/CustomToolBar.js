//This toolbar includes the "month" and buttons navigation
import React from 'react';
import { Button, Typography, IconButton } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

const useStyles = (theme) => ({
  label: {
    fontFamily: 'Roboto',
    display: 'inline',
    fontSize: '20px',
    fontWeight: '600'
  },
  buttonStyle: {
    // border: '0px solid'
  }
})

class CustomToolBar extends React.Component {
  render() {
    let { localizer: { messages }, label, classes } = this.props
    return(
        <div className="rbc-toolbar" style={{paddingTop: '15px', paddingBottom: '5px',}}>
            <span className="rbc-btn-group">
                <Button size="small" component={ArrowBackIos} onClick={this.navigate.bind(null, navigate.PREVIOUS)}></Button>
                <Typography className={classes.label}>{label}</Typography>
                <Button size="small" component={ArrowForwardIosIcon} onClick={this.navigate.bind(null, navigate.NEXT)}></Button>
            </span>
            <span className="rbc-toolbar-label"></span>
            <span className="rbc-btn-group"> 
            {/* This will have to potentially be switching view b/w month and week */}
                <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>Next</button>
            </span>
        </div>
    )
  }
  navigate = action => {
      this.props.onNavigate(action)
  }
}

export default withStyles(useStyles)(CustomToolBar);