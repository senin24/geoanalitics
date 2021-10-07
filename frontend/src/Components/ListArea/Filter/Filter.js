import React, {useEffect, useState} from "react";
import useStyles from "./style";
import {Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

function Filter(props) {
    const classes = useStyles();
    const {data} = props;

    const [sourceData, setSourceData] = useState(null);

    const [typeData, setTypeData] = useState(null);

    useEffect(() => {
        const source = new Set();
        const type = new Set();
        data.forEach((item) => {
            source.add(item.properties.source);
            type.add(item.properties.type);
        });
        setSourceData(Array.from(source));
        setTypeData(Array.from(type));
    },[])

    if (!sourceData || !typeData) {
        return null;
    }

    return (
        <div className={classes.container}>
            <Accordion>
                <AccordionSummary>
                    <Typography>Фильтр</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.filtersContainer}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="Дата события"
                                format="MM.dd.yyyy"
                            />
                        </MuiPickersUtilsProvider>
                        <div className={classes.selectFilters}>
                            <div className={classes.sourceFilter}>
                                <Select variant="outlined" value={sourceData[0]}>
                                    {
                                        sourceData.map((item) => (
                                            <MenuItem value={item} key={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className={classes.typeFilter}>
                                <Select variant="outlined" value={typeData[0]}>
                                    {
                                        typeData.map((item) => (
                                            <MenuItem value={item} key={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Filter;
