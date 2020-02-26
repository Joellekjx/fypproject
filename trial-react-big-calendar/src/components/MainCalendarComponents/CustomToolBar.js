//This toolbar includes the "month" and buttons navigation
import React from 'react';
import { Button } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}

export default class CustomToolBar extends React.Component {
  render() {
    let { localizer: { messages }, label } = this.props
    return(
        <div className="rbc-toolbar" style={{paddingTop: '10px'}}>
            <span className="rbc-btn-group">
                <Button component={ArrowBackIos} onClick={this.navigate.bind(null, navigate.PREVIOUS)}></Button>
                {label}
                <Button component={ArrowForwardIosIcon} onClick={this.navigate.bind(null, navigate.NEXT)}></Button>
            </span>
            <span className="rbc-toolbar-label">{label}</span>
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