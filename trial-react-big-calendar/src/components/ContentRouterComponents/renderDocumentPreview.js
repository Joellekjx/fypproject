import React, { Component } from 'react';
import {  Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import ReactPDF from '../ReactPDF';
import FileViewer from 'react-file-viewer';
import AttachFileIcon from '@material-ui/icons/AttachFile';

class RenderDocumentPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true })
    }

    handleClickClose = () => {
        this.setState({ openDialog: false })
    }

    typeTester = (itemURL) => {
        var regexPDFTest = /(.pdf)$/gm
        var regexDOCXTest = /(.docx)$/gm
        console.log(itemURL)
        console.log("let's see the difference ni the name???")
        if (regexPDFTest.test(itemURL)) { //if pdf, render ReactPDF
            return <ReactPDF url={itemURL} />
        } else if (regexDOCXTest.test(itemURL)) { //if docx render FileViewer to display
            return <FileViewer
                fileType="docx"
                filePath={itemURL}
            />
        } else {
            return "error 404: pls contact somebody about this thx"
        }
    }

    render() {
        const { document } = this.props;
        const { openDialog } = this.state;
        var regexToRemoveFrontOfURL = /^(http\:\/\/127\.0\.0\.1\:8000\/media\/files\/)/gm
        console.log(document.attach_document)
        console.log("what if i hack this shit...")
        const documentName = document.attach_document.replace(regexToRemoveFrontOfURL, "");
        return (
            <div>
                <Button onClick={this.handleClickOpen}>
                    <AttachFileIcon style={{ float: 'left' }} />&nbsp;<span style={{wordBreak: 'break-word'}} >{documentName}</span>
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={() => this.handleClickClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{documentName}</DialogTitle>
                    <DialogContent>
                        {this.typeTester(document.attach_document)}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClickClose()} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default RenderDocumentPreview