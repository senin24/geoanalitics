import React, {useEffect, useState} from "react";
import useStyles from "./style";
import {Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

function Filter(props) {
    const classes = useStyles();
    const {data,setFilter, filter} = props;

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

    const _onChangeSource = async (event) => {
        setFilter({source: event.target.value})
    }

    const _onChangeType = async (event) => {
        setFilter({type: event.target.value})
    }

    const _onChangeDate = async (date) => {
        const value = new Date(date);
        setFilter({startDate: value.toISOString(), endDate: new Date(value.setDate(value.getDate() + 1)).toISOString()});
    }

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
                                inputVariant="outlined"
                                label="Дата события"
                                format="dd MMM yyyy"
                                value={filter.startDate || null}
                                onChange={_onChangeDate}
                            />
                        </MuiPickersUtilsProvider>
                        <div className={classes.selectFilters}>
                            <div className={classes.sourceFilter}>
                                <Select variant="outlined" value={filter.source} onChange={_onChangeSource}>
                                    {
                                        sourceData.map((item) => (
                                            <MenuItem value={item} key={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className={classes.typeFilter}>
                                <Select variant="outlined" value={filter.type} onChange={_onChangeType}>
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
