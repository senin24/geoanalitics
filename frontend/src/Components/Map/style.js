import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 1
  },
  containerMap: {
    height: '100%',
    width: '100%',
  },
  containerFilter: {
    position: 'absolute',
    width: '370px',
    border: "1px solid #808080ba",
    backgroundColor: 'white',
    borderRadius: '6px',
    bottom: '10px',
    left: '10px',
    zIndex: 2,
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box'
  },
  filtersTitle: {
    marginBottom: '15px',

    fontSize: '16px',
    textAlign: 'center',
  },
  filters: {
    display: 'flex',
  }
}));

export default useStyles;
