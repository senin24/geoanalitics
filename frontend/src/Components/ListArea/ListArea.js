import React from "react";
import useStyles from "./style";
import {List, ListItem, ListItemText} from '@material-ui/core';
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
            <Filter data={features}/>
            <List>
                {
                    features.map((item) => (
                        <ListItem
                            onClick={_setActiveItem(item)}
                            selected={_isActive(item)}
                            key={item.properties.id}>
                            <ListItemText primary={<div className={classes.eventItem}>{item.properties.text}</div>} />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )
}

export default ListArea;