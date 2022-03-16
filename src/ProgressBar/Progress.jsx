import React from 'react'
import { Box, Grid } from "@chakra-ui/react"

function Progress({numberOfSteps, stepPosition}) {
    const steps = [];
    for(let i = 1; i <= numberOfSteps; i++) {
        steps[i] = i;
    }

  return (
    <Box w={'100%'}>
        <Grid templateColumns={`repeat(${numberOfSteps}, 1fr)`} gap={2} >
            {steps.map(function(item){ 
                return <>
                    <Box 
                        key={item} 
                        bgColor={stepPosition >= item ? 'blue.'+ (item + 2) +'00' : 'gray.100'} 
                        borderLeftRadius={item === 1 ? 'md' : ''} 
                        borderRightRadius={numberOfSteps === item ? 'md' : ''}
                        height={'10px'}
                    >
                    </Box>
                </> 
            })}
        </Grid>
    </Box>
  )
}
export default Progress