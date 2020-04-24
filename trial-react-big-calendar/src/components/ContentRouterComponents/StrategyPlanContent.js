import React, { Component } from 'react';
import { observer } from 'mobx-react';

class StrategyPlanContent extends Component {
    render(){
        return(
            <div>
                "Final report content"
            </div>
        )
    }
}

StrategyPlanContent = observer(StrategyPlanContent)
export default StrategyPlanContent