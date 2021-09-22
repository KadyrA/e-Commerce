import { makeStyles,alpha } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  search: {
  
    borderRadius: 12,
  },
  searchDiv: {
    alignItems: 'center',
    justifyContent: 'center',
  }
}));