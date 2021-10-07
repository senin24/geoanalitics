import React from "react";
import useStyles from "./style";
import {List, ListItem, ListItemText} from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import Filter from "./Filter/Filter";

function ListArea(props) {
    const classes = useStyles();
    const {setActiveItem, activeItem, data: {features}} = props;

    const _isActive = (item) => {
        return item.properties.id === (activeItem && activeItem.properties.id);
    };

    const _setActiveItem = (item) => (e) => {
        e.stopPropagation();
        setActiveItem(activeItem && activeItem.properties.id === item.properties.id ? null : item);
    };

    const _getLinksItem = (links) => {
        const dataLinks = [];
        links.forEach((id) => {
            const linkItem = features.find((item) => item.properties.id === id);
            if (linkItem) {
                dataLinks.push(linkItem);
            }
        });
        return dataLinks.map((linkItem, index) => {
            return (
                <div className={classes.linkItem} onClick={_setActiveItem(linkItem)} key={index}>
                    {linkItem.properties.text}
                </div>
            )
        })
    }

    return (
        <div className={classes.container}>
            <Filter data={features}/>
            <List>
                {
                    features.map((item) => {
                        const currentData = item.properties;
                        return (
                            <ListItem
                                className={classes.item}
                                onClick={_setActiveItem(item)}
                                selected={_isActive(item)}
                                key={currentData.id}>
                                <div className={classes.itemsContainer}>
                                    <ListItemText primary={<div className={classes.eventItem}>{currentData.text}</div>}/>
                                    {
                                        currentData.links ? _getLinksItem(currentData.links) : null
                                    }
                                </div>
                                {
                                    currentData.special ?
                                        <div className={classes.iconSpecial}>
                                            <StarsIcon color={'primary'}/>
                                        </div> : null
                                }
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default ListArea;