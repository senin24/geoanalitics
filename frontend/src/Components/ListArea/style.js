import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '350px',
    border: "1px solid #808080ba",
    backgroundColor: 'white',
    borderRadius: '6px',
    top: '10px',
    left: '10px',
    zIndex: 2,
    fontSize: '14px'
  },
  eventItem: {
    cursor: 'pointer'
  }
}));

export default useStyles;