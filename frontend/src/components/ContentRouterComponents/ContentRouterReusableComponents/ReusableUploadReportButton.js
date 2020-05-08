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

    return (
        <Dialog
            maxWidth='md'
            classes={{
                paper: classes.paper,
            }}
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
    open: PropTypes.bool.isRequired,
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
        const { id } = this.props;
        axios.post("http://127.0.0.1:8000/api/document/", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {
                axios.get(`http://127.0.0.1:8000/api/taskComment/${id}/`)
                .then( res => {
                    var document_name = res.data.documents[res.data.documents.length - 1].attach_document
                    const { calendarStore } = this.props;
                    const { addDocumentsToData } = calendarStore;
                    addDocumentsToData(id, document_name);
                })
            })
            .catch((error) => {
                console.log(error.response);
                console.log(upload_date);
            })
        //Reset the state
        this.setState({
            selectedFile: null,
            addedFile: false,
        })
    }

    cancelAddAttachment = () => {
        this.setState({
            selectedFile: null,
            addedFile: false,
        })
    }

    render() {
        const { buttonLabel, disabled } = this.props;
        return (
            <div>
                <form>
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
                </form>
            </div>
        )
    }
}

export default ReusableUploadReportButton