import React from "react";
import useStyles from "./style";

function ListArea() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            Area
        </div>
    )
}

export default ListArea;