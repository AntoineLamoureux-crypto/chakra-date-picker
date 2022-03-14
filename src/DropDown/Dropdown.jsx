import { forwardRef, useState, useRef, useEffect } from 'react';
import _ from 'lodash'
import { Input, Box, Popover, PopoverTrigger, PopoverContent, Text } from '@chakra-ui/react';

const Dropdown = forwardRef(({ name, options, value, onChange, onTextChange, ...props }, ref) => {
  const isSearchActive = useRef(false);
  const [text, setText] = useState('');
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(async () => {
    if (value) {
      setText(_.find(options, { value }).label);
    }
  }, [value]);

  // eslint-disable-next-line no-shadow
  const handleChange = (value) => {
    isSearchActive.current = false;
    onChange(value);
  };

  // eslint-disable-next-line no-shadow
  const handleTextChange = (text) => {
    setText(text);
    setActive(0)
    onTextChange(text);
    setIsOpen(options.length > 0 && isSearchActive.current)
    isSearchActive.current = true;
  };

  const keyDownHandler = (event) => {
    const isUpKeyCode = event.keyCode === 38 ;
    const isDownKeyCode = event.keyCode === 40;
    const isEnterKeyCode = event.keyCode === 13;
    if (isUpKeyCode && active > 0) {
      setActive(active - 1);
    }
    if (isDownKeyCode && active < options.length - 1) {
      setActive(active + 1);
    }
    if (isEnterKeyCode) {
      setText(options[active].label)
      setIsOpen(false)
      // Il manque a set le focus du input a off lorsqu'on click Enter
      var element = document.getElementById('dropdownId');
      element.blur();
    }
  };

  return (
    <Box w="full" {...props}>
      <Popover isOpen={isOpen} autoFocus={false} matchWidth >
        <PopoverTrigger>
          <Input
            ref={ref}
            name={name}
            type={'text'}
            value={text}
            autoComplete="off"
            onChange={(e) => handleTextChange(e.target.value)}
            onKeyDown={keyDownHandler}
            isRequired={true}
            id={"dropdownId"}
          />
        </PopoverTrigger>
        <PopoverContent w="500px">
        {options?.map((option, i) => (
           <Option key={option.value} i={i} {...option} onChange={handleChange} />
        ))}
        </PopoverContent>
      </Popover>
    </Box>
  );

  function Option({ label, value, onChange, i }) {
    return (
      <Box onClick={() => onChange(value)} p={1} bgColor={active === i ? 'gray.100' : ''} fontWeight={active === i ? 'bold' : ''}>
        <Text>{label}</Text>
      </Box>
    );
  }
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;