import React from 'react';
import { useDayzed } from 'dayzed';
import { Button, Box, Stack, Text } from '@chakra-ui/react'
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleRight, FaAngleLeft } from 'react-icons/fa'

const monthNamesShort = [
  'Janurary',
  'Feburary',
  'Mars',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const weekdayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
  if (calendars.length) {
    return (
      <>
        {calendars.map(calendar => (
          <Stack
            key={`${calendar.month}${calendar.year}`}
            display={'inline-block'}
            width={'50%'}
            p={'0 10px 30px'}
            boxSizing={'border-box'}
            boxShadow={'lg'}
            borderRadius={'lg'}
            boxSize={'400px'}
            height={'container.xm'}
            textAlign={'center'}
          >
            <Box my={2}>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getBackProps({calendars, offset: 12})}> {<FaAngleDoubleLeft />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getBackProps({ calendars })}> {<FaAngleLeft />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getForwardProps({ calendars })}> {<FaAngleRight />} </Button>
                <Button mx={1} _hover={{bgColor: 'transparent'}} bgColor={'transparent'} {...getForwardProps({ calendars, offset: 12, })}> {<FaAngleDoubleRight />} </Button>
                <Box>
                    <Text fontSize={'large'} fontWeight={'medium'} fontStyle={'initial'}>{monthNamesShort[calendar.month]} {calendar.year}</Text>
                </Box>
            </Box>
            {weekdayNamesShort.map(weekday => (
              <Box
                key={`${calendar.month}${calendar.year}${weekday}`}
                display={'inline-block'}
                width={'calc(100% / 7)'}
                border={'none'}
                bgColor={'transparent'}
              >
                <Text fontSize={'md'} fontWeight={'medium'}> {weekday} </Text>
              </Box>
            ))}
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, index) => {
                let key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                if (!dateObj) {
                  return (
                    <Box
                      key={key}
                      display= {'inline-block'}
                      width= {'calc(100% / 7)'}
                      border= {'none'}
                      bgColor={'transparent'}
                    />
                  );
                }
                var { date, selected, today } = dateObj;
                return (
                    <Button
                    borderRadius={'full'}
                    size={'md'}
                    display={'inline-block'}
                    width={'calc(100% / 7)'}
                    border={'none'}
                    bgColor={today && !selected ? 'gray.100' : selected ? 'blue.100' : 'transparent' }
                    key={key}
                    {...getDateProps({ dateObj })}
                  >
                    {date.getDate()}
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

function Datepicker(props) {
  let dayzedData = useDayzed(props);
  return <Calendar {...dayzedData} />;
}

class Single extends React.Component {

  state = { selectedDate: null };

  _handleOnDateSelected = ({ date }) => {
    this.setState(state => ({ selectedDate: date }));
    console.log(this.state)
  };

  render() {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() -1)
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
          minDate={yesterday}
        />
      </div>
    );
  }
}

export default Single;