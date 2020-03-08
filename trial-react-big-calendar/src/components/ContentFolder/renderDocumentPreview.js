import React, { Component } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import ReactPDF from '../ReactPDF';

class RenderDocumentPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false //this is for pdf's dialog preview. might use it for word but shall wait
        }
    }

    handleClickOpen = () => {
        this.setState({ openDialog: true })
    }

    handleClickClose = () => {
        this.setState({ openDialog: false })
    }

    renderPDFDialog = (itemURL) => {
        const { openDialog } = this.state;

        var regexToRemoveFrontOfURL = /^(http\:\/\/127\.0\.0\.1\:8000\/media\/files\/)/gm
        const documentName = itemURL.replace(regexToRemoveFrontOfURL, "");
        return (
            <div>
                <Button onClick={() => this.handleClickOpen()}>
                    Open {documentName}
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={() => this.handleClickClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{documentName}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description"> */}
                            <ReactPDF url={itemURL}/>
                        {/* </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={() => this.handleClickClose()} color="primary">
                            Disagree
                        </Button> */}
                        <Button onClick={() => this.handleClickClose()} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    typeTester = (itemURL) => {
        var regexPDFTest = /(.pdf)$/gm
        var regexDOCXTest = /(.docx)$/gm

        console.log(itemURL);
        if (regexPDFTest.test(itemURL)) {
            // return "hello pdf"
            return this.renderPDFDialog(itemURL)
            // return <ReactPDF url={itemURL} />
        } else if (regexDOCXTest.test(itemURL)) {
            return "hello docx"
        } else {
            return "nothing man"
        }
    }

    render() {
        const { documents } = this.props;
        return (
            <div>
                {/* Time to render some document pls */}
                {documents.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {/* <Typography>
                                {item.attach_document}
                            </Typography> */}
                            {this.typeTester(item.attach_document)}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export default RenderDocumentPreview