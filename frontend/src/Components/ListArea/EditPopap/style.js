import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    containerPortal: {
        width: '100%',
        height: '100%',
        display: 'flex',
        zIndex: 1000,
        position: 'absolute',
        backgroundColor: '#cbcbcb99',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        opacity: 0
    },
    opacity: {
        opacity: 1,
        transition: 'opacity 0.5s'
    },
    containerPopap: {
        border: "1px solid #808080ba",
        backgroundColor: 'white',
        width: '500px',
        height: '300px',
        borderRadius: '6px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 600,
        marginTop: '15px'
    },
    fields: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    },
    field: {
        marginTop: '15px'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '15px'
    },
    cancel: {
        marginRight: '10px'
    }
}));

export default useStyles;