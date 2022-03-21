import { forwardRef, useState, useRef, useEffect } from 'react';
import _ from 'lodash'
import { Input, Box, Popover, PopoverTrigger, PopoverContent, Text, useColorMode, InputLeftElement, InputGroup, Divider } from '@chakra-ui/react';
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
      <Box>
      
      </Box>
      <Popover isOpen={isOpen} autoFocus={false} matchWidth >
        <PopoverTrigger>
        <Box display= 'flex' align-items= 'flex-start' flex-wrap= 'wrap' >
        <Box my={'auto'} bgColor={'gray.50'} display={'inline-flex'} w={'auto'}>
            {tags.map((tag, index) => (
              <>
                <Text key={index} mx={2}>{tag}</Text>
                <CloseIcon onClick={() => removeTags(tag)} cursor={'pointer'} my={'auto'}/>
              </>
            ))}
          </Box>
        <Input 
            ref={ref}
            name={name}
            type={'text'}
            value={text}
            autoComplete="off"
            onChange={(e) => handleTextChange(e.target.value)}
            isRequired={true}
            id={"dropdownId"}
          >
          </Input>
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

DropdownList.displayName = 'DropdownList';

export default DropdownList;