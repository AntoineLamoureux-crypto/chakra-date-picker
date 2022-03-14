import React, { useState } from 'react'
import { Input, InputGroup, InputRightElement, Container } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import SingleSelection from './SingleSelection'
import { SINGLE_SELECTION_MODE } from './utils'

function DatePicker({ configs, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <Popover isLazy isOpen={isOpen}>
            <InputGroup>
                <Input type={'date-fn'} placeholder={value == null ? 'Select a date' : value} isReadOnly={true}/>    
                <PopoverTrigger>
                    <InputRightElement children={<CalendarIcon color={'gray.300'} _hover={{color: 'gray.600'}} />} cursor={'pointer'} onClick={()=> setIsOpen(true)}/>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverBody >
                        {configs.selectionMode === SINGLE_SELECTION_MODE ? <SingleSelection currentDate={value} setCurrentDate={onChange} setIsOpen={setIsOpen} configs={configs} />: <> </> }
                    </PopoverBody>
                </PopoverContent>
            </InputGroup>
        </Popover>
    </>;
}

export default DatePicker