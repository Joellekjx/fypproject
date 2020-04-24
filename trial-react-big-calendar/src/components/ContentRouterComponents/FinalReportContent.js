import React, { Component } from 'react';
import { observer } from 'mobx-react';

class FinalReportContent extends Component {
    render(){
        return(
            <div>
                "Final report content"
            </div>
        )
    }
}

FinalReportContent = observer(FinalReportContent)
export default FinalReportContent