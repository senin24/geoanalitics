import React, {useState} from "react";
import Map from '../Map/Map';
import ListArea from "../ListArea/ListArea";

function Controller() {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <>
            <ListArea setActiveItem={setActiveItem} activeItem={activeItem}/>
            <Map activeItem={activeItem}/>
        </>
    )
}

export default Controller;