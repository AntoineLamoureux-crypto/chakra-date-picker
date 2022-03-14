import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement, Container } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import SingleSelection from './SingleSelection'
import { SINGLE_SELECTION_MODE } from './utils'

class Single extends React.Component {
    state = { selectedDate: null };
  
    _handleOnDateSelected = ({ selected, selectable, date }) => {
      this.setState(state => ({ selectedDate: date }));
    };
  
    render() {
      let { selectedDate } = this.state;
      return (
        <Container my={'10'}>
            <Popover isLazy isOpen={isOpen}>
                <InputGroup>
                    <Input type={'date-fn'} placeholder={value == null ? 'Select a date' : value} isReadOnly={true}/>    
                    <PopoverTrigger>
                        <InputRightElement children={<CalendarIcon color={'gray.300'} _hover={{color: 'gray.600'}} />} cursor={'pointer'} onClick={()=> setIsOpen(true)}/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody >
                            {configs.selectionMode === SINGLE_SELECTION_MODE ? <SingleSelection currentDate={value} setCurrentDate={onChange} setIsOpen={setIsOpen} configs={configs} onDateSelected={this._handleOnDateSelected} selected={this.state.selectedDate}/>: <> </> }
                        </PopoverBody>
                    </PopoverContent>
                </InputGroup>
            </Popover>
        </Container>
      );
    }
  }
  
  export default Single;