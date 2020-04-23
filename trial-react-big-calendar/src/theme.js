import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main:'#2A2C5D',
            main: '#19227c',
            // light: '#ffffff'
            light: '#524aac',
            dark: '#00004f',
            contrastText: '#fff'
        },
        secondary: {
            // main: '#FF4A5C'
            main: '#e53635',
            light: '#ff6d60',
            dark: '#ab000e',
            contrastText: '#fff'
        }
    }
})

export default theme;