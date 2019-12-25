import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import getCategories from '../api/getCategories';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

// const classes = useStyles();

// function HeaderMenu() {
//     const classes = useStyles();
//     // render(){
//         return(
//             <div>
//                 {/* Header Stuffs */}
//                 <Grid container className={classes.root} spacing={2}>
//                     <Grid item xs={3}>
//                         Logo/Menu
//                     </Grid>
//                     {/* <Grid item xs={6}>
//                         Month
//                     </Grid> */}
//                     {/* <Grid item xs={3}>
//                         Monthly/Daily Button
//                     </Grid> */}
//                         {/* getCategories(mediaStore.isMockApi, spyFn)
//       .then(result => {
//         mediaStore.updateCategory(result.category.map(category => category))
//       })
//       .catch(error => console.log(error)); */}
//                 </Grid>
//             </div>
//         )
//     // }
// }

class HeaderMenu extends Component {
    constructor(props) {
        super(props)
    }

    render(){
    return(
        <div>
            {/* Header Stuffs */}
            {/* className={classes.root} */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    Logo/Menu
                </Grid>
                {/* <Grid item xs={6}>
                    Month
                </Grid> */}
                {/* <Grid item xs={3}>
                    Monthly/Daily Button
                </Grid> */}
                    {/* getCategories(mediaStore.isMockApi, spyFn)
    .then(result => {
        mediaStore.updateCategory(result.category.map(category => category))
    })
    .catch(error => console.log(error)); */}
            </Grid>
        </div>
        )
    }
}

export default HeaderMenu;