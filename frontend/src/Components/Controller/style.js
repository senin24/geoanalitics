import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    indicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default useStyles;