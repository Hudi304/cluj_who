
import { createMuiTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
    createMuiTheme({
        typography: {
            fontFamily: ['Roboto', 'Raleway', 'Open Sans'].join(','),
            h1: {
                fontSize: '5rem',
                fontFamily: 'Raleway'
            },
            h2: {
                fontSize: '3.5rem',
                fontFamily: 'Open Sans',
                fontStyle: 'bold'
            },
            h3: {
                fontSize: '2.5rem',
                fontFamily: 'Roboto'
            }
        }
    })
)
