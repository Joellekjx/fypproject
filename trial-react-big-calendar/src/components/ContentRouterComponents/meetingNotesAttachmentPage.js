import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Divider } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RenderDocumentPreview from './renderDocumentPreview';

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

/**
 * @props documents
 * @props selectedFile
 * @props addAttachment
 * @props upload/onClickHandler
 * @props cancel
 */

class MeetingNotesAttachmentPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
    }
  }


  addAttachment = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  cancelAddAttachment = () => {
    console.log('cancel')
    this.setState({
      selectedFile: null,
    })
  }

  onClickHandler = () => {
    const data = new FormData()
    data.append('task_id', this.props.Id)
    data.append('attach_document', this.state.selectedFile)
    var upload_date = moment(new Date()).format('YYYY-MM-DD HH:mm')
    data.append('uploaded_date', upload_date)
    axios.post("http://127.0.0.1:8000/api/document/", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        console.log(res.statusText);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(upload_date);
      })

    //reset the state
    this.setState({
      selectedFile: null,
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.heading}>Attachments:</Typography>

        <React.Fragment>
          <Grid item xs={12} md={12} lg={12}>
            {/* <Typography className={classes.secondaryHeading}>Attachments: </Typography> */}
            {this.props.documents.length === 0 ?
              <div> <Typography className={classes.bodyText} style={{ fontStyle: 'italic' }}>No attachments.</Typography></div>
              :
              this.props.documents.map((item, index) => {
                return <div key={index}><RenderDocumentPreview document={item} key={index} /></div>
              })}

            <Divider />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <input
              type="file"
              onChange={this.addAttachment}
              id="contained-button-file"
              style={{ display: 'none' }}
            />
            <label htmlFor="contained-button-file">
              <Button color="primary" component="span" >
                + Attach More Files
                        </Button>
            </label>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {this.state.selectedFile ?
              <div>
                <Grid item>
                  <AttachFileIcon style={{ float: 'left' }} /><Typography>{this.state.selectedFile.name}</Typography>
                </Grid>
                <Grid item>
                  <Button style={{ float: 'right' }} variant="contained" color="primary" component="span" onClick={this.onClickHandler}>
                    Upload
                                </Button>
                  <Button style={{ float: 'right', marginRight: '10px' }} onClick={this.cancelAddAttachment}>
                    Cancel
                                </Button>
                </Grid>
              </div>
              : ""
            }

          </Grid>
        </React.Fragment>


      </div>
    )
  }
}

MeetingNotesAttachmentPage = observer(MeetingNotesAttachmentPage)
export default withStyles(useStyles)(MeetingNotesAttachmentPage);

