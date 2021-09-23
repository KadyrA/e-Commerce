import { makeStyles, } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
  searchDiv:{
    display: "flex",
    justifyContent:"center",
  },
  search:{
    margin: '20px',
    width: '400px',
    height: '30px',
    fontSize : '15px',
    border:'none',

  },
  categories:{
    display: "flex",
    justifyContent:"center",
    padding:'0px 0px 25px',
  },
  categoryButtons:{
    backgroundColor:'#FBE6D4',
    fontSize:'30px',
    padding:'10px 15px',
    border:'none',
    color:'#787A91',

  }
}));