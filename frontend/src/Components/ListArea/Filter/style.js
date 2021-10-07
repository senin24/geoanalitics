import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
  },
  filtersContainer: {
    width: '100%',
    '& > *': {
     width: '100% !important'
    }
  },
  selectFilters: {
    marginTop: '10px',
    display: 'flex',
    width: '100%',
  },
  sourceFilter: {
    width: '100%',
    marginRight: '5px',
    '& > *': {
      width: '100% !important'
    }
  },
  typeFilter: {
    width: '100%',
    '& > *': {
      width: '100% !important'
    }
  }
}));

export default useStyles;