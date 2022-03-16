import React from 'react'
import { Button, Box, Stack, Text } from '@chakra-ui/react'
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import { LANG_EN } from './utils'

const monthNamesShortEN= [ 'Janurary', 'Feburary', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const monthNamesShortFR = [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre' ];
const weekdayNamesShortEN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const weekdayNamesShortFR = ['D', 'L', 'Ma', 'Me', 'J', 'V', 'S'];

function Calendar({ calendars, getBackProps, getForwardProps, getDateProps, lang }) {
  if (calendars.length) {
    return (
      <>
        {calendars.map(calendar => (
          <Stack key={`${calendar.month}${calendar.year}`} display={'inline-block'} width={'50%'} p={'0 10px 30px'} boxSizing={'border-box'} boxShadow={'lg'} borderRadius={'lg'} boxSize={'400px'} height={'container.xm'} textAlign={'center'} border={'transparent'}>
            <Box my={2}>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getBackProps({calendars, offset: 12 })}> {<FaAngleDoubleLeft />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getBackProps({ calendars })}> {<FaAngleLeft />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getForwardProps({ calendars })}> {<FaAngleRight />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getForwardProps({ calendars, offset: 12 })}> {<FaAngleDoubleRight />} </Button>
                <Box>
                    <Text fontSize={'large'} fontWeight={'medium'} fontStyle={'initial'}>{(lang === LANG_EN ?  monthNamesShortEN[calendar.month] : monthNamesShortFR[calendar.month])} {calendar.year}</Text>
                </Box>
            </Box>
            {(lang === LANG_EN ? weekdayNamesShortEN : weekdayNamesShortFR).map(weekday => (
              <Box key={`${calendar.month}${calendar.year}${weekday}`} display={'inline-block'} width={'calc(100% / 7)'} border={'none'} bgColor={'transparent'}>
                <Text fontSize={'md'} fontWeight={'medium'}> {weekday} </Text>
              </Box>
            ))}
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, index) => {
                let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                if (!dateObj) {
                  return (
                    <Box key={key} display= {'inline-block'} width= {'calc(100% / 7)'} border= {'none'} bgColor={'transparent'} />
                  );
                }
                var { date, selected, today } = dateObj;
                return (
                  <Button key={key} {...getDateProps({ dateObj })} borderRadius={'full'} size={'md'} display={'inline-block'} width={'calc(100% / 7)'} border={'none'} bgColor={today && !selected ? 'gray.300' : selected ? 'blue.300' : 'transparent' }>
                    { date.getDate() }
                  </Button>
                );
              })
            )}
          </Stack>
        ))}
      </>
    );
  }
  return null;
}

export default Calendar