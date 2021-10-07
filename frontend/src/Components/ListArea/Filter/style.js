import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
  },
  date: {
    width: '100%',
    '& > *': {
     width: '100% !important'
    }
  }
}));

export default useStyles;