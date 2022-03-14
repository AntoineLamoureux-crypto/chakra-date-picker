import React, { useState } from 'react'
import { useDayzed } from 'dayzed';
import Calendar from './Calendar'

function SingleSelection({ currentDate, setCurrentDate, setIsOpen, configs}) {
    const [offset, setOffset] = useState(0)

    function handleOnDateSelected({ date }) {
      setCurrentDate(date);
      console.log(date)
      setIsOpen(false)
    };

    function handleOnOffsetChanged({ offset }) {
      setOffset(offset);
      console.log(offset)
    };

    const props = {
        selected: currentDate,
        onDateSelected: handleOnDateSelected,
        offset: offset,
        onOffsetChanged: handleOnOffsetChanged,
        minDate: configs.minDate,
        maxDate: configs.maxDate,
    }

    let dayzedData = useDayzed(props)

    return (
        <Calendar {...dayzedData} lang={configs.lang} />
      );
  }
  
  export default SingleSelection;