import React from "react";
import useStyles from "./style";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function ListArea(props) {
    const classes = useStyles();
    const {setActiveItem, activeItem, data} = props;

    const _isActive = (item) => {
        return item.id === (activeItem && activeItem.id);
    };

    const _setActiveItem = (item) => () => {
        setActiveItem(activeItem && activeItem.id === item.id ? null : item);
    };

    return (
        <div className={classes.container}>
            <List>
                {
                    data.map((item) => (
                        <ListItemButton
                            dense
                            onClick={_setActiveItem(item)}
                            selected={_isActive(item)}
                            key={item.id}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))
                }
            </List>
        </div>
    )
}

export default ListArea;