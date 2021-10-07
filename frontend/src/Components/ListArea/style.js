import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    height: '300px',
    width: '200px',
    backgroundColor: "#808080ba",
    top: '92px',
    left: '10px',
    zIndex: 2
  },
}));

export default useStyles;