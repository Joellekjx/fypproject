//This toolbar includes the "month" and buttons navigation
import React from 'react';
import { Button, Typography, IconButton } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';
// import './CustomToolBar.css';

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
  MONTH: 'MONTH',
  AGENDA: 'AGENDA'
}

export const views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda'
};

const useStyles = (theme) => ({
  label: {
    fontFamily: 'Roboto',
    display: 'inline',
    fontSize: '20px',
    fontWeight: '600'
  },
  buttonStyle: {
    // border: '0px solid'
  },
  viewStyling: {
    color: 'red',
    backgroundColor: 'green'
  }
})

class CustomToolBar extends React.Component {
  view = view => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;
    const { classes } = this.props;

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <Button
          key={name}
          className={view === name ? 'rbc-active' : ''}
          onClick={this.view.bind(null, name)}
          style={{
            fontFamily: 'Roboto',
          }}
        >
          {messages[name]}
        </Button>
      ));
    }
  }

  render() {
    let { localizer: { messages }, label, classes } = this.props
    return (
      <div className="rbc-toolbar" style={{ paddingTop: '15px', paddingBottom: '5px', }}>
        <span className="rbc-btn-group">
        <IconButton aria-label="navigate right" component="span" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            <ArrowBackIos fontSize="small"/>
          </IconButton>
          <Typography className={classes.label}>{label}</Typography>
          <IconButton aria-label="navigate right" component="span" onClick={this.navigate.bind(null, navigate.NEXT)}>
            <ArrowForwardIosIcon fontSize="small"/>
          </IconButton>
        </span>
        <span className="rbc-toolbar-label"></span>
        <span className="rbc-btn-group" style={{ marginRight: '20px' }}>
          {/* This will have to potentially be switching view b/w month and week */}
          {this.viewNamesGroup(messages)}
        </span>
      </div>
    )
  }
  navigate = action => {
    this.props.onNavigate(action)
  }
}

export default withStyles(useStyles)(CustomToolBar);