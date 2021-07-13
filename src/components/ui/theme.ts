import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[700],
    },
    secondary: {
      main: teal[400],
    },
    error: {
      main: deepOrange[800],
    },
  },
});
