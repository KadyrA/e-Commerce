
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9 (56.25)
    objectFit:'scale-down',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    maxWidth:'100%',
    maxHeight:'100%',
  },
  stock: {
    color: '#FF0000'
  },
}));