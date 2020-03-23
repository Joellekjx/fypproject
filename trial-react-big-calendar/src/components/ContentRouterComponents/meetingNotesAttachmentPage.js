import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    }, 
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: 'bold'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 'bold',
      padding: '5px 0px',
    },
    bodyText: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      padding: '5px 0px',
    },
})

class MeetingNotesAttachmentPage extends Component {
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Typography className={classes.heading}>Attachments:</Typography>
                <Typography className={classes.bodyText} style={{fontStyle: 'italic'}}>No attachments.</Typography>
            </div>
        )
    }
}

MeetingNotesAttachmentPage = observer(MeetingNotesAttachmentPage)
export default withStyles(useStyles)(MeetingNotesAttachmentPage);

