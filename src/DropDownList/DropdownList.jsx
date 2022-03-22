import { forwardRef, useState, useRef, useEffect } from 'react';
import _ from 'lodash'
import { Input, Box, Popover, PopoverTrigger, PopoverContent, Text, useColorMode } from '@chakra-ui/react';
import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'

const DropdownList = forwardRef(({ name, options, value, onChange, onTextChange, tags, setTags, ...props }, ref) => {
  const isSearchActive = useRef(false);
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode()
  
  useEffect(async () => {
    if (value) {
      setText(_.find(options, { value }).label);
    }
    setIsOpen(options.length > 0 && isSearchActive.current)
  }, [value]);

  // eslint-disable-next-line no-shadow
  const handleChange = (value) => {
    isSearchActive.current = false;
    onChange(value);
  };

  // eslint-disable-next-line no-shadow
  const handleTextChange = (text) => {
    setText(text);
    onTextChange(text);
    isSearchActive.current = true;
    setIsOpen(options.length > 0 && isSearchActive.current)
  };

  function addTag(value) {
    tags.push(value)
    setTags(tags)
    setText('')
  }

  const removeTags = (_tag) => {
    const newArray = _.filter(tags, tag => tag !== _tag)
    setTags(newArray);
  };

  return (
    <Box w="full" {...props}>
      <Popover isOpen={isOpen} autoFocus={false} matchWidth >
        <PopoverTrigger>
          <Box display={'flex'} alignItems={'flex-start'} flexWrap={'wrap'} border={colorMode === 'light' ? '1px solid #D6D8DA' : '1px solid #555555'} borderRadius={'lg'}>
            <List display={'flex'} flexWrap={'wrap'} my={'auto'}>
                {tags.map((tag, index) => (
                  <ListItem key={index} display={'flex'} alignItems={'center'} >
                    <Tag tag={tag} removeTags={removeTags}/>
                  </ListItem>
                ))}
            </List>
            <Input 
              ref={ref}
              name={name}
              type={'text'}
              value={text}
              autoComplete="off"
              onChange={(e) => handleTextChange(e.target.value)}
              isRequired={true}
              id={"dropdownId"}
              flex={1}
              border={'none'}
              _focus={{outline: 'transparent'}}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent w="500px">
        {options?.map((option, i) => (
           <Option key={option.value} i={i} {...option} onChange={handleChange} setIsOpen={setIsOpen} addTag={addTag}/>
        ))}
        </PopoverContent>
      </Popover>
    </Box>
  );

  function Option({ label, addTag }) {
    function updateText() {
      setIsOpen(false)
    }
    return (
      <Box onClick={() => updateText()} p={1} 
           _hover={{bgColor: colorMode === 'light' ? 'gray.50' : 'gray.500'}}
      >
        <Text cursor={'pointer'} onClick={()=> addTag(label)} >{label}</Text>
      </Box>
    );
  }
});

  function Tag({index, tag, removeTags}) {
    return(
      <Box key={index} display={'flex'} borderRadius={'md'} bgColor={'gray.200'} w={'auto'} ml={2}>
        <Box mx={2} my={'auto'}>
          <Text> {tag} </Text>
        </Box>
        <Box _hover={{bgColor: 'red.100'}}  borderTopRightRadius={'md'} borderBottomRightRadius={'md'} pb={1} px={2}>
          <CloseIcon onClick={() => removeTags(tag)} cursor={'pointer'} boxSize={'11px'} mx={1} _hover={{color: 'red'}}/>
        </Box>
      </Box>
    )
  }

DropdownList.displayName = 'DropdownList';

export default DropdownList;