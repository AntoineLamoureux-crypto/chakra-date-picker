import React, { useState } from "react";
import _ from 'lodash'
import DatePicker from "./DatePicker/DatePicker";
import Dropdown from './DropDown/Dropdown'
import DropdownList from './DropDownList/DropdownList'
import Progress from './ProgressBar/Progress'
import { SINGLE_SELECTION_MODE, MINDATE, MAXDATE } from './DatePicker/utils'
import { LANG_EN, LANG_FR } from './DatePicker/utils'
import { Button, Box, useColorMode } from "@chakra-ui/react";


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
  const [currentDate, setCurrentDate] = useState();
  const [curentPosition, setCurentPosition] = useState(1);
  const [options, setOtions] = useState(items);
  const [currentText, setCurrentText] = useState('');
  const numberOfSteps = 3
  const { colorMode, toggleColorMode } = useColorMode()
  const [tags, setTags] = useState([]);

  const configs = {
    minDate: MINDATE,
    maxDate: MAXDATE,
    selectionMode: SINGLE_SELECTION_MODE,
    lang: LANG_FR
  }

  function onTextChange(text) {
    const newOptions = _.filter(items, item => item.label.includes(text))
    setOtions(newOptions)
  }

  function onChange(value) {
    setCurrentText(value)
  }
  
  function handleClick(direction) {
      if (direction < 0 && curentPosition > 1) {
        setCurentPosition(curentPosition -1)
      }
      else if (direction > 0 && numberOfSteps > curentPosition) {
        setCurentPosition(curentPosition +1)
      }
  }

  return (
    <>
    <Box w={'700px'} mx={'auto'}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <br/>
      {<DatePicker configs={configs} value={currentDate} onChange={setCurrentDate} />}
      <br/>
      {<Progress numberOfSteps={numberOfSteps} stepPosition={curentPosition} />}
      <br/>
      <br/>
      {curentPosition}
      <br/>
      {<><Box display={'inline-flex'}><Button onClick={()=> handleClick(-1)} mr={5}>Previous</Button><br/><Button onClick={()=> handleClick(1)}>Next</Button></Box></>}
      <br/>
      <br/>
      {<Dropdown options={options} value={currentText} onChange={onChange} onTextChange={onTextChange} />}
      <br/>
      <br/>
      {<DropdownList options={options} value={currentText} onChange={onChange} onTextChange={onTextChange} tags={tags} setTags={setTags} />}
      </Box>
    </>
  );
}

export default App;
