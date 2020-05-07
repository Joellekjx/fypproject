import React, { Component } from 'react';
import { Paper, Button, Dialog, DialogTitle, Typography } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Pass through prop for buttonLabel i.e. "Upload X Report"
 */
const useStyles = makeStyles({
    paper: {
        padding: '20px'
    }
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { open } = props;

    // const handleClose = () => {
    //     onClose(selectedValue);
    // };

    return (
        <Dialog
            maxWidth='md'
            classes={{
                paper: classes.paper,
            }}
            // onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">Confirm Uploading File</DialogTitle>
            <Typography style={{ textAlign: 'center', paddingBottom: '15px' }}>
                {props.file ? props.file.name : ''}
            </Typography>
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
    // onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    // selectedValue: PropTypes.string.isRequired,
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
        //HELP 5/5/20: How to send the pdf into the store, so that "renderDocumentPreview" can view the pdf/docx when it is uploaded?
        //What should even be the format? Else how to send it to "http://127.0.0.1:8000/media/files/..." to generate the document?
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
    }

    cancelAddAttachment = () => {
        console.log('cancel')
        this.setState({
            selectedFile: null,
            addedFile: false,
        })
    }

    render() {
        const { buttonLabel, disabled } = this.props;
        return (
            <div>
                <input
                    type="file"
                    onChange={this.addAttachment}
                    id="contained-button-file"
                    style={{ display: 'none' }}
                    disabled={disabled}
                />
                <label htmlFor="contained-button-file">
                    <Button color="primary" variant="outlined" component="span" disabled={disabled}>
                        Upload {buttonLabel}
                    </Button>
                </label>
                <SimpleDialog
                    open={this.state.addedFile}
                    file={this.state.selectedFile}
                    upload={this.onClickHandler}
                    cancel={this.cancelAddAttachment}
                />
            </div>
        )
    }
}

export default ReusableUploadReportButton