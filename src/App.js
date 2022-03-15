import React, { useState } from "react";
import _ from 'lodash'
import DatePicker from "./DatePicker/DatePicker";
import { SINGLE_SELECTION_MODE, MINDATE, MAXDATE } from './DatePicker/utils'
import { LANG_EN, LANG_FR } from './DatePicker/utils'
import Dropdown from './DropDown/Dropdown'

const items = [
  { label: 'H', value: 'hsj' },
  { label: 'He', value: 'hsj2' },
  { label: 'Hews', value: 'hrs' },
  { label: 'Hewss', value: 'hrsmew' },
  { label: 'HewMqWE', value: 'hrsm' },
  { label: 'V', value: 'hrsmdsa' },
  { label: 'M', value: 'hrsma1' },
]

function App() {
  const [currentDate, setCurrentDate] = useState()
  const [options, setOtions] = useState(items);
  const [currentText, setCurrentText] = useState('');

  const configs = {
    minDate: MINDATE,
    maxDate: MAXDATE,
    selectionMode: SINGLE_SELECTION_MODE,
    lang: LANG_FR
  }

  function onTextChange(text) {
    const newOptions = _.filter(items, item => item.label.includes(text))
    console.log(newOptions)
    setOtions(newOptions)
  }

  function onChange(value) {
    setCurrentText(value)
  }

  return (
    <>
      {<DatePicker configs={configs} value={currentDate} onChange={setCurrentDate} />}
      {/*<Dropdown options={options} value={currentText} onChange={onChange} onTextChange={onTextChange} />*/}
    </>
  );
}

export default App;
