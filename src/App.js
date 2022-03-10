import React, { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import { SINGLE_SELECTION_MODE, MINDATE, MAXDATE } from './DatePicker/utils'
import { LANG_EN, LANG_FR } from './DatePicker/utils'

function App() {
    const [currentDate, setCurrentDate ] = useState()
    const configs = {
        minDate: MINDATE, 
        maxDate: MAXDATE,
        selectionMode: SINGLE_SELECTION_MODE,
        lang: LANG_FR
    }

  return (
    <>
      <DatePicker configs={configs} value={currentDate} onChange={setCurrentDate} />
    </>
  );
}

export default App;
