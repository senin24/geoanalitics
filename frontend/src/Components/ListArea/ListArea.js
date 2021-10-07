import React from "react";
import useStyles from "./style";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function ListArea(props) {
    const classes = useStyles();
    const {setActiveItem, activeItem} = props;
    const FAKE_DATA = [
        {
            "id": 1,
            "type": "sport",
            "source": "газета спорт",
            "date": "06.10.2021",
            "title": "новое событие в мире спорта",
            "text": "завтра пройдут соревнования по волейболу",
            "special": false,
            "address": {},
            "coordinates": {
                "x": 55.844110,
                "y": 37.562079
            },
            "importance": 1,
            "links": [2]
        },
        {
            "id": 2,
            "type": "sport",
            "source": "газета спорт",
            "date": "07.10.2021",
            "title": "соревнования по волейболу",
            "text": "сегодня прошли соревнования по волейболу",
            "special": false,
            "address": {
                "region": "Красноярский край",
                "city": "Красноярск"
            },
            "coordinates": {
                "y": 37.772193,
                "x": 55.711758
            },
            "importance": 1,
            "links": [1]
        },
        {
            "id": 3,
            "type": "hr/resume",
            "source": "hr.ru",
            "date": "07.10.2021",
            "title": "разработчик java",
            "text": "я разработчик java, хочу работать в Сбере",
            "special": true,
            "address": {
                "region": "Магаданская область",
                "city": "Магадан"
            },
            "coordinates": {
              "y": 37.460456,
              "x": 55.704004
            },
            "importance": 1,
            "links": []
        }
    ]

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
                    FAKE_DATA.map((item) => (
                        <ListItemButton onClick={_setActiveItem(item)} selected={_isActive(item)} key={item.id}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))
                }
            </List>
        </div>
    )
}

export default ListArea;