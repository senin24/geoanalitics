import React, {useEffect, useState} from "react";
import Map from '../Map/Map';
import ListArea from "../ListArea/ListArea";
import {serviceJson} from "../../services";
import useStyles from "./style";

function Controller() {
    const classes = useStyles();

    const [activeItem, setActiveItem] = useState(null);
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState({source: '', type: '', startDate:'', endDate:''});

    const _getData = async () => {
        const data = await serviceJson('/api/event');
        setData(data);
    };

    const _getFilterData = async () => {
        const data = await serviceJson('/api/event/filterByType', filter);
        // setData(data);
    };

    const _setFilter = (newFilter) => {
        setFilter({...filter, ...newFilter});
    }

    useEffect(() => {
        void _getData();
    },[]);

    useEffect(() => {
        void _getFilterData();
    }, [filter]);

    if (!data) {
        return (
            <div className={classes.indicator}>
                <img src={'/indicator.svg'} alt={'indicator'}/>
            </div>
        )
    }

    return (
        <>
            <ListArea
                setActiveItem={setActiveItem}
                activeItem={activeItem}
                data={data}
                setFilter={_setFilter}
                filter={filter}
            />
            <Map activeItem={activeItem} data={data} setActiveItem={setActiveItem}/>
        </>
    )
}

export default Controller;
