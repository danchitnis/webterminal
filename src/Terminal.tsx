import {
  Box,
  Button,
  Heading,
  Spacer,
  Text,
  HStack,
  VStack,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

import { ComPort } from './comms/comms';

let comPort = new ComPort();
let dataRX = [] as number[];

const Terminal = () => {
  // Create the count state.
  const [displayType, setDisplayType] = React.useState('byte');
  const [isConnected, setIsConnected] = React.useState(false);
  const [textRx, setTextRx] = React.useState('');
  const [isNewRxData, setIsNewRxData] = React.useState(false);

  const onBtnConnectClick = () => {
    comPort.portOpen();
    setIsConnected(true);
    setTextRx('Connected');
    comPort.dataRXCallback = (data) => {
      for (let i = 0; i < data.length; i++) {
        dataRX.push(data[i]);
      }
      //setTextRx(data);
      setIsNewRxData(true);
    };
  };

  const onBtnDisconnectClick = () => {
    comPort.portClose();
    setIsConnected(false);
    setTextRx(textRx + 'Disconnected');
  };

  React.useEffect(() => {
    let text = '';
    const data = dataRX;
    switch (displayType) {
      case 'byte':
        text = data.toString();
        break;
      case 'hex':
        text = data.map((byte) => byte.toString(16)).join(',');
        break;
      case 'char':
        text = data.map((byte) => String.fromCharCode(byte)).join('');
        break;
    }
    setTextRx(text);
    setIsNewRxData(false);
  }, [displayType, isNewRxData]);

  return (
    <>
      <Heading>Terminal</Heading>
      <Spacer p={2} />

      <HStack>
        <Button
          colorScheme="blue"
          disabled={isConnected}
          onClick={onBtnConnectClick}
        >
          Connect
        </Button>
        <Select placeholder="Select speed" disabled={isConnected}>
          <option value="9600">9600</option>
          <option value="14400">14400</option>
          <option value="115200">115200</option>
        </Select>
        <Button
          colorScheme="blue"
          disabled={!isConnected}
          onClick={onBtnDisconnectClick}
        >
          Disconnect
        </Button>
        <Spacer />
        <Box
          border="solid 1px"
          borderColor="cyan.500"
          borderRadius="10px"
          padding="10px"
        >
          <RadioGroup
            onChange={setDisplayType}
            value={displayType}
            colorScheme="blue"
          >
            <Stack direction="row">
              <Radio value="byte">Byte</Radio>
              <Radio value="hex">Hex</Radio>
              <Radio value="char">Char</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </HStack>

      <Box>
        <Textarea resize={'none'} value={textRx} isReadOnly={true} h="70vh" />
      </Box>
    </>
  );
};

export default Terminal;
