import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

// const classes = useStyles();

function HeaderMenu() {
    const classes = useStyles();
    // render(){
        return(
            <div>
                {/* Header Stuffs */}
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={3}>
                        Logo
                    </Grid>
                    <Grid item xs={6}>
                        Month
                    </Grid>
                    <Grid item xs={3}>
                        Monthly/Daily Button
                    </Grid>
                </Grid>
            </div>
        )
    // }
}

export default HeaderMenu;