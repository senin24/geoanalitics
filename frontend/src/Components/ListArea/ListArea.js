import React, {useEffect} from "react";
import useStyles from "./style";
import {List, ListItem, ListItemText} from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Filter from "./Filter/Filter";
import Edit from "./EditPopap/EditPopap";

function ListArea(props) {
    const classes = useStyles();
    const {setActiveItem, activeItem, data: {features}, setFilter, filter, allReload} = props;

    useEffect(() => {
        if (activeItem) {
            const element = document.getElementById(activeItem.properties.id);
            element.scrollIntoView({block: "center"});
        }
    },[activeItem]);

    const _isActive = (item) => {
        return item.properties.id === (activeItem && activeItem.properties.id);
    };

    const _setActiveItem = (item) => (e) => {
        if (!item.properties.coordinates.x) {
            return;
        }
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
                <div className={classes.linkItemContainer} key={index}>
                    <ChevronRightIcon color={'primary'}/>
                    <div className={classes.linkItem} onClick={_setActiveItem(linkItem)}>
                        {linkItem.properties.title}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={classes.container}>
            <Filter data={features} setFilter={setFilter} filter={filter}/>
            <List>
                {
                    features.map((item) => {
                        const currentData = item.properties;
                        const disabled = Boolean(!currentData.coordinates.x);
                        return (
                            <ListItem
                                disabled={disabled}
                                className={classes.item}
                                onClick={_setActiveItem(item)}
                                selected={_isActive(item)}
                                key={currentData.id}>
                                <div className={classes.itemsContainer} id={currentData.id}>
                                    <ListItemText primary={
                                        <div className={classes.eventItem}>
                                            {currentData.title}
                                            {disabled ?
                                                <div className={classes.editIcon}>
                                                    <Edit idItem={currentData.id} allReload={allReload}/>
                                                </div> : null
                                            }
                                        </div>
                                    }/>
                                    <div className={classes.eventItemText}>{currentData.text}</div>
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