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
    fontSize: '14px',
    height: '500px',
    overflow: 'auto',
    scrollBehavior: 'smooth'
  },
  eventItem: {
    cursor: 'pointer',
    fontSize: '14px'
  },
  iconSpecial: {
    marginLeft: '5px',
    display: 'flex'
  },
  item: {
    borderTop: '1px solid #80808038'
  },
  itemsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  linkItem: {
    fontSize: '10px',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  linkItemContainer:{
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px'
  },
  eventItemText: {
    fontSize: '12px'
  }
}));

export default useStyles;