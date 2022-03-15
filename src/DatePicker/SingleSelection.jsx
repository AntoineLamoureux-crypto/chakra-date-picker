import React, { useState } from 'react'
import { useDayzed } from 'dayzed';
import Calendar from './Calendar'

function SingleSelection({ value, onChange, setIsOpen, configs}) {
    const [offset, setOffset] = useState()

    function handleOnDateSelected({ date }) {
      onChange(date);
      console.log(date)
      setIsOpen(false)
    };

    function handleOnOffsetChanged({ offset }) {
      setOffset(offset);
    };

    const props = {
        selected: value,
        onDateSelected: handleOnDateSelected,
        offset: offset,
        onOffsetChanged: handleOnOffsetChanged,
        minDate: configs.minDate,
        maxDate: configs.maxDate,
    }

    const dayzedData = useDayzed(props)

    return (
        <Calendar {...dayzedData} lang={configs.lang} />
      );
  }
  
  export default SingleSelection;