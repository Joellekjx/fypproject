import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import ReactPDF from '../ReactPDF';

class RenderDocumentPreview extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         documentType: "" //for now set document type to docx or pdf only
    //     }
    // }

    typeTester = (itemURL) => {
        var regexPDFTest = /(.pdf)$/gm
        var regexDOCXTest = /(.docx)$/gm
        console.log(itemURL);
        if(regexPDFTest.test(itemURL)){
            // return "hello pdf"
            return <ReactPDF url={itemURL}/>
        } else if (regexDOCXTest.test(itemURL)){
            return "hello docx"
        } else {
            return "nothing man"
        }
    }

    render() {
        const { documents } = this.props;
        var regexPDFTest = /(.pdf)$/gm
        var regexDOCXTest = /(.docx)$/gm
        return (
            <div>
                Time to render some document pls
                {documents.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Typography>
                                {item.attach_document}
                            </Typography>
                            {/* <Typography> */}
                                {this.typeTester(item.attach_document)}
                            {/* </Typography> */}
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}

export default RenderDocumentPreview