import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    }
})

class MeetingNotesAttachmentPage extends Component {
    render(){
        return(
            <div>
                pew pew
            </div>
        )
    }
}

MeetingNotesAttachmentPage = observer(MeetingNotesAttachmentPage)
export default withStyles(useStyles)(MeetingNotesAttachmentPage);

