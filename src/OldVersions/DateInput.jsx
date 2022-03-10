import React from 'react'
import { CalendarIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement, Container, Box, Text, Button } from '@chakra-ui/react'
import Single from './Single'
import Range from './Range'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
  } from '@chakra-ui/react'

function DateInput() {
  const mode = 'range'
  return (
    <Container>
        <Popover isLazy>
            <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' />
                <Input type={'button'}/>
                <PopoverTrigger>
                    <InputRightElement children={<CalendarIcon color={'gray.300'} _hover={{color: 'gray.600'}} />} cursor={'pointer'} onClick={()=> console.log('Clicked !')}/>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverCloseButton ml={'70%'}/>
                    <PopoverBody >
                        {mode === 'single' ? <Single popoverCloseButton={PopoverCloseButton}/> : <Range popoverCloseButton={PopoverCloseButton}/>}
                    </PopoverBody>
                </PopoverContent>
            </InputGroup>
            </Popover>
        </Container>
    )
}

export default DateInput