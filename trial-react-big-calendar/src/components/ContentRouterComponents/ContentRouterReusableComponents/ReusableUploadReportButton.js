import React, { Component } from 'react';
import { Paper, Button, Dialog, DialogTitle } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';

/**
 * Pass through prop for buttonLabel i.e. "Upload X Report"
 */

function SimpleDialog(props) {
    // const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Confirm Uploading File</DialogTitle>
            {props.file ? props.file.name : ''}
            <Button style={{ float: 'right' }} variant="contained" color="primary" component="span" onClick={props.upload}>
                Upload
            </Button>
            <Button style={{ float: 'right', marginRight: '10px' }} onClick={props.cancel}>
                Cancel
            </Button>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

class ReusableUploadReportButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            addedFile: false,
        }
    }

    addAttachment = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            addedFile: true,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('task_id', this.props.id)
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

        //Update mobx store so that front-end view can be updated simultaneously
        //By storing it in 'getData' through 'addDocumentsToData'
        const { id } = this.props;
        const { addDocumentsToData } = this.props.calendarStore
        addDocumentsToData(id, this.state.selectedFile)
        // console.log(data.get('attach_document'))
        // console.log("is the data here the same format as when u load it in initially??")

        //reset the state
        this.setState({
            selectedFile: null,
            addedFile: false,
        })

        // window.location.reload(false);
        this.forceUpdate()
    }

    cancelAddAttachment = () => {
        console.log('cancel')
        this.setState({
            selectedFile: null,
            addedFile: false,
        })
    }

    /**
     * 
    onSubmitForm = (e) => {
    e.preventDefault();
    //Note to self: Can u like lol reduce the props here some how???
    const { Id, task_type, task_created, student_id, project_id, tutor_id, calendarStore } = this.props;
    const { hoursSpent, thingsCompleted } = this.state;

    const { updateWeeklyReportSubmission } = calendarStore;
    var submissionTime = moment();
    if (hoursSpent === "" || thingsCompleted === "") {
      alert("Please fill in all fields");
    } else {
      axiosPut(Id, task_type, task_created, submissionTime, project_id, student_id, tutor_id, "Completed", thingsCompleted, hoursSpent);
      this.onClickHandler();
      //Update mobx store so that front-end view can be updated simultaneously
      updateWeeklyReportSubmission(Id, 'Completed', thingsCompleted, submissionTime, hoursSpent)
    }
  }
     */

    uploadedFilePaper = () => {
        return (
            <div>
                <Paper>
                    Hellooo
                     {console.log(this.state.selectedFile)}
                    {this.state.selectedFile.name}
                </Paper>
            </div>
        )
    }

    render() {
        console.log(this.state.addedFile)
        console.log("hmmm some cmomponent error??")
        return (
            <div>
                <input
                    type="file"
                    onChange={this.addAttachment}
                    id="contained-button-file"
                    style={{ display: 'none' }}
                />
                <label htmlFor="contained-button-file">
                    <Button color="primary" variant="outlined" component="span">
                        Upload Final Report
                    </Button>
                </label>
                {/* <Button color="primary" variant="outlined" onClick={() => this.onClickUpload()}>
                    Upload Final Report
                </Button> */}
                <SimpleDialog
                    open={this.state.addedFile}
                    file={this.state.selectedFile}
                    upload={this.onClickHandler}
                    cancel={this.cancelAddAttachment}
                // onClose={handleClose}
                />
                {/* {this.state.addedFile ? this.uploadedFilePaper() : ""} */}
            </div>
        )
    }
}

export default ReusableUploadReportButton