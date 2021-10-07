import React, {useEffect, useState} from "react";
import Map from '../Map/Map';
import ListArea from "../ListArea/ListArea";
import {serviceJson} from "../../services";
import useStyles from "./style";

function Controller() {
    const classes = useStyles();
    const [activeItem, setActiveItem] = useState(null);

    const [data, setData] = useState(null);

    const _getData = async () => {
        const data = await serviceJson('/api/event', 'GET');
        setData(data);
    };

    useEffect(() => {
        void _getData();
    },[]);

    if (!data) {
        return (
            <div className={classes.indicator}>
                <img src={'/indicator.svg'} alt={'indicator'}/>
            </div>
        )
    }

    return (
        <>
            <ListArea setActiveItem={setActiveItem} activeItem={activeItem} data={data}/>
            <Map activeItem={activeItem} data={data}/>
        </>
    )
}

export default Controller;
