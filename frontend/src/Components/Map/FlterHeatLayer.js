import React, {useEffect} from "react";
import useStyles from "./style";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

function FilterHeatLayer(props) {
  const classes = useStyles();
  const {setFilter, filter} = props;
  const _onChangeDateStart = async (date) => {
    const value = new Date(date);
    setFilter({startDate: value.toISOString()});
  };
  const _onChangeDateEnd = async (date) => {
    const value = new Date(date);
    setFilter({endDate: value.toISOString()});
  };
  return(
    <div className={classes.containerFilter}>
      <div className={classes.filtersTitle}>Параметры тепловой карты</div>
      <div className={classes.filters}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            inputVariant="outlined"
            label="Дата начала"
            format="dd MMM yyyy"
            value={filter.startDate || null}
            onChange={_onChangeDateStart}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            inputVariant="outlined"
            label="Дата окончания"
            format="dd MMM yyyy"
            value={filter.endDate || null}
            onChange={_onChangeDateEnd}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>
  )

}

export default FilterHeatLayer
