import React, {useEffect, useState} from "react";
import Map from '../Map/Map';
import ListArea from "../ListArea/ListArea";
import FilterHeatLayer from '../Map/FlterHeatLayer';
import {serviceJson} from "../../services";
import useStyles from "./style";

function Controller() {
    const classes = useStyles();

    const [activeItem, setActiveItem] = useState(null);
    const [data, setData] = useState(null);
    const [dataHeat, setDataHeat] = useState(null);
    const [filter, setFilter] = useState({source: '', type: '', startDate:'', endDate:''});
    const [filterHeat, setFilterHeat] = useState({startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), endDate:new Date().toISOString()});

    const _getFilterData = async () => {
        const data = await serviceJson('/api/event', filter);
        setData(data);
    };
    const _getFilterDataHeat = async () => {
        const data = await serviceJson('/api/event', filterHeat);
        setDataHeat(data);
    };

    const _setFilter = (newFilter) => {
        setFilter({...filter, ...newFilter});
    };

    const _setFilterHeat = (newFilter) => {
        setFilterHeat({...filterHeat, ...newFilter});
    };

    const _allReload = () => {
        _setFilter();
        _setFilterHeat();
    }

    useEffect(() => {
        void _getFilterData();
    }, [filter]);

    useEffect(() => {
        void _getFilterDataHeat();
    }, [filterHeat]);

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
                allReload={_allReload}
            />
            <Map activeItem={activeItem} dataHeat={dataHeat} data={data} setActiveItem={setActiveItem}/>
            <FilterHeatLayer filter={filterHeat} setFilter={_setFilterHeat}/>
        </>
    )
}

export default Controller;
