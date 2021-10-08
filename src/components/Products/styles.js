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
    border: '1px solid rgba(108, 124, 144, 0.47);',
    width: '420px',
    height: '45px',
    borderRadius: '3px',
    background: '#FFF',
    color: '#566373',
    paddingLeft: '15px',
    fontSize: '16px',
    fontFamily: 'Open Sans, Lucida Grande, Lucida Sans Unicode, Veranda, Arial, sans-serif',
    fontWeight: '400',
    backgroundImage: '#fff',
    padding: '0 12px',
    lineHeight: '45px',
    transition: 'all .15s ease-in-out',
    //margin: '30px',

    // borderColor:'#F0A500',
    // width: '400px',
    // height: '30px',
    // fontSize : '15px',

  },
  categories:{
    listStyleType: 'disc',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    paddingInlineStart: '40px',

    display: "flex",
    justifyContent:"center",
    padding:'0px 0px 25px',
  },
  categoryButtons:{
    display: 'inline-block',
    background: 'rgba(108, 124, 144, 0.15)',
    padding: '7px 35px',
    borderRadius: '10px',
    borderColor: '#fff',
    fontSize: '15px',
    color: '#566373',
    margin: '10px 5px',
    cursor: 'pointer',
    transition: 'all ease-in-out 0.2s',
    textDecoration: 'none',

    // backgroundColor:'#fff',
    // fontSize:'30px',
    // padding:'10px 15px',
    // border:'none',
    // color:'#F0A500',

  }
}));