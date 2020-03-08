import React, { Component } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import ReactPDF from '../ReactPDF';
import testDocx from '../../static/another-kind-of-test-document.docx';
// import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';

const file = testDocx
const type = 'docx'

// class MyComponent extends Component {
//   render() {
//     return (
//       <FileViewer
//         fileType={type}
//         filePath={file}
//         errorComponent={CustomErrorComponent}
//         onError={this.onError}/>
//     );
//   }

//   onError(e) {
//     logger.logError(e, 'error in file-viewer');
//   }
// }
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

    // onError(e) {
    //     logger.logError(e, 'error in file-viewer');
    // }

    renderPDFDialog = (itemURL) => {
        const { openDialog } = this.state;
        console.log(itemURL)
        console.log("what is being pushed here? docx or pdf?")

        var regexToRemoveFrontOfURL = /^(http\:\/\/127\.0\.0\.1\:8000\/media\/files\/)/gm
        const documentName = itemURL.replace(regexToRemoveFrontOfURL, "");

        return (
            <div>
                <Button onClick={() => this.handleClickOpen()}>
                    {console.log("click me and the document name is: " + documentName)}
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
                        <ReactPDF url={itemURL} />
                        {/* {callFunction} */}
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

    renderTextDialog = (itemURL) => {
        const { openDialog } = this.state;
        console.log(itemURL)
        console.log("what is being pushed here? docx or pdf?")

        var regexToRemoveFrontOfURL = /^(http\:\/\/127\.0\.0\.1\:8000\/media\/files\/)/gm
        const documentName = itemURL.replace(regexToRemoveFrontOfURL, "");

        return (
            <div>
                <Button onClick={() => this.handleClickOpen()}>
                    {console.log("click me and the document name is: " + documentName)}
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
                        <FileViewer
                            fileType="docx"
                            filePath={itemURL}
                        />
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

    // renderDOCXView = (itemURL) => {
    //     //why does the pdf view pop up over the docx view?
    //     console.log("does this even enter properly?")
    //     return (
    //         <FileViewer
    //             fileType="docx"
    //             filePath={itemURL}
    //         />
    //     )
    // }

    // renderPDFView = (itemURL) => {
    //     return (
    //         <ReactPDF url={itemURL} />
    //     )
    // }

    typeTester = (itemURL) => {
        var regexPDFTest = /(.pdf)$/gm
        var regexDOCXTest = /(.docx)$/gm

        // console.log(itemURL);
        if (regexPDFTest.test(itemURL)) {
            console.log("why am i inside pdf?")
            return this.renderPDFDialog(itemURL)
        } else if (regexDOCXTest.test(itemURL)) {
            console.log("why am i inside docx?")
            return this.renderTextDialog(itemURL)
        } else {
            return "nothing man"
        }
    }

    //still doesn't though
    /**
     * Brain farts:
     * The last 'itemURL' is being rendered at the top despite it not being clicked on
     * That suggests that the itemURL is being replaced by the one at the bottom/most recent document
     * So how can we precisely know which itemURL we are clicking on?
     * Should we be using index to pass the correct one over? Or is there another targeted onclick method to use?
     */
    
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