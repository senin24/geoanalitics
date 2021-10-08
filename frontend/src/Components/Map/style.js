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
    width: '350px',
    border: "1px solid #808080ba",
    backgroundColor: 'white',
    borderRadius: '6px',
    bottom: '10px',
    left: '10px',
    zIndex: 2,
    fontSize: '14px',
    display: 'flex',
    padding: '10px',
    boxSizing: 'border-box'
  },
}));

export default useStyles;
