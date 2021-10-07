import React from "react";
import useStyles from "./style";
import {Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function Filter(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Accordion>
                <AccordionSummary>
                    <Typography>Фильтр</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.date}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="Дата события"
                                format="MM.dd.yyyy"
                            />
                        </MuiPickersUtilsProvider>
                        <Select variant="outlined"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Filter;