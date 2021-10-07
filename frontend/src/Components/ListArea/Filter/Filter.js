import React from "react";
import useStyles from "./style";
import {Accordion, AccordionSummary, AccordionDetails, Typography, TextField} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import ruLocale from 'date-fns/locale/ru';

function Filter(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Accordion>
                <AccordionSummary>
                    <Typography>Фильтр</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                            <DatePicker
                                mask={'__.__.____'}
                                label="Дата события"
                                onChange={() => {}}
                                renderInput={(params) => <TextField fullWidth={true} {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Filter;