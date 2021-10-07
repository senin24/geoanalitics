import React from "react";
import useStyles from "./style";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Filter from "./Filter/Filter";

function ListArea(props) {
    const classes = useStyles();
    const {setActiveItem, activeItem, data: {features}} = props;

    const _isActive = (item) => {
        return item.properties.id === (activeItem && activeItem.properties.id);
    };

    const _setActiveItem = (item) => () => {
        setActiveItem(activeItem && activeItem.properties.id === item.properties.id ? null : item);
    };

    return (
        <div className={classes.container}>
            <Filter/>
            <List>
                {
                    features.map((item) => (
                        <ListItemButton
                            dense
                            onClick={_setActiveItem(item)}
                            selected={_isActive(item)}
                            key={item.properties.id}>
                            <ListItemText primary={item.properties.text} />
                        </ListItemButton>
                    ))
                }
            </List>
        </div>
    )
}

export default ListArea;